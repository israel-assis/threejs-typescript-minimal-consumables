import * as THREE from '/build/three.module.js'
import { OrbitControls } from '/jsm/controls/OrbitControls'
import Stats from '/jsm/libs/stats.module'
import {GUI} from '/jsm/libs/dat.gui.module'

const scene: THREE.Scene = new THREE.Scene()

let axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.addEventListener('change',render)

const geometry: THREE.BoxGeometry = new THREE.BoxGeometry()
const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })

const cube: THREE.Mesh = new THREE.Mesh(geometry, material)
scene.add(cube)

camera.position.z = 2

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

const stats = Stats()
document.body.appendChild(stats.dom)

const gui = new GUI()
const cubeFolder = gui.addFolder("Cube")
cubeFolder.open()
cubeFolder.add(cube, "visible", true)
const cubeRotationFolder = cubeFolder.addFolder("Rotation")
cubeRotationFolder.add(cube.rotation, "x", 0, Math.PI * 2, 0.01 )
cubeRotationFolder.add(cube.rotation, "y", 0, Math.PI * 2, 0.01 )
cubeRotationFolder.add(cube.rotation, "z", 0, Math.PI * 2, 0.01 )
cubeRotationFolder.open()
const cubePositionFolder = cubeFolder.addFolder("Position")
cubePositionFolder.add(cube.position, "x", -10, 10)
cubePositionFolder.add(cube.position, "y", -10, 10)
cubePositionFolder.add(cube.position, "z", -10, 10)
cubePositionFolder.open()
const cubeScaleFolder = cubeFolder.addFolder("Scale")
cubeScaleFolder.add(cube.scale, "x", -5, 5, .1)
cubeScaleFolder.add(cube.scale, "y", -5, 5, .1)
cubeScaleFolder.add(cube.scale, "z", -5, 5, .1)
cubeScaleFolder.open()

let animate = function () {
    requestAnimationFrame(animate)

    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;

    render()

    stats.update()
};

//! this function may allow faster update
function render () {
//stats.begin()//! these don't work alongside GUI    
renderer.render(scene, camera)
//stats.end()
}

//render()

animate();