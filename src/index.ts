import './styles/styles.css'
import * as THREE from 'three'
import * as dat from 'dat.gui'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const settings = {
  sizes: {
    width: window.innerWidth,
    height: window.innerHeight
  },
  wireFrame: true
}

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector<HTMLCanvasElement>('canvas.webgl')

// Scene
const scene = new THREE.Scene()

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0011 })
)
scene.add(cube1)

const axesHelper =  new THREE.AxesHelper(2)
scene.add(axesHelper)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(settings.sizes.width, settings.sizes.height)

window.addEventListener('resize', () => {
    // Update sizes
    settings.sizes.width = window.innerWidth
    settings.sizes.height = window.innerHeight

    // Update camera
    camera.aspect = settings.sizes.width / settings.sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(settings.sizes.width, settings.sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
}) 

// Camera
const camera = new THREE.PerspectiveCamera(70, settings.sizes.width / settings.sizes.height, 0.1, 1000)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
//controls.enableDamping = true

const clock = new THREE.Clock()
// Animations 
const tick = () => {

    // time
    const elapsedTime = clock.getElapsedTime();

    // Update controls
    controls.update()

    // three.js render
    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)
}

tick()