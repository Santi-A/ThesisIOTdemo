function CSVRow(time, name, x, y, z){
    this.time = time;   //time is relative to each other rather than actual time
    this.name = name;
    this.x = x;
    this.y = y;
    this.z = z;
}

function prepareData(data){
    var time = 0;
    var lastTimeReading = data[0].time;
    for(var i = 0; i < data.length; i++){
        if(data[i].time === lastTimeReading){
            data[i].time = time;
        }
        else if(data[i].time > lastTimeReading){
            lastTimeReading = data[i].time;
            time++;
            data[i].time = time;
        }
        else{
            console.log('Error. Data is not sequenced properly');
            return;
        }
    }
    //console.log(data);
    var keyframeCount = parseInt($("#keyframe-count").val());
    if(keyframeCount < 1) keyframeCount = 1;
    generateFromCSV(data, keyframeCount);
}

function generateFromCSV(csv, timeCoefficient){
    animationFrames.length = 0;
    var anim1 = [];
    for(var i = 0; i < csv.length; i++){
        var actualTime = csv[i].time * timeCoefficient;
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
        anim1[animIndex].addSensorPosition(csv[i].name, csv[i].x, csv[i].y, csv[i].z);
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

    animationFrames = anim2;
    console.log(animationFrames);
    timeMax = animationFrames.length;
    $('#time-slider').attr('max', timeMax);
    console.log('finished loading');
}