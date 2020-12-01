function CSVRow(time, name, x, y, z){
    this.time = time;   //time is relative to each other rather than actual time
    this.name = name;
    this.x = x;
    this.y = y;
    this.z = z;
}

var samplecsv = [];
var anim1 = [];

//time = 0
samplecsv.push(new CSVRow(0, 'NW1', -100, 0, -100))
samplecsv.push(new CSVRow(0, 'NE1', 100, 0, -100))
samplecsv.push(new CSVRow(0, 'SW1', -100, 0, 100))
samplecsv.push(new CSVRow(0, 'SE1', 100, 0, 100))

samplecsv.push(new CSVRow(0, 'NW2', -100, 200, -100))
samplecsv.push(new CSVRow(0, 'NE2', 100, 200, -100))
samplecsv.push(new CSVRow(0, 'SW2', -100, 200, 100))
samplecsv.push(new CSVRow(0, 'SE2', 100, 200, 100))

samplecsv.push(new CSVRow(0, 'NW3', -100, 400, -100))
samplecsv.push(new CSVRow(0, 'NE3', 100, 400, -100))
samplecsv.push(new CSVRow(0, 'SW3', -100, 400, 100))
samplecsv.push(new CSVRow(0, 'SE3', 100, 400, 100))


//time = 1
samplecsv.push(new CSVRow(1, 'NW1', -100, 0, -100))
samplecsv.push(new CSVRow(1, 'NE1', 100, 0, -100))
samplecsv.push(new CSVRow(1, 'SW1', -100, 0, 100))
samplecsv.push(new CSVRow(1, 'SE1', 100, 0, 100))

samplecsv.push(new CSVRow(1, 'NW2', -90, 200, -100))
samplecsv.push(new CSVRow(1, 'NE2', 110, 200, -100))
samplecsv.push(new CSVRow(1, 'SW2', -90, 200, 100))
samplecsv.push(new CSVRow(1, 'SE2', 110, 200, 100))

samplecsv.push(new CSVRow(1, 'NW3', -80, 400, -100))
samplecsv.push(new CSVRow(1, 'NE3', 120, 400, -100))
samplecsv.push(new CSVRow(1, 'SW3', -80, 400, 100))
samplecsv.push(new CSVRow(1, 'SE3', 120, 400, 100))

//time = 2
samplecsv.push(new CSVRow(2, 'NW1', -100, 0, -100))
samplecsv.push(new CSVRow(2, 'NE1', 100, 0, -100))
samplecsv.push(new CSVRow(2, 'SW1', -100, 0, 100))
samplecsv.push(new CSVRow(2, 'SE1', 100, 0, 100))

samplecsv.push(new CSVRow(2, 'NW2', -80, 200, -100))
samplecsv.push(new CSVRow(2, 'NE2', 120, 200, -100))
samplecsv.push(new CSVRow(2, 'SW2', -80, 200, 100))
samplecsv.push(new CSVRow(2, 'SE2', 120, 200, 100))

samplecsv.push(new CSVRow(2, 'NW3', -60, 400, -100))
samplecsv.push(new CSVRow(2, 'NE3', 140, 400, -100))
samplecsv.push(new CSVRow(2, 'SW3', -60, 400, 100))
samplecsv.push(new CSVRow(2, 'SE3', 140, 400, 100))

//time = 3
samplecsv.push(new CSVRow(3, 'NW1', -100, 0, -100))
samplecsv.push(new CSVRow(3, 'NE1', 100, 0, -100))
samplecsv.push(new CSVRow(3, 'SW1', -100, 0, 100))
samplecsv.push(new CSVRow(3, 'SE1', 100, 0, 100))

samplecsv.push(new CSVRow(3, 'NW2', -70, 200, -100))
samplecsv.push(new CSVRow(3, 'NE2', 130, 200, -100))
samplecsv.push(new CSVRow(3, 'SW2', -70, 200, 100))
samplecsv.push(new CSVRow(3, 'SE2', 130, 200, 100))

samplecsv.push(new CSVRow(3, 'NW3', -40, 400, -100))
samplecsv.push(new CSVRow(3, 'NE3', 160, 400, -100))
samplecsv.push(new CSVRow(3, 'SW3', -40, 400, 100))
samplecsv.push(new CSVRow(3, 'SE3', 160, 400, 100))

//time = 4
samplecsv.push(new CSVRow(4, 'NW1', -100, 0, -100))
samplecsv.push(new CSVRow(4, 'NE1', 100, 0, -100))
samplecsv.push(new CSVRow(4, 'SW1', -100, 0, 100))
samplecsv.push(new CSVRow(4, 'SE1', 100, 0, 100))

samplecsv.push(new CSVRow(4, 'NW2', -60, 200, -100))
samplecsv.push(new CSVRow(4, 'NE2', 140, 200, -100))
samplecsv.push(new CSVRow(4, 'SW2', -60, 200, 100))
samplecsv.push(new CSVRow(4, 'SE2', 140, 200, 100))

samplecsv.push(new CSVRow(4, 'NW3', -20, 400, -100))
samplecsv.push(new CSVRow(4, 'NE3', 180, 400, -100))
samplecsv.push(new CSVRow(4, 'SW3', -20, 400, 100))
samplecsv.push(new CSVRow(4, 'SE3', 180, 400, 100))

//time = 5
samplecsv.push(new CSVRow(5, 'NW1', -100, 0, -100))
samplecsv.push(new CSVRow(5, 'NE1', 100, 0, -100))
samplecsv.push(new CSVRow(5, 'SW1', -100, 0, 100))
samplecsv.push(new CSVRow(5, 'SE1', 100, 0, 100))

samplecsv.push(new CSVRow(5, 'NW2', -70, 200, -100))
samplecsv.push(new CSVRow(5, 'NE2', 130, 200, -100))
samplecsv.push(new CSVRow(5, 'SW2', -70, 200, 100))
samplecsv.push(new CSVRow(5, 'SE2', 130, 200, 100))

samplecsv.push(new CSVRow(5, 'NW3', -40, 400, -100))
samplecsv.push(new CSVRow(5, 'NE3', 160, 400, -100))
samplecsv.push(new CSVRow(5, 'SW3', -40, 400, 100))
samplecsv.push(new CSVRow(5, 'SE3', 160, 400, 100))

//time = 6
samplecsv.push(new CSVRow(6, 'NW1', -100, 0, -100))
samplecsv.push(new CSVRow(6, 'NE1', 100, 0, -100))
samplecsv.push(new CSVRow(6, 'SW1', -100, 0, 100))
samplecsv.push(new CSVRow(6, 'SE1', 100, 0, 100))

samplecsv.push(new CSVRow(6, 'NW2', -80, 200, -100))
samplecsv.push(new CSVRow(6, 'NE2', 120, 200, -100))
samplecsv.push(new CSVRow(6, 'SW2', -80, 200, 100))
samplecsv.push(new CSVRow(6, 'SE2', 120, 200, 100))

samplecsv.push(new CSVRow(6, 'NW3', -60, 400, -100))
samplecsv.push(new CSVRow(6, 'NE3', 140, 400, -100))
samplecsv.push(new CSVRow(6, 'SW3', -60, 400, 100))
samplecsv.push(new CSVRow(6, 'SE3', 140, 400, 100))

//time = 7
samplecsv.push(new CSVRow(7, 'NW1', -100, 0, -100))
samplecsv.push(new CSVRow(7, 'NE1', 100, 0, -100))
samplecsv.push(new CSVRow(7, 'SW1', -100, 0, 100))
samplecsv.push(new CSVRow(7, 'SE1', 100, 0, 100))

samplecsv.push(new CSVRow(7, 'NW2', -90, 200, -100))
samplecsv.push(new CSVRow(7, 'NE2', 110, 200, -100))
samplecsv.push(new CSVRow(7, 'SW2', -90, 200, 100))
samplecsv.push(new CSVRow(7, 'SE2', 110, 200, 100))

samplecsv.push(new CSVRow(7, 'NW3', -80, 400, -100))
samplecsv.push(new CSVRow(7, 'NE3', 120, 400, -100))
samplecsv.push(new CSVRow(7, 'SW3', -80, 400, 100))
samplecsv.push(new CSVRow(7, 'SE3', 120, 400, 100))

//time = 8
samplecsv.push(new CSVRow(8, 'NW1', -100, 0, -100))
samplecsv.push(new CSVRow(8, 'NE1', 100, 0, -100))
samplecsv.push(new CSVRow(8, 'SW1', -100, 0, 100))
samplecsv.push(new CSVRow(8, 'SE1', 100, 0, 100))

samplecsv.push(new CSVRow(8, 'NW2', -100, 200, -100))
samplecsv.push(new CSVRow(8, 'NE2', 100, 200, -100))
samplecsv.push(new CSVRow(8, 'SW2', -100, 200, 100))
samplecsv.push(new CSVRow(8, 'SE2', 100, 200, 100))

samplecsv.push(new CSVRow(8, 'NW3', -100, 400, -100))
samplecsv.push(new CSVRow(8, 'NE3', 100, 400, -100))
samplecsv.push(new CSVRow(8, 'SW3', -100, 400, 100))
samplecsv.push(new CSVRow(8, 'SE3', 100, 400, 100))

var timeCoefficient = 60; //time between frames

for(var i = 0; i < samplecsv.length; i++){
    var actualTime = samplecsv[i].time * timeCoefficient;
    var timeExists = false;
    var animIndex = -1;
    for(var j = 0; j < anim1.length; j++){
        if(anim1[j].time == actualTime){
            timeExists = true;
            animIndex = j;
        }
    }
    if(!timeExists){
        var newFrame = new AnimationFrame(actualTime);
        anim1.push(newFrame);
        animIndex = anim1.length - 1;
    }
    anim1[animIndex].addSensorPosition(samplecsv[i].name, samplecsv[i].x, samplecsv[i].y, samplecsv[i].z);
}

//handling in between keyframes
var anim2 = []
for(var i = 0; i < anim1.length; i++){
    anim2.push(anim1[i]);
    if(i < anim1.length-1){
        var left = anim1[i];
        var right = anim1[i+1];
        var timeDifference = right.time - left.time;
        for(var j = 1; j < timeDifference; j++){
            var frameBetween = new AnimationFrame(left.time + j);
            for(var m = 0; m < left.sensorPositions.length; m++){
                for(var n = 0; n < right.sensorPositions.length; n++){
                    if(left.sensorPositions[m].name === right.sensorPositions[n].name){
                        var xVal = left.sensorPositions[m].x + ((right.sensorPositions[n].x - left.sensorPositions[m].x) * j / timeDifference);
                        var yVal = left.sensorPositions[m].y + ((right.sensorPositions[n].y - left.sensorPositions[m].y) * j / timeDifference);
                        var zVal = left.sensorPositions[m].z + ((right.sensorPositions[n].z - left.sensorPositions[m].z) * j / timeDifference);
                        frameBetween.addSensorPosition(left.sensorPositions[m].name, xVal, yVal, zVal);
                    }
                }
            }
            anim2.push(frameBetween);
        }
    }
}

animationFrames = anim2; // temporary