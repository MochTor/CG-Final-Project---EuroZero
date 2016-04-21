var scene, renderer;//main elements of scene
var camera,camera1,camera2;
var macchina,ruota0,ruota1,ruota2,ruota3;//car wheels
var tasti=[];//keys pressed
var sceltacamera=0;//camera that has been chosen by the user (default: 0)
var dir = new THREE.Vector3( 0.0, 0.0, -40.0);//movement vector
var path = "../textures/";
var clock = new THREE.Clock();
var smokeEngine;

function main(){
	//inits the main element of scene
	initScene();

	//creates car (body, wheels)
	CreateCar();

	//Creates 3 Cameras associated to the car
	CreateCameras();

	//inits world
	initWorld(10000);

	// add the output of the renderer to the html element
	document.getElementById("WebGL-output").appendChild(renderer.domElement);

	document.onkeydown = function(ev){
		tasti[ev.keyCode] = ev.type === 'keydown';
	};
	document.onkeyup = function(ev){
		tasti[ev.keyCode] = ev.type === 'keydown';
	};

	//render the scene
	render();
}


//init the main element of scene
function initScene(){
	// create a scene, that will hold all our elements such as objects, cameras and lights.
	scene = new THREE.Scene();

	scene.fog = new THREE.FogExp2( 0xcccfcb, 0.0005 );//add fog to the scene

	// create a camera, which defines where we're looking at
	camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 30000);
	camera1 = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 30000);
	camera2= new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 30000);

	//create a render and set size
	renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    	renderer.setClearColor()
    	renderer.setClearColor(new THREE.Color(0xFFFFFF));//colore scena
    	renderer.setSize(window.innerWidth, window.innerHeight);
}

//render the scene
function render(){

	//renders the panoramic wheel
	renderWheel();

	// render using requestAnimationFrame
	requestAnimationFrame(render);

	//picks one camera (3 availables) chosen by the user
	switch (sceltacamera){
		case 0:
			renderer.render(scene, camera);
			break;
		case 1:
			renderer.render(scene, camera1);
			break;
		case 2:
			renderer.render(scene, camera2);
			break;
	}

	//Smoke engine renderer
	smokeEngine.update( 0.01 * 0.5 );

	//keys the user can press
	if (tasti[37] || tasti[38] || tasti[39] || tasti[40] || tasti[49] || tasti[50] || tasti[51] || tasti[67]){
		//function that manages the keys pressing
		key();
	}
}
