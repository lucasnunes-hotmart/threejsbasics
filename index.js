import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

// Criar cena
var scene = new THREE.Scene();

// Criar câmera
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const controls = new OrbitControls( camera, renderer.domElement );

// Criar renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Criar cubo
var geometry = new THREE.BoxGeometry();
var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

controls.update();

init()

// Animação
function animate() {
  requestAnimationFrame(animate);

  // Girar o cubo
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  controls.update();

  renderer.render(scene, camera);
}

function init() {
  animate();
}

function createPanel() {

  const panel = new GUI( { width: 310 } );

  const folder1 = panel.addFolder( 'Base Actions' );
  const folder2 = panel.addFolder( 'Additive Action Weights' );
  const folder3 = panel.addFolder( 'General Speed' );

  panelSettings = {
    'modify time scale': 1.0
  };

  const baseNames = [ 'None', ...Object.keys( baseActions ) ];

  for ( let i = 0, l = baseNames.length; i !== l; ++ i ) {

    const name = baseNames[ i ];
    const settings = baseActions[ name ];
    panelSettings[ name ] = function () {

      const currentSettings = baseActions[ currentBaseAction ];
      const currentAction = currentSettings ? currentSettings.action : null;
      const action = settings ? settings.action : null;

      if ( currentAction !== action ) {

        prepareCrossFade( currentAction, action, 0.35 );

      }

    };

    crossFadeControls.push( folder1.add( panelSettings, name ) );

  }

  for ( const name of Object.keys( additiveActions ) ) {

    const settings = additiveActions[ name ];

    panelSettings[ name ] = settings.weight;
    folder2.add( panelSettings, name, 0.0, 1.0, 0.01 ).listen().onChange( function ( weight ) {

      setWeight( settings.action, weight );
      settings.weight = weight;

    } );

  }

  folder3.add( panelSettings, 'modify time scale', 0.0, 1.5, 0.01 ).onChange( modifyTimeScale );

  folder1.open();
  folder2.open();
  folder3.open();

  crossFadeControls.forEach( function ( control ) {

    control.setInactive = function () {

      control.domElement.classList.add( 'control-inactive' );

    };

    control.setActive = function () {

      control.domElement.classList.remove( 'control-inactive' );

    };

    const settings = baseActions[ control.property ];

    if ( ! settings || ! settings.weight ) {

      control.setInactive();

    }

  } );

}