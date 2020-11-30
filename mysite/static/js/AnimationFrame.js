function AnimationFrame(time){
    this.time = time;       //actual time
    this.sensorPositions = [];

    this.addSensorPosition = function(name, x, y, z){
        var sensorpos = new SensorPosition(name, x, y, z);
        this.sensorPositions.push(sensorpos);
    }
}

function SensorPosition(name, x, y, z){
    this.name = name;
    this.x = x;
    this.y = y;
    this.z = z;
}