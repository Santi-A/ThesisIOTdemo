 $(".animation-toggle").on('click', function(e){
    if(!isAnimating){
        $(".animation-toggle").val("Pause");
        scene.remove(scene.getObjectByName('highlight'));
    }
    else{
        $(".animation-toggle").val("Play");
    }
    isAnimating = !isAnimating;
});

$(".load-file").on('click', function(e){
    loadAnimationFile();
    isAnimating = false;
});

$("#time-slider").on('change', function(e){
    currentTime = $("#time-slider").val() - 1;
    nextFrame();
});

function loadAnimationFile(){       //update this
    animationFrames.length = 0;
    currentTime = 0;
    $("#time-slider").val(currentTime);
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
    if(isAnimating) nextFrame();
    renderer.render( scene, camera );
}

animate();