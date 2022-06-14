statusBasement = "";
BasementImg = "";
objectsBasement = [];

function setup(){
    canvas = createCanvas(600, 450);
    canvas.position(650, 500);

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status_label").innerHTML = "Status: Detecting Objects";
}

function modelLoaded(){
    console.log("CoCoSSD Model is Currently Initialized.");
    statusBasement = true;
    objectDetector.detect(BasementImg, gotResult);
}

function preload(){
    BasementImg = loadImage("homepicture5.jpg");
}

function draw(){
    image(BasementImg, 0, 0, 600, 450);

    if (statusBasement != ""){
        for(i=0; i < objectsBasement.length; i++){
            document.getElementById("status_label").innerHTML = "Status: Objects Detected";
            document.getElementById("statement").innerHTML = "There are 2 large objects and countless small objects, but the CoCoSSD Model didn't detect any objects.";

            fill("blue");
            percentage = floor(objectsBasement[i].confidence * 100);
            text(objectsBasement[i].label + percentage + "%", objectsBasement[i].x + 15, objectsBasement[i].x + 15);
            noFill();
            stroke("blue");
            rect(objectsBasement[i].x, objectsBasement[i].y, objectsBasement[i].width, objectsBasement[i].height);
        }
    }
}

function gotResult(error, result){
    if (error){
        console.error(error);
    }
    else{
        console.log(result);
        objectsBasement = result;
    }
}