//ruota panoramica
var wheel; //oggetto corrispondente alla sola ruota
var totalWheel; //oggetto corrispondente alla ruota completa (ruota + base di supporto)
var numCab; //numero delle cabine attaccate alla ruota
var cabsArray = []; //array che memorizza le cabine
var velRotazione = 0.005; //velocità iniziale di rotazione

function makeWheel() {
	//numero di cabine
	numCab=12,
	
	//larghezza e altezza delle cabine
	widthCab=120,heightCab=120
	
	//raggio della ruota
	radiusWheel=1000;
	
	//crea la ruota (senza la base)
	wheel=new THREE.Object3D();
	CreateWheel(wheel,radiusWheel);
	
	//aggiunge le cabine alla ruota
	CreateCab(wheel,radiusWheel,heightCab,widthCab);
	
	//inizializzo l'oggetto corrispondente alla ruota completa (ruota + cabine + base)
	totalWheel=new THREE.Object3D();
	
	//crea la base e la aggiunge all'oggetto della ruota completa
	CreateStand(totalWheel,radiusWheel);
	
	//aggiunge la ruota all'oggetto della ruota completa
	totalWheel.add(wheel);
	
	//posiziono la ruota completa
	totalWheel.position.y=1500;
	totalWheel.position.x=-100;
	totalWheel.position.z=-400;
	
	scene.add(totalWheel);
}

//render the scene
function renderWheel(){
	//rotazione della ruota panoramica

	wheel.rotation.z+=velRotazione;
	
	for(i=0;i<numCab;i++)
		cabsArray[i].rotation.z-=velRotazione; //antirotazione
	
}


/*
Crea solo la ruota (quindi senza la base)
passo l'oggetto wheel, il raggio della ruota, il numero di cabine
*/
function CreateWheel(ruota,raggioRuota){
	material=new THREE.MeshLambertMaterial({color:0xffffff});
	
	//creazione tubi circolari
	var torusGeom=new THREE.TorusGeometry(raggioRuota,25,30,200);
	ruota.add(new THREE.Mesh(torusGeom,material));
	torusGeom=new THREE.TorusGeometry(raggioRuota-150,25,30,200);
	ruota.add(new THREE.Mesh(torusGeom,material));

	torusGeom=new THREE.TorusGeometry(raggioRuota/2,30,30,200);
	var supporto = new THREE.Mesh(torusGeom, material);
	supporto.position.z=-35;
	ruota.add(supporto);
	
	torusGeom=new THREE.TorusGeometry(raggioRuota/2,2.5,30,200);
	supporto = new THREE.Mesh(torusGeom, material);
	supporto.position.z=+3;
	ruota.add(supporto);
	
	//creazione delle aste
	var incrementoAngolo = 2*Math.PI/numCab; //la distanza (in radianti) tra un'asta e l'altra
	var angoloAttuale = 0;
	

	cylinderGeom=new THREE.CylinderGeometry(30,30,200, 300);
	
	//variabili gancio, asta, 
	var hook, poleGeom, poleMesh;
	
	//per ogni asta:
	for(var i=0;i<numCab;i++){
		//creazione e posizionamento gancio
		hook=new THREE.Mesh(cylinderGeom,material);
		hook.rotation.x=Math.PI/2;
		hook.position.x=raggioRuota*Math.cos(angoloAttuale);
		hook.position.y=raggioRuota*Math.sin(angoloAttuale);
		hook.position.z=10;
		
		//aggiungo il gancio all'oggetto wheel
		ruota.add(hook)
		
		if(i<numCab/2){//un'asta è lunga 2*raggio, va a toccare 2 cabine
			//creazione e posizionamento cabsArray
			poleGeom=new THREE.CylinderGeometry(20,20,2*raggioRuota+20);
			poleMesh=new THREE.Mesh(poleGeom,material);
			poleMesh.rotation.z=angoloAttuale+Math.PI/2;//bisogna partire dall'poleMesh orizzontale, con solo angoloAttuale parte verticalmente =>90gradi di differenza rispetto alla partenza  delle cabine e delle aste
			
			//aggiungo l'asta all'oggetto wheel
			ruota.add(poleMesh);
		}
		
		angoloAttuale+=incrementoAngolo;
	}
}


/*
Crea tutte le cabine
passo l'oggetto wheel, il raggio della ruota, l'altezza/larghezza delle cabine
*/
function CreateCab(ruota,raggioRuota,heightCab,widthCab){
	var incrementoAngolo=(2*Math.PI)/numCab; //la distanza (in radianti) tra un'asta e l'altra
	var angoloAttuale=0;
	
	//vettore che contiene i diversi colori da assegnare alle cabine
	var coloriCabine = [
		0xFF0000 , 0xFF0033,
		0xFF0066, 0x990099,
		0x660099, 0x000099,
		0x009933, 0x00FF33,
		0x33FF00, 0xFFFF00,
	]
		
	var distanziamento = widthCab/2+25;//distanzio la cabine di 20 dalla ruota

	//per ogni cabina:
	for(var i=0;i<numCab;i++){
		cabsArray[i]=new THREE.Object3D(); //aggiungo un elemento al vettore contenente le cabine
		
		//aggiorno la posizione della cabina
		cabsArray[i].position.x=raggioRuota*Math.cos(angoloAttuale);
		cabsArray[i].position.y=raggioRuota*Math.sin(angoloAttuale);;
		cabsArray[i].position.z=distanziamento;
		
		//crea le componenti della cabina
		DrawCab(cabsArray[i],coloriCabine[i%numCab],heightCab,widthCab);
		
		ruota.add(cabsArray[i]); //aggiungo la cabina all'oggetto wheel
		
		angoloAttuale+=incrementoAngolo;
	}
}


/*
Crea le componenti di una cabina e le aggiunge all'oggetto cabina[i] 
passo l'oggetto cabina[i], il colore della cabina, l'altezza/larghezza della cabina
*/
function DrawCab(cabina,colore,heightCab,widthCab){
	var material=new THREE.MeshPhongMaterial({color:colore});
	
	//creazione delle due cupole che formano una cabina
	var cupolaGeometry = new THREE.SphereGeometry(widthCab,30,30,0, 2*Math.PI, 0, 1.5);
	var cupola=new THREE.Mesh(cupolaGeometry,material);
	cupola.material.side = THREE.DoubleSide;
	cupola.position.y=-(3 + widthCab);
	cupola.rotation.y+=Math.PI/4;
	cabina.add(cupola); //aggiungo a wheel
	
	cupolaGeometry = new THREE.SphereGeometry(widthCab,30,30,0, 2*Math.PI, 0, 1.5);
	cupola=new THREE.Mesh(cupolaGeometry,material);
	cupola.material.side = THREE.DoubleSide;
	cupola.position.y=-(3+widthCab+heightCab);
	cupola.rotation.x=Math.PI;
	cabina.add(cupola); //aggiungo a wheel
	
	
	//creazione delle asticelle che uniscono le due cupole
	var poleGeom = new THREE.CylinderGeometry(10, 10, heightCab*2, 30);
	
	var poleMesh = new THREE.Mesh(poleGeom, material);
	
	poleMesh.position.x = -(widthCab/2+1.5);
	poleMesh.position.y = -(3+widthCab+heightCab/2);
	cabina.add(poleMesh);
	
	var poleMesh = new THREE.Mesh(poleGeom, material);
	poleMesh.position.x = widthCab/2+1.5;
	poleMesh.position.y = -(3+widthCab+heightCab/2);
	cabina.add(poleMesh);
	
	var poleMesh = new THREE.Mesh(poleGeom, material);
	poleMesh.position.z = -(widthCab/2+1.5);
	poleMesh.position.y = -(3+widthCab+heightCab/2);
	cabina.add(poleMesh);
	
	var poleMesh = new THREE.Mesh(poleGeom, material);
	poleMesh.position.z = widthCab/2+1.5;
	poleMesh.position.y = -(3+widthCab+heightCab/2);
	cabina.add(poleMesh);
}

/*
Crea la base della ruota e lo aggiunge all'oggetto totalWheel 
passo l'oggetto totalWheel e il raggio della ruota
*/
function CreateStand(ruotaCompleta,raggio) {
	var widthPivot = 200; //diametro del perno centrale
	var widthPlank = 300; //diametro degli assi portanti
	
	material=new THREE.MeshLambertMaterial({color:0xffffff});
	
	//creazione perno centrale
	var pivotMesh=new THREE.Mesh(new THREE.CylinderGeometry(widthPivot,widthPivot,widthPlank),material);
	pivotMesh.rotation.x=Math.PI/2;
	ruotaCompleta.add(pivotMesh);

	//creazione dei globi -attaccati al perno centrale
	var bulbGeom=new THREE.SphereGeometry(widthPivot*0.75,30,30);
	var bulbMesh=new THREE.Mesh(bulbGeom,material);
	bulbMesh.position.z=widthPlank/2;
	ruotaCompleta.add(bulbMesh);
	
	bulbMesh=new THREE.Mesh(bulbGeom,material);
	bulbMesh.position.z=-widthPlank/2;
	ruotaCompleta.add(bulbMesh);

	//creazione dei 4 assi portanti
	CreatePlank(Math.PI/15, 250, widthPlank/2+130);
	
	CreatePlank(-Math.PI/15, -250, widthPlank/2+130);

	CreatePlank(Math.PI/15, 250, -(widthPlank/2+130));
	
	CreatePlank(-Math.PI/15, -250, -(widthPlank/2+130));
	
	//creazione insegne rosse
	var materialeInsegna = new THREE.MeshLambertMaterial( { color: 0xFF0000, side: THREE.DoubleSide } );
	var insegnaGeometry=new THREE.RingGeometry(200,350,30,30,Math.PI/4,1.5);
	
	insegna=new THREE.Mesh(insegnaGeometry,materialeInsegna);
	insegna.position.y=-200;
	insegna.position.z=300;
	ruotaCompleta.add(insegna);
	
	insegna=new THREE.Mesh(insegnaGeometry,materialeInsegna);
	insegna.position.y=-200;
	insegna.position.z=-300;
	ruotaCompleta.add(insegna);
	
	//crea asse portante (passo l'oggetto totalWheel, le coordinate assi x e z)
	function CreatePlank(inclinazione, x,z){
		material=new THREE.MeshLambertMaterial({color:0xffffff});
		
		var poleGeom=new THREE.CylinderGeometry(25,25,raggio*2-350);
		
		poleMesh=new THREE.Mesh(poleGeom,material);
		poleMesh.rotation.z=inclinazione;
		poleMesh.position.x=x;
		poleMesh.position.y=-(raggio/2)-200;
		poleMesh.position.z=z;
		ruotaCompleta.add(poleMesh);
	}
}


function rotateY(dir,angle){
    var theta = angle*Math.PI/180.0;
    var xx = dir.x*Math.cos(theta)+dir.z*Math.sin(theta);
    var yy = dir.y;
    var zz = -dir.x*Math.sin(theta)+dir.z*Math.cos(theta);
    dir.x = xx;
    dir.y = yy;
    dir.z = zz;
}

function cross(dir,up,side){
    side.x = dir.y * up.z - dir.z * up.y;
    side.y = dir.z * up.x - dir.x * up.z;
    side.z = dir.x * up.y - dir.y * up.x;
}