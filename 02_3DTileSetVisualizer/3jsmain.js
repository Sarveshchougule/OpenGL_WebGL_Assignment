import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.156.1/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'https://cdn.jsdelivr.net/npm/three@0.156.1/examples/jsm/loaders/DRACOLoader.js';
import { GUI } from 'https://cdn.jsdelivr.net/npm/three@0.156.1/examples/jsm/libs/lil-gui.module.min.js';
import { FlyOrbitControls } from './FlyOrbitControls.js';
import { CesiumIonTilesRenderer } from './src/index.js';

// Global Variable Declarations 
let gCamera; 
let gScene; 
let gRenderer;
let gControls;
let gTiles;
const cCesiumParameters = {

	'IonAssetId': '1415196',
	'IonAccessToken': '',
	'Reload': ReinstantiateTiles,
};

Main();
function Main()
{
    gScene = new THREE.Scene();
    gRenderer = new THREE.WebGLRenderer( {antialias: true} );
    gRenderer.setPixelRatio(window.devicePixelRatio);
    gRenderer.setSize(window.innerWidth, window.innerHeight);
    gRenderer.setClearColor(0x151c1f);
    gRenderer.domElement.tabIndex = 1;
    document.body.appendChild(gRenderer.domElement);

    Initialize();

    window.addEventListener('resize', Resize, false);
    window.addEventListener('keydown', KeyDown, false);
    window.addEventListener('click', MouseDown, false);

    Display();
}

function Initialize()
{
    // Code
    gCamera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 4000);
    gCamera.position.set(400, 400, 400);

    gControls = new FlyOrbitControls(gCamera, gRenderer.domElement);
	gControls.screenSpacePanning = false;
	gControls.minDistance = 1;
	gControls.maxDistance = 2000;
	gControls.enablePan = true;
	gControls.mouseButtons = {
		LEFT: THREE.MOUSE.PAN,
		MIDDLE: THREE.MOUSE.DOLLY,
		RIGHT: THREE.MOUSE.ROTATE
	};
	gControls.touches = {
		ONE: THREE.TOUCH.ROTATE,
		TWO: THREE.TOUCH.DOLLY_PAN
	};

    ReinstantiateTiles();

    const cGui = new GUI();
	cGui.width = 300;

	const cIonOptions = cGui.addFolder('Ion');
	cIonOptions.add(cCesiumParameters, 'IonAssetId');
	cIonOptions.add(cCesiumParameters, 'IonAccessToken');
	cIonOptions.add(cCesiumParameters, 'Reload');
	cIonOptions.open();
    
    Resize();
}

function ReinstantiateTiles() 
{
	let flag = true;
    // Code 
	if (gTiles) 
    {
		gScene.remove(gTiles.group);
		gTiles.dispose();
		gTiles = null;
	}

	if( !((cCesiumParameters.IonAssetId) && (cCesiumParameters.IonAccessToken)) )
	{
		if(!cCesiumParameters.IonAssetId)
			alert("Ion Asset Id is empty.\nEnter Ion Asset Id.");
		if(!cCesiumParameters.IonAccessToken)
			alert("Ion Asset Token is empty.\nEnter Ion Asset Token.");
		flag = false;
	}
	else
	{
		flag = true;
	}

	if(flag)
	{
		gTiles = new CesiumIonTilesRenderer(cCesiumParameters.IonAssetId, cCesiumParameters.IonAccessToken);
		gTiles.onLoadTileSet = () => 
		{
			const cSphere = new THREE.Sphere();
			gTiles.getBoundingSphere(cSphere);

			const cSpherePosition = cSphere.center.clone();
			const cDistanceToEllipsoidCenter = cSpherePosition.length();

			const cSurfaceDirection = cSpherePosition.normalize();
			const v3UpVector = new THREE.Vector3(0, 1, 0);
			const cRotationToNorthPole = RotationBetweenTwoDirections(cSurfaceDirection, v3UpVector);

			gTiles.group.quaternion.x = cRotationToNorthPole.x;
			gTiles.group.quaternion.y = cRotationToNorthPole.y;
			gTiles.group.quaternion.z = cRotationToNorthPole.z;
			gTiles.group.quaternion.w = cRotationToNorthPole.w;
			gTiles.group.position.y = -cDistanceToEllipsoidCenter;
		};
		SetupTheTiles();
	}
}

function RotationBetweenTwoDirections(direction1, direction2) 
{
	const cQuaternionRotation = new THREE.Quaternion();
	const v3CrossVector = new THREE.Vector3().crossVectors(direction1, direction2);
	cQuaternionRotation.x = v3CrossVector.x;
	cQuaternionRotation.y = v3CrossVector.y;
	cQuaternionRotation.z = v3CrossVector.z;
	cQuaternionRotation.w = 1 + direction1.clone().dot(direction2);
	cQuaternionRotation.normalize();

	return cQuaternionRotation;
}

function SetupTheTiles() 
{
	gTiles.fetchOptions.mode = 'cors'; // Cross-origin resource sharing (CORS) is a mechanism for integrating applications.

	const cDracoLoader = new DRACOLoader();
	cDracoLoader.setDecoderPath('https://unpkg.com/three@0.156.1/examples/jsm/libs/draco/gltf/');

	const cGltfLoader = new GLTFLoader(gTiles.manager);
	cGltfLoader.setDRACOLoader(cDracoLoader);

	gTiles.manager.addHandler(/\.gltf$/, cGltfLoader);
	gScene.add(gTiles.group);
}

function Resize()
{
    // Code
    gCamera.aspect = window.innerWidth / window.innerHeight;
    gCamera.updateProjectionMatrix();

    gRenderer.setSize(window.innerWidth, window.innerHeight);
    gRenderer.setPixelRatio(window.devicePixelRatio);
}

function Display()
{
    // Code
    requestAnimationFrame(Display);
	
    if(!gTiles)
        return;
	gTiles.setCamera(gCamera);
	gTiles.setResolutionFromRenderer(gCamera, gRenderer);

	gCamera.updateMatrixWorld();
	gTiles.update();

    gRenderer.render(gScene, gCamera);
}

function KeyDown(event)
{
	// Code
    switch(event.keyCode)
    {
        case 27:	// ESCAPE
			Uninitialize();
            window.close();	// may not work in Firefox but works in Safari and Chrome.
            break;
    }
}

function MouseDown(event)
{
    // Code
}

function Uninitialize()
{
    // Code
	gTiles.dispose();
	gControls.dispose();
	gRenderer.dispose();
}

