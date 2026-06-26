import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// create a cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const texture = new THREE.TextureLoader().load("img.png")
const material = new THREE.MeshBasicMaterial({ map: texture });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// adding donut shape
const donut_geo = new THREE.TorusGeometry(10, 3, 16, 100);
const donut_tex = new THREE.MeshBasicMaterial({ color: 0xffffff });
const donut = new THREE.Mesh(donut_geo, donut_tex);
scene.add(donut);


// move the camera back so we can see the cube
camera.position.z = 18;

// create an animation loop to render the scene
function animate() {
  requestAnimationFrame(animate);

  // rotate the cube
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  // render the scene
  renderer.render(scene, camera);
}
animate();


// adding star to page
function add_star() {
  const star_geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const star_material = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(star_geometry, star_material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(200));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(900).fill().forEach(add_star);

