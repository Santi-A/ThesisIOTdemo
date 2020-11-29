function generateArray(){
    var numFloors = $("#floor-count").val();
    floorCount = parseInt(numFloors);
    var numNodes = $("#nodes-floor-count").val();
    for(var i = 0; i < numFloors; i++){
        createDefaultNodes(i);
        for(var j = 4; j < numNodes; j++){
            var point = new Point('new(' + pointArray.length + ')', 0, (i)*20, 0);
            point.setDirection();
            point.floor = i + 1;
            pointArray.push(point);
        }
        floorDetails(i);
    }
    $(".point-list").append('<div class="floor-container" id="add-floor"><input type="button" value="Add a Floor" onClick="addFloor()"></div>');
}

function addFloor(){
    $("#add-floor").remove();
    floorDetails(floorCount);
    floorCount++;
    $(".point-list").append('<div class="floor-container" id="add-floor"><input type="button" value="Add a Floor" onClick="addFloor()"></div>');
}

function addNode(floorNum){
    var point = new Point('new(' + pointArray.length + ')', 0, (floorNum-1)*20, 0);
    point.setDirection();
    point.range = Math.abs(((floorNum-1)*20 / Math.sqrt(3))/2);     //update this
    point.dx = point.range/50;
    point.floor = floorNum;
    pointArray.push(point);

    while(scene.children.length > 0){
        scene.remove(scene.children[0]);
    }
    init();
    updateConnectedNodes();

    $(".floor-" + floorNum + "-content").empty();
    for(var fd = 0; fd < pointArray.length; fd++){
        if(floorNum === pointArray[fd].floor) nodeDetails(fd);
    }
    $(".floor-" + floorNum + "-content").append('<div class="node-container" id="add-node-' + floorNum + '"><input type="button" value="Add a Node" onClick="addNode(' + floorNum + ')"></div>');
}

        function createDefaultNodes(floor){
            var point = new Point('NW' + (floor+1), -10, floor*20, -10);
            point.setDirection();
            point.range = Math.abs((floor*20 / Math.sqrt(3))/2);        //update this
            point.dx = point.range/50;
            point.connectedPoints.push('NE' + (floor+1));
            point.connectedPoints.push('SW' + (floor+1));
            if(floor) point.connectedPoints.push('NW' + (floor));
            point.floor = floor + 1;
            pointArray.push(point);

            var point = new Point('NE' + (floor+1), 10, floor*20, -10);
            point.setDirection();
            point.range = Math.abs((floor*20 / Math.sqrt(3))/2);
            point.dx = point.range/50;
            point.connectedPoints.push('NW' + (floor+1));
            point.connectedPoints.push('SE' + (floor+1));
            if(floor) point.connectedPoints.push('NE' + (floor));
            point.floor = floor + 1;
            pointArray.push(point);

            var point = new Point('SE' + (floor+1), 10, floor*20, 10);
            point.setDirection();
            point.range = Math.abs((floor*20 / Math.sqrt(3))/2);
            point.dx = point.range/50;
            point.connectedPoints.push('NE' + (floor+1));
            point.connectedPoints.push('SW' + (floor+1));
            if(floor) point.connectedPoints.push('SE' + (floor));
            point.floor = floor + 1;
            pointArray.push(point);

            var point = new Point('SW' + (floor+1), -10, floor*20, 10);
            point.setDirection();
            point.range = Math.abs((floor*20 / Math.sqrt(3))/2);
            point.dx = point.range/50;
            point.connectedPoints.push('NW' + (floor+1));
            point.connectedPoints.push('SE' + (floor+1));
            if(floor) point.connectedPoints.push('SW' + (floor));
            point.floor = floor + 1;
            pointArray.push(point);
        }

        function floorDetails(floorNum){
            const floorVal = floorNum + 1;
            const floorDiv= '<div class="floor-container">' +
                                'Floor ' + floorVal +
                                '<div class="floor-' + floorVal + '-content"></div>'
                            '</div>';
            $(".point-list").append(floorDiv);
            for(var fd = 0; fd < pointArray.length; fd++){
                if(floorVal === pointArray[fd].floor) nodeDetails(fd);
            }
            $(".floor-" + floorVal + "-content").append('<div class="node-container" id="add-node-' + floorVal + '"><input type="button" value="Add a Node" onClick="addNode(' + floorVal + ')"></div>');
        }

        function nodeDetails(arrayIndex){
            const node = pointArray[arrayIndex];
            const nodeDiv = '<div class="node-container">' +
                                '<span><input id="nodename-' + arrayIndex + '" type="text" value="' + node.name + '"></span>' +
                                '<span><input type="button" value="Update Node" onclick="updateNodeDetails(' + arrayIndex + ')"></span>' +
                                '<span><input type="button" value="Delete Node" onclick="deleteNode(' + arrayIndex + ')"></span>' +
                                '<div>' +
                                    '<span>X<input id="nodex-' + arrayIndex + '" class="pos-input" type="number" value="' + node.x + '"></span>' +
                                    '<span>Y<input id="nodey-' + arrayIndex + '" class="pos-input" type="number" value="' + node.y + '"></span>' +
                                    '<span>Z<input id="nodez-' + arrayIndex + '" class="pos-input" type="number" value="' + node.z + '"></span>' +
                                    '<span><input type="button" value="Configure Connected Nodes" onclick="setConnectedNodes(' + arrayIndex + ')"></span>' +
                                '</div>' +
                            '</div>'
            $(".floor-" + node.floor + "-content").append(nodeDiv);
        }

        function updateNodeDetails(arrayIndex){
            const xString = "#nodex-" + arrayIndex;
            const yString = "#nodey-" + arrayIndex;
            const zString = "#nodez-" + arrayIndex;
            const nameString = "#nodename-" + arrayIndex;
            const xNew = parseInt($(xString).val());
            const yNew = parseInt($(yString).val());
            const zNew = parseInt($(zString).val());
            const newName = $(nameString).val();
            pointArray[arrayIndex].updateCoordinates(xNew, yNew, zNew);
            changeNodeName(arrayIndex, newName);
        }

        function changeNodeName(arrayIndex, newName){
            var oldName = pointArray[arrayIndex].name;
            for(var i = 0; i < pointArray.length; i++){
                for(var j = 0; j < pointArray[i].connectedPoints.length; j++){
                    if(pointArray[i].connectedPoints[j] === oldName) pointArray[i].connectedPoints[j] = newName;
                }
            }
            pointArray[arrayIndex].name = newName;
        }

        function deleteNode(arrayIndex){
            pointArray[arrayIndex].removeReferences(pointArray, geometryLines);
            pointArray.splice(arrayIndex, 1);

            $(".point-list").empty();
            for(var i = 0; i < floorCount; i++){
                floorDetails(i);
            }
            $(".point-list").append('<div class="floor-container" id="add-floor"><input type="button" value="Add a Floor" onClick="addFloor()"></div>');
        }

        function setConnectedNodes(arrayIndex){
            $('#current-node-parent').attr('value', arrayIndex);
            $(".connected-node-options").empty();
            $(".connected-node-options").append('Parent Node: ' + pointArray[arrayIndex].name + '<br>');
            for(var n = 0; n < pointArray.length; n++){
                if(n != arrayIndex){
                    var name = pointArray[n].name;
                    var checkboxString = '<input type="checkbox" name="chk[]" value="' + name + '">' + name + '<br>';
                    $(".connected-node-options").append(checkboxString);
                }
            }
            var connected = pointArray[arrayIndex].connectedPoints;
            $('input[name="chk[]"]').each(function(){
                var isChecked = false;
                var reference = $(this);
                for(var n = 0; n < connected.length; n++){
                    if(connected[n] === reference.val()) isChecked = true;
                }
                if(isChecked) reference.prop('checked', true);
            })
            $("#nodeModal").modal();
        }

        function updateConnectedNodes(){
            var parentNode = parseInt($('#current-node-parent').val());
            var newConnected = [];
            $('input[name="chk[]"]:checked').each(function(){
                newConnected.push($(this).val())
            })
            pointArray[parentNode].connectedPoints = newConnected;
            for(var i = 0; i < pointArray.length; i++){
                for(var j = 0; j < newConnected.length; j++){
                    if(pointArray[i].name === newConnected[j]){
                        var alreadyConnected = false;
                        for(var k = 0; k < pointArray[i].connectedPoints.length; k++){
                            if(pointArray[i].connectedPoints[k] === pointArray[parentNode].name) alreadyConnected = true;
                        }
                        if(!alreadyConnected){
                            pointArray[i].connectedPoints.push(pointArray[parentNode].name);
                        }
                    }
                }
            }
            geometryLines.length = 0;
            while(scene.children.length > 0){
                scene.remove(scene.children[0]);
            }
            init();
            $("#nodeModal").modal('hide');
        }