function setup()
{
    canvas=createCanvas(280, 280);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
    synth=window.speechSynthesis;

}

function clearCanvas()
{
    background("white");
}

function preload()
{
    classifier=ml5.imageClassifier('DoodleNet');
}

function draw()
{
    strokeWeight(5);
    stroke(0);
    
    if(mouseIsPressed){
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
    updateCanvas();
}

function classifyCanvas()
{
    classifier.classify(canvas,gotResult);
}

function gotResult(error,results)
{
    if(error){
        console.error(error);
    }
    console.log(results);
    document.getElementById("label").innerHTML="label:"+results[0].label;
    document.getElementById("confidence").innerHTML="confidence:"+Math.round(results[0].confidence*100)+"%";

    utterThis=new SpeechSynthesisUtterance(results[0].label);
    synth.speak(utterThis);
}

function updateCanvas()
{
    random_number=Math.floor((Math.random()*quick_draw_data_set.length)+1);
    sketch=quick_draw_data_set[random_number];
    document.getElementById("sketch_name").innerHTML='sketch to be drawn :'+sketch;
}