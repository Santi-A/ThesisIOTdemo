function Point(name, x, y, z){
    this.name = name;
    this.x = x*10;
    this.y = y*10;
    this.z = z*10;
    this.xanim = this.x;
    this.yanim = this.y;
    this.zanim = this.z;
    this.range = 3;     //update this
    this.dx = 0.1;
    this.right = true;
    this.up = true;
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

    this.setDirection = function(){
    //logic for cw or ccw movement (placeholder movement)
        if(this.z > 0){ //cw
            if(this.y > 0){ //right
                this.right = true;
            }
            else{ //left
                this.right = false;
            }
        }
        else if(this.z < 0){ //ccw
            if(this.y > 0){ //left
                this.right = false;
            }
            else{ //right
                this.right = true;
            }
        }
        else{ //stationary
             this.dx = 0;
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

    this.update = function(){ //update this
        if(isAnimating){
            if(this.right){
                if(this.xanim + this.dx <= this.x + this.range) this.xanim += this.dx;
                else this.right = false;
            }
            else{
                if(this.xanim - this.dx >= this.x - this.range) this.xanim -= this.dx;
                else this.right = true;
            }
            this.cube.position.setX(this.xanim);
        }
        else{
            //this.xanim = this.x;
            this.cube.position.setX(this.xanim);
            this.cube.position.setY(this.yanim);
            this.cube.position.setZ(this.zanim);
         }
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