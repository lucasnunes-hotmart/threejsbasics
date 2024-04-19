import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

// Criar cena
var scene = new THREE.Scene();
scene.background = 'white'

// Criar câmera
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Criar renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Criar cubo
var geometry = new THREE.BoxGeometry(2,2,2);
var material = new THREE.MeshBasicMaterial({ color: 'red' });
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);
scene.add(cube);

const baseParams = { rotationSpeed: 0.01, width: 2, height: 2, depth: 2 }

const controls = new OrbitControls( camera, renderer.domElement );

controls.update();

init()

// Animação
function animate() {
  requestAnimationFrame(animate);

  // Girar o cubo
  cube.rotation.x += baseParams.rotationSpeed;
  cube.rotation.y += baseParams.rotationSpeed;
  cube.width = baseParams.width
  cube.height = baseParams.height
  cube.depth = baseParams.depth

  controls.update();

  renderer.render(scene, camera);
}

function init() {
  createPanel()
  animate();
}

function createPanel() {

  const panel = new GUI( { width: 310 } );

  const folder1 = panel.addFolder( 'Base Actions' );
  folder1.add(baseParams, 'rotationSpeed', 0, 0.1)
  folder1.add(baseParams, 'width', 10, 200)
  folder1.add(baseParams, 'height', 10, 200)
  folder1.add(baseParams, 'depth', 10, 200)

  folder1.open();

}