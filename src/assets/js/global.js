import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min";

const stats = new Stats();
const gui = new GUI();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    30,
    window.innerWidth / window.innerHeight,
    0.1,
    10000000
);
const camera1 = new THREE.PerspectiveCamera(
    30,
    window.innerWidth / window.innerHeight,
    0.1,
    10000000
);
const renderer = new THREE.WebGLRenderer({ antialias: true });
const light = new THREE.PointLight(0xffffff, 3);
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2); // 环境光

const controls = new OrbitControls(camera, renderer.domElement);
const cameraTarget = new THREE.Vector3(0, 0, 0);
const group = new THREE.Group(); //太阳系组
const sunGroup = new THREE.Group(); //太阳组
const sunGroupParent = new THREE.Group();
const mercuryGroup = new THREE.Group(); //水星组
const mercuryGroupParent = new THREE.Group();
const venusGroup = new THREE.Group(); //金星组
const venusGroupParent = new THREE.Group();
const earthGroup = new THREE.Group(); //地球组
const earthGroupParent = new THREE.Group();
const moonGroup = new THREE.Group(); //月球组
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

var mercuryDistance = 4000;
var venusDistance = 10000;
var earthDistance = 18000;
var marsDistance = 28000;
var jupiterDistance = 40000;
var saturnDistance = 54000;
var uranusDistance = 70000;
var neptuneDistance = 88000;

//轨道
const mercuryArc = new THREE.ArcCurve(0, 0, mercuryDistance, 0, 2 * Math.PI);
const venusArc = new THREE.ArcCurve(0, 0, venusDistance, 0, 2 * Math.PI);
const earthArc = new THREE.ArcCurve(0, 0, earthDistance, 0, 2 * Math.PI);
const marsArc = new THREE.ArcCurve(0, 0, marsDistance, 0, 2 * Math.PI);
const jupiterArc = new THREE.ArcCurve(0, 0, jupiterDistance, 0, 2 * Math.PI);
const saturnArc = new THREE.ArcCurve(0, 0, saturnDistance, 0, 2 * Math.PI);
const uranusArc = new THREE.ArcCurve(0, 0, uranusDistance, 0, 2 * Math.PI);
const neptuneArc = new THREE.ArcCurve(0, 0, neptuneDistance, 0, 2 * Math.PI);

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
    color: 0x222222,
    linewidth: 0.1,
});

const mercuryLine = new THREE.Line(mercuryGeometry, orbitsMaterial);
const venusLine = new THREE.Line(venusGeometry, orbitsMaterial);
const earthLine = new THREE.Line(earthGeometry, orbitsMaterial);
const marsLine = new THREE.Line(marsGeometry, orbitsMaterial);
const jupiterLine = new THREE.Line(jupiterGeometry, orbitsMaterial);
const saturnLine = new THREE.Line(saturnGeometry, orbitsMaterial);
const uranusLine = new THREE.Line(uranusGeometry, orbitsMaterial);
const neptuneLine = new THREE.Line(neptuneGeometry, orbitsMaterial);

//helper
const cameraHelper = new THREE.CameraHelper(camera1);

export default {
    stats,
    gui,
    scene,
    camera,
    camera1,
    renderer,
    light,
    ambientLight,
    controls,
    cameraTarget,
    group,
    sunGroup,
    sunGroupParent,
    mercuryGroup,
    mercuryGroupParent,
    venusGroup,
    venusGroupParent,
    earthGroup,
    earthGroupParent,
    moonGroup,
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

    mercuryDistance,
    venusDistance,
    earthDistance,
    marsDistance,
    jupiterDistance,
    saturnDistance,
    uranusDistance,
    neptuneDistance,

    cameraHelper,
};