import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 10000000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
const light = new THREE.PointLight(0xffffff, 3);
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2); // 环境光

const controls = new OrbitControls(camera, renderer.domElement);

const group = new THREE.Group(); //太阳系组
const sunGroup = new THREE.Group(); //太阳组
const sunGroupParent = new THREE.Group();
const mercuryGroup = new THREE.Group(); //水星组
const mercuryGroupParent = new THREE.Group();
const venusGroup = new THREE.Group(); //金星组
const venusGroupParent = new THREE.Group();
const earthGroup = new THREE.Group(); //地球组
const earthGroupParent = new THREE.Group();
const marsGroup = new THREE.Group(); //火星组
const marsGroupParent = new THREE.Group();
const jupiterGroup = new THREE.Group(); //木星组
const jupiterGroupParent = new THREE.Group();
const saturnGroup = new THREE.Group(); //土星组
const saturnGroupParent = new THREE.Group();
const uranusGroup = new THREE.Group(); //天王星组
const uranusGroupParent = new THREE.Group();
const neptuneGroup = new THREE.Group(); //海王星组
const neptuneGroupParent = new THREE.Group();

//轨道
const mercuryArc = new THREE.ArcCurve(0, 0, 1000, 0, 2 * Math.PI);
const venusArc = new THREE.ArcCurve(0, 0, 2000, 0, 2 * Math.PI);
const earthArc = new THREE.ArcCurve(0, 0, 3000, 0, 2 * Math.PI);
const marsArc = new THREE.ArcCurve(0, 0, 4000, 0, 2 * Math.PI);
const jupiterArc = new THREE.ArcCurve(0, 0, 5000, 0, 2 * Math.PI);
const saturnArc = new THREE.ArcCurve(0, 0, 6000, 0, 2 * Math.PI);
const uranusArc = new THREE.ArcCurve(0, 0, 7000, 0, 2 * Math.PI);
const neptuneArc = new THREE.ArcCurve(0, 0, 8000, 0, 2 * Math.PI);

const mercuryGeometry = new THREE.BufferGeometry();
const venusGeometry = new THREE.BufferGeometry();
const earthGeometry = new THREE.BufferGeometry();
const marsGeometry = new THREE.BufferGeometry();
const jupiterGeometry = new THREE.BufferGeometry();
const saturnGeometry = new THREE.BufferGeometry();
const uranusGeometry = new THREE.BufferGeometry();
const neptuneGeometry = new THREE.BufferGeometry();

mercuryGeometry.setFromPoints(mercuryArc.getPoints(1000));
venusGeometry.setFromPoints(venusArc.getPoints(1000));
earthGeometry.setFromPoints(earthArc.getPoints(1000));
marsGeometry.setFromPoints(marsArc.getPoints(1000));
jupiterGeometry.setFromPoints(jupiterArc.getPoints(1000));
saturnGeometry.setFromPoints(saturnArc.getPoints(1000));
uranusGeometry.setFromPoints(uranusArc.getPoints(1000));
neptuneGeometry.setFromPoints(neptuneArc.getPoints(1000));

const orbitsMaterial = new THREE.LineBasicMaterial({
    color: 0x555555,
    linewidth: 0.3
});

const mercuryLine = new THREE.Line(mercuryGeometry, orbitsMaterial);
const venusLine = new THREE.Line(venusGeometry, orbitsMaterial);
const earthLine = new THREE.Line(earthGeometry, orbitsMaterial);
const marsLine = new THREE.Line(marsGeometry, orbitsMaterial);
const jupiterLine = new THREE.Line(jupiterGeometry, orbitsMaterial);
const saturnLine = new THREE.Line(saturnGeometry, orbitsMaterial);
const uranusLine = new THREE.Line(uranusGeometry, orbitsMaterial);
const neptuneLine = new THREE.Line(neptuneGeometry, orbitsMaterial);

export default {
    scene,
    camera,
    renderer,
    light,
    ambientLight,
    controls,
    group,
    sunGroup,
    sunGroupParent,
    mercuryGroup,
    mercuryGroupParent,
    venusGroup,
    venusGroupParent,
    earthGroup,
    earthGroupParent,
    marsGroup,
    marsGroupParent,
    jupiterGroup,
    jupiterGroupParent,
    saturnGroup,
    saturnGroupParent,
    uranusGroup,
    uranusGroupParent,
    neptuneGroup,
    neptuneGroupParent,

    mercuryLine,
    venusLine,
    earthLine,
    marsLine,
    jupiterLine,
    saturnLine,
    uranusLine,
    neptuneLine,
}