// Our Javascript will go here.
scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(15, window.innerWidth / window.innerHeight, 250, 550);

renderer = new THREE.WebGLRenderer();
renderer.setSize(500, 500);
document.body.appendChild(renderer.domElement);

/*
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshDepthMaterial( { color: 0xfcf403 } );
const cube = new THREE.Mesh( geometry, material );
*/
let torusk = { color: 0x00ff00, emissive: 0o00000, wireframe: true }
const geometry = new THREE.TorusKnotGeometry(17, 5, 64, 10, 2, 3);
const material = new THREE.MeshLambertMaterial(torusk);
const torusKnot = new THREE.Mesh(geometry, material);
const ambientlight = new THREE.AmbientLight(0xffffff, 1);
const pointLight = new THREE.PointLight(0x00ff00, 1)

pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)
scene.add(ambientlight)
scene.add(torusKnot);

camera.position.z = 400;

function animate() {

    requestAnimationFrame(animate);

    torusKnot.rotation.x += 0.01;
    torusKnot.rotation.y += 0.05;


    renderer.render(scene, camera);
};

animate();