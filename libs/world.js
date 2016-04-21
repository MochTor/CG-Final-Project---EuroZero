
function initWorld(size){
	//make universe
	makeUniverse(size*3/2);

	//make land
	makeLand(size);

	//make circuit
	makeCircuit();

	//make buildings
	makeBuildings();

	//make wheel - ESERCITAZIONE 2
	makeWheel();

	//make street lamp
	makeStreetLamp();
}

function makeUniverse(size){
	// add ambient scene
	var universeGeometry = new THREE.SphereGeometry(size,40,40);
	var universeMaterial = new THREE.MeshBasicMaterial({map:THREE.ImageUtils.loadTexture(path + 'Starfield.png'), side: THREE.BackSide});
	var universe = new THREE.Mesh(universeGeometry,universeMaterial);
	scene.add(universe);

	//LIGHTS
	// add ambient light to the scene
	var ambiColor = "#0f0f0f";
	var ambientLight = new THREE.AmbientLight(ambiColor);
	scene.add(ambientLight);
}

function makeStreetLamp(){
	var streetLamp = new THREE.Object3D();

	//create street lamp geometry
	var geometry = new THREE.CylinderGeometry( 20, 20, 500, 32 );
	var material = new THREE.MeshPhongMaterial( {color: 0xff0000} );
	var cylinder = new THREE.Mesh( geometry, material);
	streetLamp.add( cylinder );

	var geometry2 = new THREE.SphereGeometry( 50, 32, 32 );
	var material2 = new THREE.MeshBasicMaterial( {color: 0xffffff} );
	var sphere = new THREE.Mesh( geometry2, material2 );
	sphere.position.y = 250;

	var spotLight = new THREE.PointLight(0xffffff,5.0,1100);
	spotLight.position.y= 400;
	streetLamp.add(spotLight);

	streetLamp.position.y =250;

	//Lensflare
	var textureFlare0 = THREE.ImageUtils.loadTexture( path + 'lensflare/lensflare0.png' );
	var textureFlare2 = THREE.ImageUtils.loadTexture( path + 'lensflare/lensflare2.png' );
	var textureFlare3 = THREE.ImageUtils.loadTexture( path + 'lensflare/lensflare3.png' );
	var flareColor = new THREE.Color( 0xffaa44 );
   	var lensFlare = new THREE.LensFlare(textureFlare0, 750, 0.0, THREE.AdditiveBlending, flareColor);
	lensFlare.add( textureFlare2, 512, 0.0, THREE.AdditiveBlending );
	lensFlare.add( textureFlare2, 512, 0.0, THREE.AdditiveBlending );
	lensFlare.add( textureFlare2, 512, 0.0, THREE.AdditiveBlending );
	lensFlare.add( textureFlare3, 60, 0.6, THREE.AdditiveBlending );
	lensFlare.add( textureFlare3, 70, 0.7, THREE.AdditiveBlending );
	lensFlare.add( textureFlare3, 120, 0.9, THREE.AdditiveBlending );
	lensFlare.add( textureFlare3, 70, 1.0, THREE.AdditiveBlending );
   	lensFlare.position.copy(sphere.position);
	lensFlare.position.y += 20;
   	streetLamp.add(lensFlare);


	//add streetLamps to scene
	var s1 = streetLamp.clone();
	var l1 = new THREE.LensFlare(textureFlare0, 750, 0.0, THREE.AdditiveBlending, flareColor);
	l1.add( textureFlare2, 512, 0.0, THREE.AdditiveBlending );
	l1.add( textureFlare2, 512, 0.0, THREE.AdditiveBlending );
	l1.add( textureFlare2, 512, 0.0, THREE.AdditiveBlending );
	l1.add( textureFlare3, 60, 0.6, THREE.AdditiveBlending );
	l1.add( textureFlare3, 70, 0.7, THREE.AdditiveBlending );
	l1.add( textureFlare3, 120, 0.9, THREE.AdditiveBlending );
	l1.add( textureFlare3, 70, 1.0, THREE.AdditiveBlending );
   	l1.position.copy(sphere.position);
	l1.position.y += 20;	

	s1.position.x = 1000;
	s1.add(l1);	
	scene.add(s1);

	var s2 = streetLamp.clone();
	s2.position.x = 0;
	s2.position.z = -1200;	
	s2.add(lensFlare);	
	scene.add(s2);

	
	var s2 = streetLamp.clone();
	var l2 = new THREE.LensFlare(textureFlare0, 750, 0.0, THREE.AdditiveBlending, flareColor);
	l2.add( textureFlare2, 512, 0.0, THREE.AdditiveBlending );
	l2.add( textureFlare2, 512, 0.0, THREE.AdditiveBlending );
	l2.add( textureFlare2, 512, 0.0, THREE.AdditiveBlending );
	l2.add( textureFlare3, 60, 0.6, THREE.AdditiveBlending );
	l2.add( textureFlare3, 70, 0.7, THREE.AdditiveBlending );
	l2.add( textureFlare3, 120, 0.9, THREE.AdditiveBlending );
	l2.add( textureFlare3, 70, 1.0, THREE.AdditiveBlending );
   	l2.position.copy(sphere.position);
	l2.position.y += 20;	
	
	s2.position.z = -600;
	s2.position.x = -2000;
	s2.add(l2);	
	scene.add(s2);



	var s3 = streetLamp.clone();
	var l3 = new THREE.LensFlare(textureFlare0, 750, 0.0, THREE.AdditiveBlending, flareColor);
	l3.add( textureFlare2, 512, 0.0, THREE.AdditiveBlending );
	l3.add( textureFlare2, 512, 0.0, THREE.AdditiveBlending );
	l3.add( textureFlare2, 512, 0.0, THREE.AdditiveBlending );
	l3.add( textureFlare3, 60, 0.6, THREE.AdditiveBlending );
	l3.add( textureFlare3, 70, 0.7, THREE.AdditiveBlending );
	l3.add( textureFlare3, 120, 0.9, THREE.AdditiveBlending );
	l3.add( textureFlare3, 70, 1.0, THREE.AdditiveBlending );
   	l3.position.copy(sphere.position);
	l3.position.y += 20;	
	
	s3.position.z = 1600;
	s3.position.x = -2800;
	s3.add(l3);	
	scene.add(s3);
}

function makeLand(size){
	//grass texture
	var grassTexture = THREE.ImageUtils.loadTexture(path + 'grass.png');
	grassTexture.wrapS = THREE.RepeatWrapping;
	grassTexture.wrapT = THREE.RepeatWrapping;
	grassTexture.repeat.set(10,10);

	//our land is a planeGeometry
	var planeGeometry = new THREE.PlaneGeometry(size,size);
	var planeMaterial = new THREE.MeshPhongMaterial({ambient: 0xffffff,side: THREE.DoubleSide, map: grassTexture,  polygonOffset:true, polygonOffsetFactor:5});
	var plane = new THREE.Mesh(planeGeometry,planeMaterial);

	plane.position.y = 0;
	plane.rotation.x = -Math.PI/2;
	scene.add(plane);
}

function makeCircuit(){
	//asphalt texture
	var asphaltTexture = THREE.ImageUtils.loadTexture(path + 'asphalt.png');
	var asphaltRettilineoMaterial = new THREE.MeshPhongMaterial({ambient: 0xffffff,map: asphaltTexture, polygonOffset:true, polygonOffsetFactor:-5});
	var asphaltCurvaMaterial = new THREE.MeshPhongMaterial({ambient: 0xffffff,map: asphaltTexture, polygonOffset:true, polygonOffsetFactor:-10});

	//different textures for straight roads and curves, we will avoid flattering 
	asphaltRettilineoMaterial.renderDepth=50000;
	asphaltCurvaMaterial.renderDepth=50000;

	//component "street" where we add straight roads and curves
	var street = new THREE.Object3D();
	
	//c1, c2, ... c2 are curves
	//r1, r2, ... r2 are straight roads

	var c1Geometry = new THREE.RingGeometry(415,915,60,60,-Math.PI/2,Math.PI/2);
	var c1 = new THREE.Mesh(c1Geometry,asphaltCurvaMaterial);
	c1.position.x = 1500;
	c1.position.z = 1990;
	c1.rotation.x = -Math.PI/2;
	street.add(c1);

	var r2Geometry = new THREE.PlaneGeometry(500,1000);
	var r2 = new THREE.Mesh(r2Geometry,asphaltRettilineoMaterial);
	r2.position.x = 2160;
	r2.position.z = 1500;
	r2.rotation.x = -Math.PI/2;
	street.add(r2);

	var c3Geometry = new THREE.RingGeometry(1315,1815,30,30,-2*Math.PI,Math.PI);
	var c3 = new THREE.Mesh(c3Geometry,asphaltCurvaMaterial);
	c3.position.x = 600;
	c3.position.z = 1000;
	c3.rotation.x = -Math.PI/2;
	street.add(c3);

	var c4Geometry = new THREE.RingGeometry(115,615,30,30,-Math.PI,Math.PI);
	var c4 = new THREE.Mesh(c4Geometry,asphaltCurvaMaterial);
	c4.position.x = -1350;
	c4.position.z = 1000;
	c4.rotation.x = -Math.PI/2;
	street.add(c4);

	var r3Geometry = new THREE.PlaneGeometry(500,2000);
	var r3 = new THREE.Mesh(r3Geometry,asphaltRettilineoMaterial);
	r3.position.x = -1725;
	r3.position.z = 0;
	r3.rotation.x = -Math.PI/2;
	street.add(r3);

	var c5Geometry = new THREE.RingGeometry(115,615,30,30,2*Math.PI,Math.PI);
	var c5 = new THREE.Mesh(c5Geometry,asphaltCurvaMaterial);
	c5.position.x = -2085;
	c5.position.z = -1000;
	c5.rotation.x = -Math.PI/2;
	street.add(c5);

	var r4Geometry = new THREE.PlaneGeometry(500,4200);
	var r4 = new THREE.Mesh(r4Geometry,asphaltRettilineoMaterial);
	r4.position.x = -2450;
	r4.position.z = 1020;
	r4.rotation.x = -Math.PI/2;
	street.add(r4);

	var c6Geometry = new THREE.RingGeometry(115,615,30,30,-Math.PI,Math.PI);
	var c6 = new THREE.Mesh(c6Geometry,asphaltCurvaMaterial);
	c6.position.x = -2075;
	c6.position.z = 3000;
	c6.rotation.x = -Math.PI/2;
	street.add(c6);

	var r5Geometry = new THREE.PlaneGeometry(3000,500);
	var r5 = new THREE.Mesh(r5Geometry,asphaltRettilineoMaterial);
	r5.position.x = 75;
	r5.position.z = 2650;
	r5.rotation.x = -Math.PI/2;
	street.add(r5);

	var c7Geometry = new THREE.RingGeometry(105,605,30,30,Math.PI/2,Math.PI/2);
	var c7 = new THREE.Mesh(c7Geometry,asphaltCurvaMaterial);
	c7.position.x = -1350;
	c7.position.z = 3000;
	c7.rotation.x = -Math.PI/2;
	street.add(c7);

	street.position.z = -1000;
	street.position.x = -750;

	scene.add(street);

}


function makeBuildings(){
	//building1 texture
	var building1texture = THREE.ImageUtils.loadTexture(path + 'building1.png');
	building1texture.wrapS = THREE.RepeatWrapping;
	building1texture.wrapT = THREE.RepeatWrapping;
	building1texture.repeat.set(1,1);

	//building2 texture
	var building2texture = THREE.ImageUtils.loadTexture(path + 'building2.png');
	building1texture.wrapS = THREE.RepeatWrapping;
	building1texture.wrapT = THREE.RepeatWrapping;
	building1texture.repeat.set(1,1);

	//building3 texture
	var building3texture = THREE.ImageUtils.loadTexture(path + 'building3.png');
	building1texture.wrapS = THREE.RepeatWrapping;
	building1texture.wrapT = THREE.RepeatWrapping;
	building1texture.repeat.set(1,1);

	//building4 texture
	var building4texture = THREE.ImageUtils.loadTexture(path + 'building4.png');
	building4texture.wrapS = THREE.RepeatWrapping;
	building4texture.wrapT = THREE.RepeatWrapping;
	building4texture.repeat.set(1,1);

	//building5 texture
	var building5texture = THREE.ImageUtils.loadTexture(path + 'building5.jpg');
	building5texture.wrapS = THREE.RepeatWrapping;
	building5texture.wrapT = THREE.RepeatWrapping;
	building5texture.repeat.set(1,1);

	//building6 texture
	var building6texture = THREE.ImageUtils.loadTexture(path + 'building6.PNG');
	building6texture.wrapS = THREE.RepeatWrapping;
	building6texture.wrapT = THREE.RepeatWrapping;
	building6texture.repeat.set(1,1);

	//----- internal buildings (between the road circuit) 
	var boxGeometry = new THREE.BoxGeometry(1943,850,700,30,30,30);
	var boxMaterial = setArrayMaterial(building1texture);
	var box = new THREE.Mesh(boxGeometry, new THREE.MeshFaceMaterial(boxMaterial) );
	box.position.y = 850/2;
	box.position.x = -50;
	box.position.z = 1000;
	scene.add(box);

	var boxGeometry = new THREE.BoxGeometry(763,1269,700,30,30,30);
	var boxMaterial = setArrayMaterial(building2texture);
	var box = new THREE.Mesh(boxGeometry, new THREE.MeshFaceMaterial(boxMaterial) );
	box.position.y = 1269/2;
	box.position.x = -1400;
	box.position.z = 1000;
	scene.add(box);

	var boxGeometry = new THREE.BoxGeometry(750,1269,700,30,30,30);
	var boxMaterial = setArrayMaterial(building3texture);
	var box = new THREE.Mesh(boxGeometry, new THREE.MeshFaceMaterial(boxMaterial) );
	box.position.y = 1269/2;
	box.position.x = -2200;
	box.position.z = 1000;
	scene.add(box);

	
	//-----external buildings (off the riad circuit)
	var boxGeometry = new THREE.BoxGeometry(763,1269,700,30,30,30);
	var boxMaterial = setArrayMaterial(building1texture);
	var box = new THREE.Mesh(boxGeometry, new THREE.MeshFaceMaterial(boxMaterial) );
	box.position.y = 1269/2;
	box.position.x = -1800;
	box.position.z = -1800;
	scene.add(box);

	var boxGeometry = new THREE.BoxGeometry(763,1269,700,30,30,30);
	var boxMaterial = setArrayMaterial(building5texture);
	var box = new THREE.Mesh(boxGeometry, new THREE.MeshFaceMaterial(boxMaterial) );
	box.position.y = 1269/2;
	box.position.x = -3900;
	box.position.z = -1500;
	scene.add(box);

	var boxGeometry = new THREE.BoxGeometry(763,1269,700,30,30,30);
	var boxMaterial = setArrayMaterial(building4texture);
	var box = new THREE.Mesh(boxGeometry, new THREE.MeshFaceMaterial(boxMaterial) );
	box.position.y = 1269/2;
	box.position.x = -3900;
	box.position.z = -800;
	scene.add(box);

	var boxGeometry = new THREE.BoxGeometry(763,1269,700,30,30,30);
	var boxMaterial = setArrayMaterial(building6texture);
	var box = new THREE.Mesh(boxGeometry, new THREE.MeshFaceMaterial(boxMaterial) );
	box.position.y = 1269/2;
	box.position.x = -3900;
	box.position.z = 800;
	scene.add(box);

	var boxGeometry = new THREE.BoxGeometry(763,1269,700,30,30,30);
	var boxMaterial = setArrayMaterial(building6texture);
	var box = new THREE.Mesh(boxGeometry, new THREE.MeshFaceMaterial(boxMaterial) );
	box.position.y = 1269/2;
	box.position.x = -3900;
	box.position.z = -50;
	scene.add(box);

	var boxGeometry = new THREE.BoxGeometry(763,1269,700,30,30,30);
	var boxMaterial = setArrayMaterial(building4texture);
	var box = new THREE.Mesh(boxGeometry, new THREE.MeshFaceMaterial(boxMaterial) );
	box.position.y = 1269/2;
	box.position.x = -3900;
	box.position.z = 1600;
	scene.add(box);

	var boxGeometry = new THREE.BoxGeometry(763,1269,700,30,30,30);
	var boxMaterial = setArrayMaterial(building4texture);
	var box = new THREE.Mesh(boxGeometry, new THREE.MeshFaceMaterial(boxMaterial) );
	box.position.y = 1269/2;
	box.position.x = -1800;
	box.position.z = 2300;
	scene.add(box);


	var boxGeometry = new THREE.BoxGeometry(1943,850,700,30,30,30);

	var boxMaterial = setArrayMaterial(building1texture);
	var box = new THREE.Mesh(boxGeometry, new THREE.MeshFaceMaterial(boxMaterial) );
	box.position.y = 850/2;
	box.position.x = 00;
	box.position.z = -2300;
	scene.add(box);

	var boxGeometry = new THREE.BoxGeometry(1943,850,700,30,30,30);
	var boxMaterial = setArrayMaterial(building1texture);
	var box = new THREE.Mesh(boxGeometry, new THREE.MeshFaceMaterial(boxMaterial) );
	box.position.y = 850/2;
	box.position.x = 00;
	box.position.z = 2300;
	scene.add(box);

	var boxGeometry = new THREE.BoxGeometry(763,1269,700,30,30,30);
	var boxMaterial = setArrayMaterial(building5texture);
	var box = new THREE.Mesh(boxGeometry, new THREE.MeshFaceMaterial(boxMaterial) );
	box.position.y = 1269/2;
	box.position.x = 2100;
	box.position.z = -1500;
	scene.add(box);

	var boxGeometry = new THREE.BoxGeometry(763,1269,700,30,30,30);
	var boxMaterial = setArrayMaterial(building4texture);
	var box = new THREE.Mesh(boxGeometry, new THREE.MeshFaceMaterial(boxMaterial) );
	box.position.y = 1269/2;
	box.position.x = 2100;
	box.position.z = -800;
	scene.add(box);

	var boxGeometry = new THREE.BoxGeometry(763,1269,700,30,30,30);
	var boxMaterial = setArrayMaterial(building6texture);
	var box = new THREE.Mesh(boxGeometry, new THREE.MeshFaceMaterial(boxMaterial) );
	box.position.y = 1269/2;
	box.position.x = 2100;
	box.position.z = 800;
	scene.add(box);

	var boxGeometry = new THREE.BoxGeometry(763,1269,700,30,30,30);
	var boxMaterial = setArrayMaterial(building6texture);
	var box = new THREE.Mesh(boxGeometry, new THREE.MeshFaceMaterial(boxMaterial) );
	box.position.y = 1269/2;
	box.position.x = 2100;
	box.position.z = -50;
	scene.add(box);

	var boxGeometry = new THREE.BoxGeometry(763,1269,700,30,30,30);
	var boxMaterial = setArrayMaterial(building4texture);
	var box = new THREE.Mesh(boxGeometry, new THREE.MeshFaceMaterial(boxMaterial) );
	box.position.y = 1269/2;
	box.position.x = 2100;
	box.position.z = 1600;
	scene.add(box);

	var boxGeometry = new THREE.BoxGeometry(1943,850,700,30,30,30);
	var boxMaterial = setArrayMaterial(building1texture);
	var box = new THREE.Mesh(boxGeometry, new THREE.MeshFaceMaterial(boxMaterial) );
	box.position.y = 850/2;
	box.position.x = 2000;
	box.position.z = 2300;
	scene.add(box);

	var boxGeometry = new THREE.BoxGeometry(763,1269,700,30,30,30);
	var boxMaterial = setArrayMaterial(building6texture);
	var box = new THREE.Mesh(boxGeometry, new THREE.MeshFaceMaterial(boxMaterial) );
	box.position.y = 1269/2;
	box.position.x = 1600;
	box.position.z = -2300;
	scene.add(box);


	var boxGeometry = new THREE.BoxGeometry(763,1269,700,30,30,30);
	var boxMaterial = setArrayMaterial(building2texture);
	var box = new THREE.Mesh(boxGeometry, new THREE.MeshFaceMaterial(boxMaterial) );
	box.position.y = 1269/2;
	box.position.x = -1850;
	box.position.z = -2550;
	scene.add(box);

	var boxGeometry = new THREE.BoxGeometry(763,1269,700,30,30,30);
	var boxMaterial = setArrayMaterial(building2texture);
	var box = new THREE.Mesh(boxGeometry, new THREE.MeshFaceMaterial(boxMaterial) );
	box.position.y = 1269/2;
	box.position.x = -2650;
	box.position.z = -3000;
	scene.add(box);

	var boxGeometry = new THREE.BoxGeometry(750,1269,700,30,30,30);
	var boxMaterial = setArrayMaterial(building3texture);
	var box = new THREE.Mesh(boxGeometry, new THREE.MeshFaceMaterial(boxMaterial) );
	box.position.y = 1269/2;
	box.position.x = -3700;
	box.position.z = 2800;
	scene.add(box);

	var boxGeometry = new THREE.BoxGeometry(763,1269,700,30,30,30);
	var boxMaterial = setArrayMaterial(building2texture);
	var box = new THREE.Mesh(boxGeometry, new THREE.MeshFaceMaterial(boxMaterial) );
	box.position.y = 1269/2;
	box.position.x = -2650;
	box.position.z = 3000;
	scene.add(box);

	var boxGeometry = new THREE.BoxGeometry(750,1269,700,30,30,30);
	var boxMaterial = setArrayMaterial(building3texture);
	var box = new THREE.Mesh(boxGeometry, new THREE.MeshFaceMaterial(boxMaterial) );
	box.position.y = 1269/2;
	box.position.x = -3700;
	box.position.z = -2800;
	scene.add(box);


}

//function that creates array of textures with, in only one opsition, the roof of a building (
function setArrayMaterial(buildingtexture){
	
	//roof texture
	var buildingRooftexture = THREE.ImageUtils.loadTexture(path + 'roof.jpg');
	buildingRooftexture.wrapS = THREE.RepeatWrapping;
	buildingRooftexture.wrapT = THREE.RepeatWrapping;
	buildingRooftexture.repeat.set(1,1);

	var flattering = -10; //to fight the flattering

		var materials =[
			new THREE.MeshPhongMaterial({
				ambient: 0xffffff,
				map: buildingtexture,  polygonOffset:true, polygonOffsetFactor:flattering }),
			new THREE.MeshPhongMaterial({
				ambient: 0xffffff,
				map: buildingtexture,  polygonOffset:true, polygonOffsetFactor:flattering  }),

			//roof
			new THREE.MeshPhongMaterial({
				ambient: 0xffffff,
				map: buildingRooftexture,  polygonOffset:true, polygonOffsetFactor:flattering
				}),

			new THREE.MeshPhongMaterial({
				ambient: 0xffffff,
				map: buildingtexture,  polygonOffset:true, polygonOffsetFactor:flattering  }),

			new THREE.MeshPhongMaterial({
				ambient: 0xffffff,
				map: buildingtexture,  polygonOffset:true, polygonOffsetFactor:flattering  }),

			new THREE.MeshPhongMaterial({
				ambient: 0xffffff,
				map: buildingtexture,  polygonOffset:true, polygonOffsetFactor:flattering  }),

		];

		return materials;
	}
