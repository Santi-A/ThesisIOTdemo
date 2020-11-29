function Line(p1, p2){
    this.point1 = p1;
    this.point2 = p2;
    this.geometryLine;
    this.line;

    this.checkLines = function(){
        var lineExists = false;
        for(var lineIndex = 0; lineIndex < geometryLines.length; lineIndex++){
            var comparePoint1 = geometryLines[lineIndex].point1.name;
            var comparePoint2 = geometryLines[lineIndex].point2.name;
            if(this.point1.name === comparePoint1 && this.point2.name === comparePoint2){
                lineExists = true;
            }
            else if(this.point1.name === comparePoint2 && this.point2.name === comparePoint1){
                lineExists = true;
            }
        }
        if(!lineExists){
            this.drawLine();
        }
    }

    this.drawLine = function(){
        this.geometryLine = new THREE.Geometry();
        this.geometryLine.vertices.push(this.point1.cube.position, this.point2.cube.position)
        this.line = new THREE.Line( this.geometryLine, materialline );
        geometryLines.push(this);
        scene.add(this.line);
    }

    this.removeLine = function(){
        scene.remove(this.line);
    }
}