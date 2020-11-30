function Point(name, x, y, z){
    this.name = name;
    this.x = x;
    this.y = y;
    this.z = z;
    this.xanim = this.x;
    this.yanim = this.y;
    this.zanim = this.z;
    this.connectedPoints = [];
    this.cube;
    this.floor = 0;

    this.updateCoordinates = function(newX, newY, newZ){
        isAnimating = false;
        var numX = parseInt(newX)
        var numY = parseInt(newY)
        var numZ = parseInt(newZ)
        if(this.x != numX){
            this.x = numX;
            this.xanim = this.x;
        }
        if(this.y != numY){
            this.y = numY;
            this.yanim = this.y;
        }
        if(this.z != numZ){
            this.z = numZ;
            this.zanim = this.z;
        }
    }

    this.draw = function(scene, targetList, geometry, material){
        this.cube = new THREE.Mesh( geometry, material );
        this.cube.position.setX(this.xanim);
        this.cube.position.setY(this.y);
        this.cube.position.setZ(this.z);
        this.cube.name = this.name;
        scene.add( this.cube );
        targetList.push(this.cube);
    }

    this.drawLines = function(pointArray){
        for(var cpi = 0; cpi < this.connectedPoints.length; cpi++){
            for(var ari = 0; ari < pointArray.length; ari++){
                if(pointArray[ari].name === this.connectedPoints[cpi]){
                    let newLine = new Line(this, pointArray[ari]);
                    newLine.checkLines();
                }
            }
        }
    }

    this.update = function(){
        framesIndex = animationFrames.findIndex(x => x.time === currentTime);
        if(animationFrames[framesIndex]){
            positionIndex = animationFrames[framesIndex].sensorPositions.findIndex(x => x.name === this.name);
            if(animationFrames[framesIndex].sensorPositions[positionIndex]){
                this.xanim = animationFrames[framesIndex].sensorPositions[positionIndex].x;
                this.yanim = animationFrames[framesIndex].sensorPositions[positionIndex].y;
                this.zanim = animationFrames[framesIndex].sensorPositions[positionIndex].z;
            }
        }

        this.cube.position.setX(this.xanim);
        this.cube.position.setY(this.yanim);
        this.cube.position.setZ(this.zanim);
    }

    this.removeReferences = function(pointArray, geometryLines){
        for(var i = 0; i < pointArray.length; i++){
            for(var j = 0; j < pointArray[i].connectedPoints.length; j++){
                if(pointArray[i].connectedPoints[j] === this.name) pointArray[i].connectedPoints.splice(j, 1);
            }
        }
        scene.remove(this.cube);
        for(var i = 0; i < geometryLines.length; i++){
            if(geometryLines[i].point1.name === this.name || geometryLines[i].point2.name === this.name){
                geometryLines[i].removeLine();
                geometryLines.splice(i, 1);
                i--;
            }
        }
    }
}