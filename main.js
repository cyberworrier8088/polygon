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

// move the camera back so we can see the cube
camera.position.z = 5;

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
