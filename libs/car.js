function CreateCameras()
{
	//links cameras to the car, so they move together
	macchina.add(camera);
	macchina.add(camera1);
	macchina.add(camera2);

	// CAMERA 0 - located behind the car
	camera.position.y += 190;
	camera.position.z -= 620;
	camera.rotation.y+=Math.PI;

	// CAMERA 1 - located on driver's seat
	camera1.position.x += 20;
	camera1.position.y += 105;
	camera1.position.z -= 10;
	camera1.rotation.y+=Math.PI;

	//CAMERA 2  - located high, panoramic shot
	camera2.position.y += 1250;
	camera2.position.z -= 1200;
	camera2.rotation.y+=Math.PI;
	camera2.rotation.x+=Math.PI/6;


}

function CreateCar()
{
	macchina=new THREE.Object3D();
	ruota0=new THREE.Object3D();
	ruota1=new THREE.Object3D();
	ruota2=new THREE.Object3D();
	ruota3=new THREE.Object3D();
	var loader = new THREE.OBJMTLLoader();

	loader.load('../models/ruota.obj', '../models/ruota.mtl', function (object, material) {

	object.scale.set(200,200,200);

	//--------link objects to the wheels of the car

	//sxdietro
	ruota0.add(object.clone());

	//dxdavanti
	ruota1.add(object.clone());

	//sxdavanti
	ruota2.add(object.clone());

	//dxdietro
	ruota3.add(object.clone());
	//--------------------------------

 });

	//---we locate the wheels in relationship between themselves
	ruota0.position.x+=66;
	ruota0.position.y=25;
 	ruota0.position.z-=115;

	ruota1.position.x+=66;
	ruota1.position.y=25;
	ruota1.position.z+=135;

	ruota2.position.x-=66;
	ruota2.rotation.y-=Math.PI;
	ruota2.position.y=25;
	ruota2.position.z+=135;

	ruota3.position.x-=66;
	ruota3.rotation.y-=Math.PI;
	ruota3.position.y=25;
	ruota3.position.z-=115;
	//------------------------------------

 loader.load('../models/macchina.obj', '../models/macchina.mtl', function (object, material) {
	 object.scale.set(200,200,200);
	 object.position.y=66;
	 macchina.add(object.clone());
 });

	//we link wheels to the car
	macchina.add(ruota0);
	macchina.add(ruota1);
	macchina.add(ruota2);
	macchina.add(ruota3);

	//add smoke
	createSmoke();
	particleObject.rotation.y = 2*Math.PI/3;
	particleObject.position.x = -45;
	particleObject.position.y = 25;
	particleObject.position.z = -190;
	macchina.add(particleObject);

	macchina.position.set(-2480,1.0,-600.0);
	scene.add(macchina);
}


function key()
{
	if (tasti[40]){
	// BACKWARDS
		indietro();

		if (tasti[39]){
		// LEFT
			sinistra();
		}
		else if (tasti[37]) {
		// RIGHT
			destra();
		}
	}

	if (tasti[38]){
	// FORWARDS
		avanti();

		if (tasti[37]){
		// LEFT
			sinistra();

		}
		else if (tasti[39]){
		// RIGHT
			destra();
		}
	}

	if(!tasti[40] && !tasti[38])
		//engineAudio.source.loop = false;

	// SWITCH CAMERA
	if (tasti[49]) {
	//  CAMERA 0
		sceltacamera = 0;
	}
	else if (tasti[50]) {
	//  CAMERA 1
		sceltacamera = 1;
	}
	else if (tasti[51]) {
	//  CAMERA 2
		sceltacamera = 2;
	}

	if(tasti[67]){//clacson
		var audio = new Audio('../others/clacson.mp3');
		audio.play();
	}
}

function indietro(){
	macchina.position.x += dir.x;
	macchina.position.z += dir.z;

	//wheels flow on the asphalt
	ruota0.rotation.x-=7.0*Math.PI/180.0;
	ruota1.rotation.x-=7.0*Math.PI/180.0;
	ruota2.rotation.x-=7.0*Math.PI/180.0;
	ruota3.rotation.x-=7.0*Math.PI/180.0;
}


function avanti(){
	macchina.position.x -= dir.x;
	macchina.position.z -= dir.z;

	//wheels flow on the asphalt
	ruota0.rotation.x+=7.0*Math.PI/180.0;
	ruota1.rotation.x+=7.0*Math.PI/180.0;
	ruota2.rotation.x+=7.0*Math.PI/180.0;
	ruota3.rotation.x+=7.0*Math.PI/180.0;
}

function sinistra(){
	rotateY(dir, Math.PI*2);
	macchina.rotation.y += Math.PI*2*Math.PI/180.0;
}


function destra(){
	rotateY(dir,-Math.PI*2);
	macchina.rotation.y += -Math.PI*2*Math.PI/180.0;
}


function rotateY(dir,angle){ //"rotates" dir
    var alfa = angle*Math.PI/180.0;
    var x2 = dir.x*Math.cos(alfa)+dir.z*Math.sin(alfa);
    var y2 = dir.y;
    var z2 = -dir.x*Math.sin(alfa)+dir.z*Math.cos(alfa);
    dir.x = x2;
    dir.y = y2;
    dir.z = z2;
}

/**
 * This function creates smoke for the car, and uses ParticleEngine.js
 */
function createSmoke() {

	var smokesettings = {
  		positionStyle    : Type.CUBE,
	  	positionBase     : new THREE.Vector3( 0, 0, 0 ),
	  	positionSpread   : new THREE.Vector3( 0, 0, 0 ),

	  	velocityStyle    : Type.CUBE,
	  	velocityBase     : new THREE.Vector3( 0, 0, 5 ),
	  	velocitySpread   : new THREE.Vector3( 2, 2, 0 ),
	  	accelerationBase : new THREE.Vector3( 0,0,-1 ),

	  	particleTexture : THREE.ImageUtils.loadTexture( path + "smoke.png"),

	  	angleBase               : 200,
	  	angleSpread             : 1000,
	  	angleVelocityBase       : 50,
	  	angleVelocitySpread     : 600,	//velocita' massima rotazione texture

	  	sizeTween    : new Tween( [0, 1], [70, 1000] ),
	  	opacityTween : new Tween( [0.8, 2], [0.2, 0] ),
	  	colorTween   : new Tween( [0.4, 1], [ new THREE.Vector3(0,0,0.2), new THREE.Vector3(0, 0, 0.5) ] ),

	  	particlesPerSecond : 30,
	  	particleDeathAge   : 4.0,
	  	emitterDeathAge    : 60
 	};

    smokeEngine = new ParticleEngine();
 	smokeEngine.setValues( smokesettings );
 	smokeEngine.initialize();
}
