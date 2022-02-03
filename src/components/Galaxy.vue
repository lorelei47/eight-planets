<template>
  <div class="Galaxy" ref="Galaxy">
    <div class="cover" v-if="!resource_loaded">
      <svg class="percent" width="100" hight="100" viewBox="0 0 100 100">
        <circle cx="50" cy="50" :r="percen_r" fill="none" stroke="#f7f7f7" stroke-width="2" /> 
        <circle cx="50" cy="50" :r="percen_r" fill="none" stroke="#00A6B2" stroke-width="5" :stroke-dasharray="percen_c" :stroke-dashoffset="dashOffsetCircle" stroke-linecap="round" />
        <text x="50" y="-50" font-size="12px" fill="white" class="percent_rate" text-anchor="middle" dominant-baseline="middle">{{percent_rate}}</text>
      </svg>
    </div>
    <ul class="plant-btn">
      <li v-for="(item, index) in plantBtn" :key="index" :id="item.id" @click="PlantBtnEvent(item)"><span>{{item.text}}</span></li>
    </ul>
  </div>
</template>

<script>
import global from "../assets/js/global";
import { loader3d } from "../assets/js/loader";
//天文单位/太阳直径=107.4712643678161
export default {
  name: "Galaxy",
  props: {},
  data() {
    return {
      path: "http://lorelei47.cn-gd.ufileos.com/glb/", //正式环境
      // path: "glb/", //本地环境
      percen_r: 30,
      percentage: 0,
      resource_loaded: false,
      sunScale: 0,
      mercuryScale: 0,
      venusScale: 0,
      earthScale: 0,
      moonScale: 0,
      marsScale: 0,
      jupiterScale: 0,
      saturnScale: 0,
      uranusScale: 0,
      neptuneScale: 0,

      worldTarget: global.sunGroup,
      plantBtn: [
        { id: "sun", text: "太阳" , group: global.sunGroupParent, target: global.sunGroup, distance: new global.THREE.Vector3(40000,20000,50000)},
        { id: "mercury", text: "水星" , group: global.mercuryGroupParent, target: global.mercuryGroup, distance: new global.THREE.Vector3(global.mercuryDistance-300, 100, 0)},
        { id: "venus", text: "金星" , group: global.venusGroupParent, target: global.venusGroup, distance: new global.THREE.Vector3(global.venusDistance-500, 100, 0)},
        { id: "earth", text: "地球" , group: global.earthGroupParent, target: global.earthGroup, distance: new global.THREE.Vector3(global.earthDistance-500, 100, 0)},
        { id: "moon", text: "月球" , group: global.earthGroup, target: global.moonGroup, distance: new global.THREE.Vector3(700, 100, 0)},
        { id: "mars", text: "火星" , group: global.marsGroupParent, target: global.marsGroup, distance: new global.THREE.Vector3(global.marsDistance-300, 100, 0)},
        { id: "jupiter", text: "木星" , group: global.jupiterGroupParent, target: global.jupiterGroup, distance: new global.THREE.Vector3(global.jupiterDistance-2000, 100, 0)},
        { id: "saturn", text: "土星" , group: global.saturnGroupParent, target: global.saturnGroup, distance: new global.THREE.Vector3(global.saturnDistance-2000, 100, 0)},
        { id: "uranus", text: "天王星" , group: global.uranusGroupParent, target: global.uranusGroup, distance: new global.THREE.Vector3(global.uranusDistance-1000, 100, 0)},
        { id: "neptune", text: "海王星" , group: global.neptuneGroupParent, target: global.neptuneGroup, distance: new global.THREE.Vector3(global.neptuneDistance-1000, 100, 0)},
      ],
    };
  },
  computed:{
    percen_c(){
      return this.percen_r * 2 * Math.PI;
    },
    dashOffsetCircle(){
      return this.percen_c - this.percentage * this.percen_c / 100;
    },
    percent_rate(){
      return Math.round( this.percentage, 2 )+"%";
    }
  },
  mounted() {
    this.initLoaderManager()
  },
  methods: {
    PlantBtnEvent(item){
      if(typeof item != 'object') return;
        this.viewCamera(item)
    },
    initStats() {
      global.stats.domElement.style.position = "absolute";
      global.stats.domElement.style.top = "0px";
      this.$refs.Galaxy.appendChild(global.stats.domElement);
    },
    initLoaderManager(){
      global.manager.onStart = (url) => {
          console.log('Started loading file: ' + url + '.');
      };
      global.manager.onLoad = () => {
          console.log('Loading complete!');
          this.resource_loaded = true;
          this.initMesh();
      };
      global.manager.onProgress = (url, itemsLoaded, itemsTotal) => {
          this.percentage = itemsLoaded / itemsTotal * 100;
					console.log( 'model ' + Math.round( this.percentage, 2 ) + '% downloaded' );
      };
      global.manager.onError = (url) => {
          console.log('There was an error loading ' + url);
      };
      this.loaderPlanetAsyn();
    },
    initMesh() {
      this.$refs.Galaxy.append(global.renderer.domElement);
      global.renderer.setSize(window.innerWidth, window.innerHeight);
      //灯光
      global.light.position.set(0, 0, 0);
      global.scene.add(global.light);
      global.scene.add(global.ambientLight);

      //相机
      global.camera.position.set(40000,20000,50000);
      global.controls.target = global.cameraTarget;

      this.initStats();
      this.initGroup();
      this.initOrbits();
      this.animate();
    },
    animate() {
      if(!this.resource_loaded){
        return;
      }
      requestAnimationFrame(this.animate);
      this.rotation();
      this.orbitalRevolution();
      // this.updateGui();
      this.updateCameraTarget();
      global.stats.update();
      global.TWEEN.update();
      global.controls.update();
      global.renderer.render(global.scene, global.camera);
    },
    initGroup() {
      //组
      global.scene.add(global.group);
      global.group.add(global.sunGroup);

      global.scene.add(global.mercuryGroupParent);
      global.scene.add(global.venusGroupParent);
      global.scene.add(global.earthGroupParent);
      global.scene.add(global.marsGroupParent);
      global.scene.add(global.jupiterGroupParent);
      global.scene.add(global.saturnGroupParent);
      global.scene.add(global.uranusGroupParent);
      global.scene.add(global.neptuneGroupParent);

      global.mercuryGroupParent.add(global.mercuryGroup);
      global.venusGroupParent.add(global.venusGroup);
      global.earthGroupParent.add(global.earthGroup);
      global.earthGroup.add(global.moonGroup);
      global.marsGroupParent.add(global.marsGroup);
      global.jupiterGroupParent.add(global.jupiterGroup);
      global.saturnGroupParent.add(global.saturnGroup);
      global.uranusGroupParent.add(global.uranusGroup);
      global.neptuneGroupParent.add(global.neptuneGroup);
    },
    initOrbits() {
      global.mercuryLine.rotation.x += 1.57;
      global.venusLine.rotation.x += 1.57;
      global.earthLine.rotation.x += 1.57;
      global.marsLine.rotation.x += 1.57;
      global.jupiterLine.rotation.x += 1.57;
      global.saturnLine.rotation.x += 1.57;
      global.uranusLine.rotation.x += 1.57;
      global.neptuneLine.rotation.x += 1.57;

      global.scene.add(global.mercuryLine);
      global.scene.add(global.venusLine);
      global.scene.add(global.earthLine);
      global.scene.add(global.marsLine);
      global.scene.add(global.jupiterLine);
      global.scene.add(global.saturnLine);
      global.scene.add(global.uranusLine);
      global.scene.add(global.neptuneLine);
    },
    updateGui() {
      global.sunGroup
        .getObjectByName("sun")
        .scale.set(this.sunScale.size, this.sunScale.size, this.sunScale.size);
      global.mercuryGroup
        .getObjectByName("mercury")
        .scale.set(
          this.mercuryScale.size,
          this.mercuryScale.size,
          this.mercuryScale.size
        );
      global.venusGroup
        .getObjectByName("venus")
        .scale.set(
          this.venusScale.size,
          this.venusScale.size,
          this.venusScale.size
        );
      global.earthGroup
        .getObjectByName("earth")
        .scale.set(
          this.earthScale.size,
          this.earthScale.size,
          this.earthScale.size
        );
        global.moonGroup
        .getObjectByName("moon")
        .scale.set(
          this.earthScale.size/2,
          this.earthScale.size/2,
          this.earthScale.size/2
        );
      global.marsGroup
        .getObjectByName("mars")
        .scale.set(
          this.marsScale.size,
          this.marsScale.size,
          this.marsScale.size
        );
      global.jupiterGroup
        .getObjectByName("jupiter")
        .scale.set(
          this.jupiterScale.size,
          this.jupiterScale.size,
          this.jupiterScale.size
        );
      global.saturnGroup
        .getObjectByName("saturn")
        .scale.set(
          this.saturnScale.size,
          this.saturnScale.size,
          this.saturnScale.size
        );
      global.uranusGroup
        .getObjectByName("uranus")
        .scale.set(
          this.uranusScale.size,
          this.uranusScale.size,
          this.uranusScale.size
        );
      global.neptuneGroup
        .getObjectByName("neptune")
        .scale.set(
          this.neptuneScale.size,
          this.neptuneScale.size,
          this.neptuneScale.size
        );
    },
    loaderPlanetAsyn() {
      //太阳
      loader3d(this.path + "Sun.glb", (glb) => {
        let sun = glb.scene;
        sun.name = "sun";
        this.sunScale = new (function () {
          this.size = 4;
        })();
        sun.scale.set(
          this.sunScale.size,
          this.sunScale.size,
          this.sunScale.size
        );
        global.sunGroup.add(sun);
      });
      //水星
      loader3d(this.path + "Mercury.glb", (glb) => {
        let mercury = glb.scene;
        mercury.name = "mercury";
        global.mercuryGroup.position.set(global.mercuryDistance, 0, 0);
        this.mercuryScale = new (function () {
          this.size = 0.035;
        })();
        mercury.scale.set(
          this.mercuryScale.size,
          this.mercuryScale.size,
          this.mercuryScale.size
        );
        global.mercuryGroup.add(mercury);
      });
      //金星
      loader3d(this.path + "Venus.glb", (glb) => {
        let venus = glb.scene;
        venus.name = "venus";
        global.venusGroup.position.set(global.venusDistance, 0, 0);
        this.venusScale = new (function () {
          this.size = 0.09;
        })();
        venus.scale.set(
          this.venusScale.size,
          this.venusScale.size,
          this.venusScale.size
        );
        global.venusGroup.add(venus);
      });
      //地球
      loader3d(this.path + "Earth.glb", (glb) => {
        let earth = glb.scene;
        earth.name = "earth";
        global.earthGroup.position.set(global.earthDistance, 0, 0);
        this.earthScale = new (function () {
          this.size = 0.09;
        })();
        earth.scale.set(
          this.earthScale.size,
          this.earthScale.size,
          this.earthScale.size
        );
        global.earthGroup.add(earth);
        global.earthGroup.rotation.x += 0.2;
      });
      //月球
      loader3d(this.path + "Moon.glb", (glb) => {
        let moon = glb.scene;
        moon.name = "moon";
        global.moonGroup.position.set(1000, 0, 0);
        this.moonScale = new (function () {
          this.size = 0.045;
        })();
        moon.scale.set(
          this.moonScale.size,
          this.moonScale.size,
          this.moonScale.size
        );
        global.moonGroup.add(moon);
      });
      //火星
      loader3d(this.path + "Mars.glb", (glb) => {
        let mars = glb.scene;
        mars.name = "mars";
        global.marsGroup.position.set(global.marsDistance, 0, 0);
        this.marsScale = new (function () {
          this.size = 0.045;
        })();
        mars.scale.set(
          this.marsScale.size,
          this.marsScale.size,
          this.marsScale.size
        );
        global.marsGroup.add(mars);
        global.marsGroup.rotation.x += 0.24;
      });
      //木星
      loader3d(this.path + "Jupiter.glb", (glb) => {
        let jupiter = glb.scene;
        jupiter.name = "jupiter";
        global.jupiterGroup.position.set(global.jupiterDistance, 0, 0);
        this.jupiterScale = new (function () {
          this.size = 1;
        })();
        jupiter.scale.set(
          this.jupiterScale.size,
          this.jupiterScale.size,
          this.jupiterScale.size
        );
        global.jupiterGroup.add(jupiter);
        global.jupiterGroup.rotation.x += 0.03;
      });
      //土星
      loader3d(this.path + "Saturn.glb", (glb) => {
        let saturn = glb.scene;
        saturn.name = "saturn";
        global.saturnGroup.position.set(global.saturnDistance, 0, 0);
        this.saturnScale = new (function () {
          this.size = 0.84;
        })();
        saturn.scale.set(
          this.saturnScale.size,
          this.saturnScale.size,
          this.saturnScale.size
        );
        global.saturnGroup.add(saturn);
        global.saturnGroup.rotation.x += 0.24;
      });
      //天王星
      loader3d(this.path + "Uranus.glb", (glb) => {
        let uranus = glb.scene;
        uranus.name = "uranus";
        global.uranusGroup.position.set(global.uranusDistance, 0, 0);
        this.uranusScale = new (function () {
          this.size = 0.37;
        })();
        uranus.scale.set(
          this.uranusScale.size,
          this.uranusScale.size,
          this.uranusScale.size
        );
        global.uranusGroup.add(uranus);
        global.uranusGroup.rotation.x += Math.PI/2 - 0.06;
      });
      //海王星
      loader3d(this.path + "Neptune.glb", (glb) => {
        let neptune = glb.scene;
        neptune.name = "neptune";
        global.neptuneGroup.position.set(global.neptuneDistance, 0, 0);
        this.neptuneScale = new (function () {
          this.size = 0.35;
        })();
        neptune.scale.set(
          this.neptuneScale.size,
          this.neptuneScale.size,
          this.neptuneScale.size
        );
        global.neptuneGroup.add(neptune);
        global.neptuneGroup.rotation.x += 0.25;
      });
    },
    rotation() {
      global.sunGroup.rotation.y += 0.0008;
      // global.moonGroup.rotation.y += 0.00074;

      global.mercuryGroup.rotation.y += 0.0034;
      global.venusGroup.rotation.y += 0.0082;
      global.earthGroup.rotation.y += 0.02;
      global.marsGroup.rotation.y += 0.02;
      global.jupiterGroup.rotation.y += 0.048;
      global.saturnGroup.rotation.y += 0.046;
      global.uranusGroup.rotation.y += 0.028;
      global.neptuneGroup.rotation.y += 0.03;
    },
    orbitalRevolution() {
      global.mercuryGroupParent.rotation.y += 0.0042;
      global.venusGroupParent.rotation.y -= 0.0015;
      global.earthGroupParent.rotation.y += 0.001;
      global.marsGroupParent.rotation.y += 0.00053;
      global.jupiterGroupParent.rotation.y += 0.0000847;
      global.saturnGroupParent.rotation.y += 0.000034;
      global.uranusGroupParent.rotation.y += 0.000012;
      global.neptuneGroupParent.rotation.y += 0.0000039;
    },
    viewCamera(item){
      const tween1 = this.tweenAnimate(global.camera.position, new global.THREE.Vector3(40000,20000,50000),1500);
      const tween2 = this.tweenAnimate(global.camera.position, item.distance,1500);
      tween1.chain(tween2);
      tween1.onComplete(()=>{
        //相机目标绑定了Object3D对象，切换目标时暂时没法做过渡
        item.group.add(global.camera);
        this.worldTarget = item.target;
      });
      tween1.start();
      global.controls.enablePan = (item.id === 'sun') ?  true : false;
      global.controls.enableZoom = (item.id === 'sun') ?  true : false;
      global.camera.rotation.y = Math.PI/2;
    },
    updateCameraTarget(){
      if(!this.worldTarget){
        return;
      }
      this.worldTarget.getWorldPosition(global.cameraTarget);
    },
    tweenAnimate(object, newPosition, time){
      return new global.TWEEN.Tween(object).to({
            x: newPosition.x,
            y: newPosition.y,
            z: newPosition.z
        }, time).easing(global.TWEEN.Easing.Exponential.InOut);
    }
  },
};
</script>

<style lang="scss" scoped>
.cover {
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  background-color: #404040;
  .percent{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-90deg);
    .percent_rate{
      user-select: none;
      transform: rotateZ(90deg);
    }
  }
}
.plant-btn {
  position: absolute;
  top: 40px;
  li {
    width: 80px;
    margin-left: -30px;
    padding: 2px;
    cursor: pointer;
    list-style-type: none;
    text-align: left;
    span {
      border-radius: 3px;
      padding: 3px 5px;
      transition: margin-left 0.2s ease-in-out;
    }
    &:hover {
      color: #62adf3;
      span {
        margin-left: 20px;
        transition: margin-left 0.2s ease-in-out;
        background-color: #283544;
      }
    }
  }
}
</style>
