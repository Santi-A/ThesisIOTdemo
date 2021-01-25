 $(".animation-toggle").on('click', function(e){
    if(!isAnimating){
        $(".animation-toggle").val("Pause");
    }
    else{
        $(".animation-toggle").val("Play");
    }
    isAnimating = !isAnimating;
});

$("#time-slider").on('change', function(e){
    currentTime = $("#time-slider").val() - 1;
    nextFrame();
    if(highlight) highlight.updateHighlight();
});

function loadAnimationFile(){       //update this
    isAnimating = false;
    $(".animation-toggle").val("Play");
    currentTime = 0;
    $("#time-slider").val(currentTime);
    $('#file-input').trigger('click');
}

$('#file-input').on('change', function(e){
    $("#timeModal").modal('show');
//    const file = e.target.files[0];
//
//    $(".animation-file-name").empty();
//    $(".animation-file-name").append(file.name);
//
//    var reader = new FileReader();
//    reader.readAsText(file,'UTF-8');
//
//    reader.onload = readerEvent => {
//      var content = readerEvent.target.result.split(/\r?\n|\r/); //csv content
//      var preprocessedRows = [];
//      for(var i = 0; i < content.length; i++){
//        var data = content[i].split(',');
//        if(data[0] && data[1] && data[2] && data[3] && data[4])
//            preprocessedRows.push(new CSVRow(parseFloat(data[0]), data[1], parseFloat(data[2]), parseFloat(data[3]), parseFloat(data[4])));
//      }
//      prepareData(preprocessedRows);
//   }
})

function generateAnimation(){
    const file = $("#file-input").prop('files')[0];
    animationFrames.length = 0;

    $(".animation-file-name").empty();
    $(".animation-file-name").append(file.name);

    var reader = new FileReader();
    reader.readAsText(file,'UTF-8');

    reader.onload = readerEvent => {
      var content = readerEvent.target.result.split(/\r?\n|\r/); //csv content
      var preprocessedRows = [];
      for(var i = 0; i < content.length; i++){
        var data = content[i].split(',');
        if(data[0] && data[1] && data[2] && data[3] && data[4]){
            var csvRow = new CSVRow(parseFloat(data[0]), data[1], parseFloat(data[2]), parseFloat(data[3]), parseFloat(data[4]));
            if(data[5]){
                csvRow.setColor(data[5]);
            }
            preprocessedRows.push(csvRow);
        }
      }
      prepareData(preprocessedRows);
      $("#timeModal").modal('hide');
   }
}

function nextFrame(){       //update this
        if(currentTime < timeMax) currentTime++;
        else currentTime = 0;

        $("#time-slider").val(currentTime);
        for(var p = 0; p < pointArray.length; p++){
            pointArray[p].update();
        }
}

function animate(){     //update this
    requestAnimationFrame( animate );
    controls.update();
    for(var g = 0; g < geometryLines.length; g++){
        geometryLines[g].geometryLine.verticesNeedUpdate = true;
    }
    if(isAnimating){
        nextFrame();
        if(highlight) highlight.updateHighlight();
    }
    renderer.render( scene, camera );
}

animate();