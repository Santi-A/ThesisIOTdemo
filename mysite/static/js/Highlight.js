function Highlight(){
    this.exists = false;
    this.highlightSphere;
    this.trackingObject;

    this.setHighlight = function(object){
        var highlightGeometry = new THREE.SphereGeometry(20, 32, 32);
        var highlightMaterial = new THREE.MeshBasicMaterial({color: 0xffff00});
        highlightMaterial.transparent = true;
        highlightMaterial.opacity = 0.5;

        this.highlightSphere = new THREE.Mesh(highlightGeometry, highlightMaterial);
        this.highlightSphere.position.setX(object.position.x);
        this.highlightSphere.position.setY(object.position.y);
        this.highlightSphere.position.setZ(object.position.z);
        this.highlightSphere.name = 'highlight';

        scene.add(this.highlightSphere);

        this.exists = true;
        this.trackingObject = object;
    }

    this.updateHighlight = function(){
        if(this.exists){
            this.trackingObject = scene.getObjectByName(this.trackingObject.name);
            this.highlightSphere.position.setX(this.trackingObject.position.x);
            this.highlightSphere.position.setY(this.trackingObject.position.y);
            this.highlightSphere.position.setZ(this.trackingObject.position.z);
        }
    }

    this.removeHighlight = function(){
        scene.remove(scene.getObjectByName('highlight'));
        this.exists = false;
    }
}

var highlight = new Highlight();

function onDocumentMouseDown(event){
    mouse.x = ( (event.clientX - renderer.domElement.offsetLeft) / renderer.domElement.width) * 2 - 1;
    mouse.y = - ( (event.clientY - renderer.domElement.offsetTop) / renderer.domElement.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(targetList);
    if (intersects.length > 0) {
        console.log(intersects[0].object.name);
        setHighlight(intersects[0].object);
        $("#selected-label").empty();
        $("#selected-label").append("Selected Node: " + intersects[0].object.name);

        var dataX = [];
        var dataY = [];
        var dataZ = [];

        for(i = 0; i < animationFrames.length; i++){
            for(j = 0; j < animationFrames[i].sensorPositions.length; j++){
                if(intersects[0].object.name === animationFrames[i].sensorPositions[j].name){
                    dataX.push(animationFrames[i].sensorPositions[j].x);
                    dataY.push(animationFrames[i].sensorPositions[j].y);
                    dataZ.push(animationFrames[i].sensorPositions[j].z);
                }
            }
        }

        nodeChart.setData(dataX, dataY, dataZ);
    }
}

function setHighlight(object){
    highlight.removeHighlight();
    highlight.setHighlight(object);
}

$(document).keyup(function(e){
    if(e.key === "Escape"){
        highlight.removeHighlight();

        var dataX = [];
        var dataY = [];
        var dataZ = [];

        nodeChart.setData(dataX, dataY, dataZ);

        $("#selected-label").empty();
        $("#selected-label").append("Selected Node: None");
    }
})

canvas.addEventListener('click', onDocumentMouseDown, false);