// If using Relative Import References
import * as THREE from '/build/three.module.js'
import { OrbitControls } from '/jsm/controls/OrbitControls'
import Stats from '/jsm/libs/stats.module'
import { GUI } from '/jsm/libs/dat.gui.module'

// If using Module Specifiers
//import * as THREE from 'three'
//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
//import Stats from 'three/examples/jsm/libs/stats.module'
//import { GUI } from 'three/examples/jsm/libs/dat.gui.module'

const scene: THREE.Scene = new THREE.Scene()
//scene.background = new THREE.Color(0xff0000)

const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

// const light = new THREE.PointLight(0xffffff, 2);
// light.position.set(10, 10, 10);
// scene.add(light);

const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
//controls.addEventListener('change', render)

const boxGeometry: THREE.BoxGeometry = new THREE.BoxGeometry()
const sphereGeometry: THREE.SphereGeometry = new THREE.SphereGeometry()
const icosahedronGeometry: THREE.IcosahedronGeometry = new THREE.IcosahedronGeometry(1, 0)
const planeGeometry: THREE.PlaneGeometry = new THREE.PlaneGeometry()
const torusKnotGeometry: THREE.TorusKnotGeometry = new THREE.TorusKnotGeometry()

const material: THREE.MeshMatcapMaterial = new THREE.MeshMatcapMaterial()

// const texture = new THREE.TextureLoader().load("img/grid.png")
// material.map = texture
// const envTexture = new THREE.CubeTextureLoader().load(["img/px_50.png", "img/nx_50.png", "img/py_50.png", "img/ny_50.png", "img/pz_50.png", "img/nz_50.png"])
// envTexture.mapping = THREE.CubeReflectionMapping
// //envTexture.mapping = THREE.CubeRefractionMapping
// material.envMap = envTexture

const matcapTexture = new THREE.TextureLoader().load("img/matcap-opal.png")
//const matcapTexture = new THREE.TextureLoader().load("img/matcap-crystal.png")
//const matcapTexture = new THREE.TextureLoader().load("img/matcap-gold.png")
//const matcapTexture = new THREE.TextureLoader().load("img/matcap-red-light.png")
//const matcapTexture = new THREE.TextureLoader().load("img/matcap-green-yellow-pink.png")
material.matcap = matcapTexture


const cube: THREE.Mesh = new THREE.Mesh(boxGeometry, material)
cube.position.x = 5
scene.add(cube)

const sphere: THREE.Mesh = new THREE.Mesh(sphereGeometry, material)
sphere.position.x = 3
scene.add(sphere)

const icosahedron: THREE.Mesh = new THREE.Mesh(icosahedronGeometry, material)
icosahedron.position.x = 0
scene.add(icosahedron)

const plane: THREE.Mesh = new THREE.Mesh(planeGeometry, material)
plane.position.x = -2
scene.add(plane)

const torusKnot: THREE.Mesh = new THREE.Mesh(torusKnotGeometry, material)
torusKnot.position.x = -5
scene.add(torusKnot)

camera.position.z = 3

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

const stats = Stats()
document.body.appendChild(stats.dom)

var options = {
    side: {
        "FrontSide": THREE.FrontSide,
        "BackSide": THREE.BackSide,
        "DoubleSide": THREE.DoubleSide,
    }
}
const gui = new GUI()

const materialFolder = gui.addFolder('THREE.Material')
materialFolder.add(material, 'transparent')
materialFolder.add(material, 'opacity', 0, 1, 0.01)
materialFolder.add(material, 'depthTest')
materialFolder.add(material, 'depthWrite')
materialFolder.add(material, 'alphaTest', 0, 1, 0.01).onChange(() => updateMaterial())
materialFolder.add(material, 'visible')
materialFolder.add(material, 'side', options.side).onChange(() => updateMaterial())
materialFolder.open()

var data = {
    color: material.color.getHex()
};


var meshMatcapMaterialFolder = gui.addFolder('THREE.MeshMatcapMaterial');
meshMatcapMaterialFolder.addColor(data, 'color').onChange(() => { material.color.setHex(Number(data.color.toString().replace('#', '0x'))) });
meshMatcapMaterialFolder.add(material, 'flatShading').onChange(() => updateMaterial())
meshMatcapMaterialFolder.open()

function updateMaterial() {
    material.side = Number(material.side)
    material.needsUpdate = true
}

var animate = function () {
    requestAnimationFrame(animate)

    render()

    stats.update()
};

function render() {
    renderer.render(scene, camera)
}
animate();