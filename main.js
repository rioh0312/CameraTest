var container, stats;

var camera, controls, scene, renderer, target;

var cross;

init();
animate();

function init() {

    container = document.getElementById('container');

    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(100, 100, 100);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

/*
    controls = new THREE.TrackballControls(camera);
    controls.addEventListener('change', render);
    controls.target.set(0, 0, 0);
    controls.rotateSpeed = 5.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;
*/  
    // world
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xcccccc, 0.002);
    
    target = new THREE.Vector3(0, 0, 0);
    controls = new OrbitControls(camera, target, container);

    var geometry = new THREE.SphereGeometry(20);
    var material = new THREE.MeshNormalMaterial()
    var mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    
    // axis helper
    var axis = new THREE.AxisHelper(1000);
    scene.add(axis);
    axis.position.set(0, 0, 0);
 
    // renderer
    renderer = new THREE.WebGLRenderer({ antialias: false });
    renderer.setClearColor(scene.fog.color);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(900, 600);

    container.appendChild(renderer.domElement);

    render();
}
function animate() {
    render();
    requestAnimationFrame(animate);
    controls.update();
}

function render() {
    renderer.render(scene, camera);
}
function onClickCommand1() {
    camera.position.set(500, 500, 500);
    camera.lookAt(new THREE.Vector3(100, 100, 100));
}