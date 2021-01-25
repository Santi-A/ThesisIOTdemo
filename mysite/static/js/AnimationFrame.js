function AnimationFrame(time){
    this.time = time;       //actual time
    this.sensorPositions = [];

    this.addSensorPosition = function(name, x, y, z, color){
        var sensorpos = new SensorPosition(name, x, y, z);
        sensorpos.setColor(color);
        this.sensorPositions.push(sensorpos);
    }
}

function SensorPosition(name, x, y, z){
    this.name = name;
    this.x = x;
    this.y = y;
    this.z = z;
    this.color;

    this.setColor = function(color){
        this.color = color;
    }
}