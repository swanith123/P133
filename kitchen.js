statusKitchen = "";
kitchenImg = "";
objectsKitchen = [];

function setup(){
    canvas = createCanvas(600, 450);
    canvas.position(650, 500);

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status_label").innerHTML = "Status: Detecting Objects";
}

function modelLoaded(){
    console.log("CoCoSSD Model is Currently Initialized.");
    statusKitchen = true;
    objectDetector.detect(kitchenImg, gotResult);
}

function preload(){
    kitchenImg = loadImage("homepicture3.jpg");
}

function draw(){
    image(kitchenImg, 0, 0, 600, 450);

    if (statusKitchen != ""){
        for(i=0; i < objectsKitchen.length; i++){
            document.getElementById("status_label").innerHTML = "Status: Objects Detected";
            document.getElementById("statement").innerHTML = "There are 4 large objects and countless small objects, but the CoCoSSD Model could'nt properly detect any objects.";

            fill("blue");
            percentage = floor(objectsKitchen[i].confidence * 100);
            text(objectsKitchen[i].label + percentage + "%", objectsKitchen[i].x + 15, objectsKitchen[i].x + 15);
            noFill();
            stroke("blue");
            rect(objectsKitchen[i].x, objectsKitchen[i].y, objectsKitchen[i].width, objectsKitchen[i].height);
        }
    }
}

function gotResult(error, result){
    if (error){
        console.error(error);
    }
    else{
        console.log(result);
        objectsKitchen = result;
    }
}