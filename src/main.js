import './style.css'

import * as THREE from 'three';

import { GLTFLoader } from 'three/examples/jsm/Addons.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const loader = new GLTFLoader();

let boy;

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
renderer.setSize(window.innerWidth, window.innerHeight);

renderer.render(scene, camera)

// create a cube
const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
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


// adding my own model :)
loader.load(
  "/boy.glb",
  function (gltf) {

    boy = gltf.scene;

    scene.add(boy);

    // resize
    boy.scale.set(1, 1, 1);

    // find the model's center
    const box = new THREE.Box3().setFromObject(boy);
    const center = box.getCenter(new THREE.Vector3());

    // move the model so its center is at the origin
    boy.position.sub(center);

  },

  undefined,

  function (error) {
    console.error(error)
  }
);

// create an animation loop to render the scene
function animate() {
  requestAnimationFrame(animate);

  // rotate the cube
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  // render the scene
  renderer.render(scene, camera);

  if (boy) {
    boy.rotation.y += 0.01;
  }

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

// adding camera
function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0000;
  camera.rotation.y = t * -0.0000;
}

document.body.onscroll = moveCamera;
moveCamera();