function onDocumentMouseDown(event){
    mouse.x = ( (event.clientX - renderer.domElement.offsetLeft) / renderer.domElement.width) * 2 - 1;
    mouse.y = - ( (event.clientY - renderer.domElement.offsetTop) / renderer.domElement.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(targetList);

    if (intersects.length > 0) {
        isAnimating = false;
        $(".animation-toggle").val("Play");
        console.log(intersects[0].object.name);
        setHighlight(intersects[0].object);
    }
}

function setHighlight(object){
    scene.remove(scene.getObjectByName('highlight'));

    var highlightGeometry = new THREE.SphereGeometry(20, 32, 32);
    var highlightMaterial = new THREE.MeshBasicMaterial({color: 0xffff00});
    highlightMaterial.transparent = true;
    highlightMaterial.opacity = 0.5;

    var highlightSphere = new THREE.Mesh(highlightGeometry, highlightMaterial);
    highlightSphere.position.setX(object.position.x);
    highlightSphere.position.setY(object.position.y);
    highlightSphere.position.setZ(object.position.z);
    highlightSphere.name = 'highlight';

    scene.add(highlightSphere);
}

canvas.addEventListener('click', onDocumentMouseDown, false);