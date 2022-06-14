statusLivingRoom = "";
LivingRoomImg = "";
objectsLivingRoom = [];

function setup(){
    canvas = createCanvas(600, 450);
    canvas.position(650, 500);

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status_label").innerHTML = "Status: Detecting Objects";
}

function modelLoaded(){
    console.log("CoCoSSD Model is Currently Initialized.");
    statusLivingRoom = true;
    objectDetector.detect(LivingRoomImg, gotResult);
}

function preload(){
    LivingRoomImg = loadImage("homepicture4.jpg");
}

function draw(){
    image(LivingRoomImg, 0, 0, 600, 450);

    if (statusLivingRoom != ""){
        for(i=0; i < objectsLivingRoom.length; i++){
            document.getElementById("status_label").innerHTML = "Status: Objects Detected";
            document.getElementById("statement").innerHTML = "There are 3 large objects and countless small objects, but the CoCoSSD Model detected 1 large object.";

            fill("blue");
            percentage = floor(objectsKitchen[i].confidence * 100);
            text(objectsLivingRoom[i].label + percentage + "%", objectsLivingRoom[i].x + 15, objectsLivingRoom[i].x + 15);
            noFill();
            stroke("blue");
            rect(objectsLivingRoom[i].x, objectsLivingRoom[i].y, objectsLivingRoom[i].width, objectsLivingRoom[i].height);
        }
    }
}

function gotResult(error, result){
    if (error){
        console.error(error);
    }
    else{
        console.log(result);
        objectsLivingRoom = result;
    }
}