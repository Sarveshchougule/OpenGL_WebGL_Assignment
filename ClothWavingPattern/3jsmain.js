// Global Variable Declarations 
let camera, scene, renderer;
let gPlane;
let texture;
let geometryPlane;
let materialPlane;
let clock;

main();
function main()
{
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer( {antialias: true} );
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff, 1);
    document.body.appendChild(renderer.domElement);

    initialize();

    window.addEventListener('resize', resize, false);
    window.addEventListener('keydown', keyDown, false);
    window.addEventListener('click', mouseDown, false);

    display();
}

function initialize()
{
    // Code
    texture = new THREE.TextureLoader().load('Carpet.jpg');
    clock = new THREE.Clock();

    geometryPlane = new THREE.PlaneGeometry(0.4, 0.6, 16, 16);
    materialPlane = new THREE.ShaderMaterial({
        vertexShader: document.getElementById('VertexShader').textContent,
        fragmentShader: document.getElementById('FragmentShader').textContent,
        uniforms: {
            uTexture: { value: texture },
            uTime: { value: 0.0 },
        },
        wireframe: false,
        side: THREE.DoubleSide
    });
    gPlane = new THREE.Mesh(geometryPlane, materialPlane);
    scene.add(gPlane);

    camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 100);
    camera.position.z = 4;
    resize();
}

function resize()
{
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function display()
{
    requestAnimationFrame(display);

    gPlane.scale.x = 2.0;
    gPlane.scale.y = 1.8;
    gPlane.rotation.x = -45.0;
    gPlane.rotation.z = -45.0;
    gPlane.position.z = 1.5;

    materialPlane.uniforms.uTime.value = clock.getElapsedTime();

    renderer.render(scene, camera);
}

function keyDown(event)
{
    switch(event.keyCode)
    {
        case 27:	// ESCAPE
            uninitialize();
            window.close();	// may not work in Firefox but works in Safari and Chrome.
            break;
        
        case 70:	// for 'F' or 'f'
            break;
    }
}

function mouseDown()
{
    // Code
}

function uninitialize()
{
    // Code
    clock.dispose();
    materialPlane.dispose();
    geometryPlane.dispose();
    texture.dispose();
    renderer.dispose();
    scene.dispose();
}

