statusPool = "";
poolImg = "";
objectsPool = [];

function setup(){
    canvas = createCanvas(600, 450);
    canvas.position(650, 500);

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status_label").innerHTML = "Status: Detecting Objects";
}

function modelLoaded(){
    console.log("CoCoSSD Model is Currently Initialized.");
    statusPool = true;
    objectDetector.detect(poolImg, gotResult);
}

function preload(){
    poolImg = loadImage("homepicture1.jpg");
}

function draw(){
    image(poolImg, 0, 0, 600, 450);

    if (statusPool != ""){
        for(i=0; i < objectsPool.length; i++){
            document.getElementById("status_label").innerHTML = "Status: Objects Detected";
            document.getElementById("statement").innerHTML = "There are 3 large objects, but the CoCoSSD Model detected 1 small object.";

            fill("blue");
            percentage = floor(objectsPool[i].confidence * 100);
            text(objectsPool[i].label + percentage + "%", objectsPool[i].x + 15, objectsPool[i].x + 15);
            noFill();
            stroke("blue");
            rect(objectsPool[i].x, objectsPool[i].y, objectsPool[i].width, objectsPool[i].height);
        }
    }
}

function gotResult(error, result){
    if (error){
        console.error(error);
    }
    else{
        console.log(result);
        objectsPool = result;
    }
}