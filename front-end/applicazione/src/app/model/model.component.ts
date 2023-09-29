import { AfterViewInit, Component, ElementRef, NgZone, OnInit, Renderer2, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from '@avatsaev/three-orbitcontrols-ts';
import { AnimationMixer, AnimationAction, Clock } from 'three';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.scss']
})
export class ModelComponent {
  material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  @ViewChild('canvas') private canvasRef!: ElementRef;

  renderer = new THREE.WebGLRenderer;
  scene;
  camera;
  clock = new Clock();
  mixer: AnimationMixer | undefined;
  controls!: OrbitControls;
  mesh!: THREE.Object3D<THREE.Event>;
  light!: THREE.Object3D<THREE.Event>;
  deviceWidth: number = 0;

  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(35, 800 / 640, 0.1, 1000)
  }
  ngOnInit(): void {
    this.deviceWidth = window.innerWidth;
    //console.log("🚀 ~ file: model-eth.component.ts:42 ~ ModelEthComponent ~ ngAfterViewInit ~ this.deviceWidth:", this.deviceWidth)
  }

  ngAfterViewInit() {
    this.configScene();
    this.configCamera();
    this.configRenderer();
    this.configControls();

    this.createLight();
    this.createMesh();

    this.animate();
  }




  private calculateAspectRatio(): number {
    const height = this.canvas.clientHeight;
    if (height === 0) {
      return 0;
    }
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  private get canvas(): HTMLCanvasElement {
    //this.canvasRef.nativeElement.style.height = this.canvasRef.nativeElement.style.width;
    return this.canvasRef.nativeElement;
  }

  configScene() {
    //qui imposto il colore di sfondo, se non lo inserisco rimane trasparente
    /* this.scene.background = new THREE.Color(0x000000); */
  }

  configCamera() {
    //this.camera.aspect = this.calculateAspectRatio();
    this.camera.aspect = 1;


    this.camera.updateProjectionMatrix();
    this.camera.position.set(5, 5, 15);
    this.camera.lookAt(this.scene.position);
  }

  configRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true
    });
    this.renderer.setPixelRatio(devicePixelRatio);

    this.renderer.setClearColor(0x000000, 0);

    if (this.deviceWidth < 992) {
      const canvasSize = Math.max(this.canvas.clientWidth, this.canvas.clientHeight);
      this.renderer.setSize(canvasSize, canvasSize);
      this.canvas.style.maxWidth = '100%';

      console.log('clientWidth', this.canvas.clientWidth);
      console.log('clientHeight', this.canvas.clientHeight);
    } else if((this.deviceWidth > 991)) {
      // Imposta la canvas come quadrata
      const canvasSize = Math.max(this.canvas.clientWidth, this.canvas.clientHeight);
      this.renderer.setSize(1000, 1000);
      this.canvas.style.height = '100%';
      this.canvas.style.maxWidth = '100%';

      console.log('clientWidth', this.canvas.clientWidth);
      console.log('clientHeight', this.canvas.clientHeight);
    }
    const ambientLight = new THREE.AmbientLight(0xffffff, 5); // Luce ambientale
    this.scene.add(ambientLight);
  }

  configControls() {
    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.autoRotate = true;
    this.controls.enableZoom = false;
    this.controls.enablePan = true;
    this.controls.update();
  }

  createLight() {
    this.light = new THREE.PointLight(0xffffff);
    this.light.position.set(-10, 10, 10);
    this.scene.add(this.light);
  }

  createMesh() {
    const material = new THREE.MeshBasicMaterial({ color: 0xf9af23 });
    const loader = new GLTFLoader();
    loader.load('../../assets/scene.gltf', (gltf) => {
      gltf.scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material = material; // Imposta il materiale personalizzato
        }
      });
      this.mesh = gltf.scene;


      if (this.deviceWidth < 575) {
        // Imposta la grandezza del modello
        const grandezza: number = 3;
        this.mesh.scale.set(grandezza, grandezza, grandezza);
        // Posiziona il modello al centro della scena
        this.mesh.position.set(0, -2, 0);
      } else {
        // Imposta la grandezza del modello
        const grandezza: number =3;
        this.mesh.scale.set(grandezza, grandezza, grandezza);
        // Posiziona il modello al centro della scena
        this.mesh.position.set(0, 0, 0);
      }


      this.scene.add(this.mesh);
    }, undefined, (error) => {
      console.error(error);
    });
  }

  animate() {
    window.requestAnimationFrame(() => this.animate());
    // this.mesh.rotation.x += 0.01;
    /* this.mesh.rotation.y += 0.02; */

    // Aggiorna il mixer dell'animazione con il delta di tempo
    if (this.mixer) {
      this.mixer.update(this.clock.getDelta());
    }

    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
}
