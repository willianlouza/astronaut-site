import * as THREE from "./three.js/build/three.module.js";
const app = document.getElementById("app");

let scene, camera, renderer;
let stars = [];
let jupiter, mars;

class SceneObject {
  constructor(geometry, material, mesh) {
    this.geometry = geometry;
    this.material = material;
    this.mesh = mesh;
    this.speed = Math.random() * 0.01 + 0.001;
    this.directionX = 1;
    this.directionY = 1;
    this.rotation = [0,0,0];
  }
  mesh() {
    return this.mesh;
  }
  move() {
    this.mesh.position.x += this.speed * Math.sin(this.directionX);
    this.mesh.position.y += this.speed * Math.sin(this.directionY);
    this.directionX += 0.01;
    this.directionY += 0.03;
  }
  rotate(){
    this.rotation[0] += 0.0001;
    this.rotation[1] += 0.0003;
    this.rotation[2] += 0.0002;
    this.mesh.rotation.set(this.rotation[0],this.rotation[1],this.rotation[2]);
  }
}

init();
animate();

function createStars() {
  for (let i = 0; i < 5000; i++) {
    const geometry = new THREE.SphereGeometry();
    const material = new THREE.MeshBasicMaterial({ color: "#FFF" });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.scale.set(0.1, 0.1, 0.1);
    sphere.position.x = Math.floor(Math.random() * 150) - 75;
    sphere.position.y = Math.floor(Math.random() * 100) - 50;
    sphere.position.z = Math.floor(Math.random() * 50) - 25;

    let s = new SceneObject(geometry, material, sphere);
    stars.push(s);
    scene.add(s.mesh);
  }
}

window.addEventListener("mousemove", (event) => {
  let mouseX = event.clientX - document.body.clientWidth / 2;
  let mouseY = event.clientY - document.body.clientHeight / 2;

  camera.position.x = mouseX * 0.005;
  camera.position.y = -mouseY * 0.005;
});

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 50;
  //camera.lookAt(0, 0, 0);

  const light = new THREE.DirectionalLight();
  light.intensity = 0.5;
  light.position.set(-1, 1, 1);
  scene.add(light);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  app.appendChild(renderer.domElement);

  createStars();
  createPlanets();

  window.addEventListener("resize", onResize);
}
function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}
function animate() {
  requestAnimationFrame(animate);
  camera.lookAt(scene.position);
  renderer.render(scene, camera);

  stars.forEach((star) => {
    star.move();
  });
  mars.rotate();
  mars.move();
  jupiter.rotate();
  jupiter.move();
}

function createPlanets() {
  const loader = new THREE.TextureLoader();
  let sphereGeometry = new THREE.SphereGeometry(1, 30, 30);

  const jupiterMaterial = new THREE.MeshLambertMaterial({
    map: loader.load("./assets/2k_jupiter.jpg"),
  });
  const jupiterMesh = new THREE.Mesh(sphereGeometry, jupiterMaterial);
  jupiterMesh.position.set(50, 15, -30);
  jupiterMesh.scale.set(35, 35, 35);
  jupiterMesh.rotation.set(50, 60, 30);
  jupiter = new SceneObject(sphereGeometry, jupiterMaterial, jupiterMesh);
  scene.add(jupiter.mesh);

  const marsMaterial = new THREE.MeshLambertMaterial({
    map: loader.load("./assets/2k_mars.jpg"),
  });
  const marsMesh = new THREE.Mesh(sphereGeometry, marsMaterial);
  marsMesh.position.set(-30, -10, 20);
  marsMesh.scale.set(15, 15, 15);
  mars = new SceneObject(sphereGeometry, marsMaterial, marsMesh);
  scene.add(mars.mesh);
}

function load(){
  const loadbar = document.getElementById("load-bar").style.display = "none";
  const loadscreen = document.getElementById("load-screen");
  setInterval(() =>{
    document.querySelector(".left").classList.add("fade-left");
    document.querySelector(".right").classList.add("fade-right");
    setInterval(()=>{
      loadscreen.style.display = "none";
    }, 1000);
  }, 300);
}
window.onload = load;
