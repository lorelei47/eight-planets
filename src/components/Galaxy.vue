<template>
  <div class="Galaxy" ref="Galaxy">
    <ul class="plant-btn">
      <li v-for="(item, index) in plantBtn" :key="index" :id="item.id" @click="PlantBtnEvent(item)"><span>{{item.text}}</span></li>
    </ul>
  </div>
</template>

<script>
import { loader3d } from "../assets/js/loader";
import global from "../assets/js/global";
export default {
  name: "Galaxy",
  props: {},
  data() {
    return {
      path: "http://lorelei47.cn-gd.ufileos.com/glb/", //正式环境
      // path: "glb/", //本地环境
      sunScale: null,
      mercuryScale: null,
      venusScale: null,
      earthScale: null,
      marsScale: null,
      jupiterScale: null,
      saturnScale: null,
      uranusScale: null,
      neptuneScale: null,

      worldTarget: null,
      plantBtn: [
        { id: "sun", text: "太阳" , group: global.sunGroupParent, target: global.sunGroup, distance: null},
        { id: "mercury", text: "水星" , group: global.mercuryGroupParent, target: global.mercuryGroup, distance: global.mercuryDistance-300},
        { id: "venus", text: "金星" , group: global.venusGroupParent, target: global.venusGroup, distance: global.venusDistance-500},
        { id: "earth", text: "地球" , group: global.earthGroupParent, target: global.earthGroup, distance: global.earthDistance-500},
        { id: "moon", text: "月球" , group: global.earthGroup, target: global.moonGroup, distance: 700},
        { id: "mars", text: "火星" , group: global.marsGroupParent, target: global.marsGroup, distance: global.marsDistance-300},
        { id: "jupiter", text: "木星" , group: global.jupiterGroupParent, target: global.jupiterGroup, distance: global.jupiterDistance-2000},
        { id: "saturn", text: "土星" , group: global.saturnGroupParent, target: global.saturnGroup, distance: global.saturnDistance-2000},
        { id: "uranus", text: "天王星" , group: global.uranusGroupParent, target: global.uranusGroup, distance: global.uranusDistance-1000},
        { id: "neptune", text: "海王星" , group: global.neptuneGroupParent, target: global.neptuneGroup, distance: global.neptuneDistance-1000},
      ],
    };
  },
  mounted() {
    this.initMesh();
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
      this.loaderPlanet();

    },
    animate() {
      requestAnimationFrame(this.animate);
      this.rotation();
      this.orbitalRevolution();
      this.updateGui();
      this.updateCameraTarget();
      global.stats.update();
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
    async loaderPlanet() {
      //太阳
      await loader3d(this.path + "Sun.glb", (glb) => {
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
        let sunFolder = global.gui.addFolder("Sun");
        sunFolder.add(this.sunScale, "size", 4, 5, 0.01);
        global.sunGroup.add(sun);
      });
      //水星
      await loader3d(this.path + "Mercury.glb", (glb) => {
        let mercury = glb.scene;
        mercury.name = "mercury";
        // mercury.scale.set(0.0035, 0.0035, 0.0035);//等比例数据
        global.mercuryGroup.position.set(global.mercuryDistance, 0, 0);
        // global.mercuryGroup.position.set(4083.9, 0, 0);//等比例数据
        this.mercuryScale = new (function () {
          this.size = 0.035;
        })();
        mercury.scale.set(
          this.mercuryScale.size,
          this.mercuryScale.size,
          this.mercuryScale.size
        );
        let mercuryFolder = global.gui.addFolder("Mercury");
        mercuryFolder.add(this.mercuryScale, "size", 0.035, 0.35, 0.01);
        global.mercuryGroup.add(mercury);
      });
      //金星
      await loader3d(this.path + "Venus.glb", (glb) => {
        let venus = glb.scene;
        venus.name = "venus";
        // venus.scale.set(0.009, 0.009, 0.009);//等比例数据
        global.venusGroup.position.set(global.venusDistance, 0, 0);
        // global.venusGroup.position.set(7770.1, 0, 0);//等比例数据
        this.venusScale = new (function () {
          this.size = 0.09;
        })();
        venus.scale.set(
          this.venusScale.size,
          this.venusScale.size,
          this.venusScale.size
        );
        let venusFolder = global.gui.addFolder("Venus");
        venusFolder.add(this.venusScale, "size", 0.09, 0.9, 0.01);
        global.venusGroup.add(venus);
      });
      //地球
      await loader3d(this.path + "Earth.glb", (glb) => {
        //天文单位/太阳直径=107.4712643678161
        let earth = glb.scene;
        earth.name = "earth";
        // earth.scale.set(0.009, 0.009, 0.009);//等比例数据
        global.earthGroup.position.set(global.earthDistance, 0, 0);
        // global.earthGroup.position.set(10747.1, 0, 0);//等比例数据
        this.earthScale = new (function () {
          this.size = 0.09;
        })();
        earth.scale.set(
          this.earthScale.size,
          this.earthScale.size,
          this.earthScale.size
        );
        let earthFolder = global.gui.addFolder("Earth");
        earthFolder.add(this.earthScale, "size", 0.09, 0.9, 0.01);
        global.earthGroup.add(earth);
        global.earthGroup.rotation.x += 0.2;
      });
      //月球
      await loader3d(this.path + "Moon.glb", (glb) => {
        //天文单位/太阳直径=107.4712643678161
        let moon = glb.scene;
        moon.name = "moon";
        global.moonGroup.position.set(1000, 0, 0);
        moon.scale.set(
          this.earthScale.size /2,
          this.earthScale.size /2,
          this.earthScale.size /2
        );
        global.moonGroup.add(moon);
      });
      //火星
      await loader3d(this.path + "Mars.glb", (glb) => {
        let mars = glb.scene;
        mars.name = "mars";
        // mars.scale.set(0.0045, 0.0045, 0.0045);//等比例数据
        global.marsGroup.position.set(global.marsDistance, 0, 0);
        // global.marsGroup.position.set(16378.5, 0, 0);//等比例数据
        this.marsScale = new (function () {
          this.size = 0.045;
        })();
        mars.scale.set(
          this.marsScale.size,
          this.marsScale.size,
          this.marsScale.size
        );
        let marsFolder = global.gui.addFolder("Mars");
        marsFolder.add(this.marsScale, "size", 0.045, 0.45, 0.01);
        global.marsGroup.add(mars);
        global.marsGroup.rotation.x += 0.24;
      });
      //木星
      await loader3d(this.path + "Jupiter.glb", (glb) => {
        let jupiter = glb.scene;
        jupiter.name = "jupiter";
        // jupiter.scale.set(0.1, 0.1, 0.1);//等比例数据
        global.jupiterGroup.position.set(global.jupiterDistance, 0, 0);
        // global.jupiterGroup.position.set(55932.7, 0, 0);//等比例数据
        this.jupiterScale = new (function () {
          this.size = 1;
        })();
        jupiter.scale.set(
          this.jupiterScale.size,
          this.jupiterScale.size,
          this.jupiterScale.size
        );
        let jupiterFolder = global.gui.addFolder("Jupiter");
        jupiterFolder.add(this.jupiterScale, "size", 0.5, 1.5, 0.01);
        global.jupiterGroup.add(jupiter);
        global.jupiterGroup.rotation.x += 0.03;
      });
      //土星
      await loader3d(this.path + "Saturn.glb", (glb) => {
        let saturn = glb.scene;
        saturn.name = "saturn";
        // saturn.scale.set(0.084, 0.084, 0.084);//等比例数据
        global.saturnGroup.position.set(global.saturnDistance, 0, 0);
        // global.saturnGroup.position.set(102984, 0, 0);//等比例数据
        this.saturnScale = new (function () {
          this.size = 0.84;
        })();
        saturn.scale.set(
          this.saturnScale.size,
          this.saturnScale.size,
          this.saturnScale.size
        );
        let saturnFolder = global.gui.addFolder("Saturn");
        saturnFolder.add(this.saturnScale, "size", 0.5, 1.4, 0.01);
        global.saturnGroup.add(saturn);
        global.saturnGroup.rotation.x += 0.24;
      });
      //天王星
      await loader3d(this.path + "Uranus.glb", (glb) => {
        let uranus = glb.scene;
        uranus.name = "uranus";
        // uranus.scale.set(0.037, 0.037, 0.037);//等比例数据
        global.uranusGroup.position.set(global.uranusDistance, 0, 0);
        // global.uranusGroup.position.set(206559.2, 0, 0);//等比例数据
        this.uranusScale = new (function () {
          this.size = 0.37;
        })();
        uranus.scale.set(
          this.uranusScale.size,
          this.uranusScale.size,
          this.uranusScale.size
        );
        let uranusFolder = global.gui.addFolder("Uranus");
        uranusFolder.add(this.uranusScale, "size", 0.37, 1.2, 0.01);
        global.uranusGroup.add(uranus);
        global.uranusGroup.rotation.x += Math.PI/2 - 0.06;
      });
      //海王星
      await loader3d(this.path + "Neptune.glb", (glb) => {
        let neptune = glb.scene;
        neptune.name = "neptune";
        // neptune.scale.set(0.035, 0.035, 0.035);//等比例数据
        global.neptuneGroup.position.set(global.neptuneDistance, 0, 0);
        // global.neptuneGroup.position.set(3231605.3, 0, 0);//等比例数据
        this.neptuneScale = new (function () {
          this.size = 0.35;
        })();
        neptune.scale.set(
          this.neptuneScale.size,
          this.neptuneScale.size,
          this.neptuneScale.size
        );
        let neptuneFolder = global.gui.addFolder("Neptune");
        neptuneFolder.add(this.neptuneScale, "size", 0.35, 1.2, 0.01);
        global.neptuneGroup.add(neptune);
        global.neptuneGroup.rotation.x += 0.25;
      });
      this.initOrbits();
      this.animate();
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
      if(item.id === 'sun'){
        item.group.add(global.camera);
        global.camera.position.set(40000,20000,50000);
        this.worldTarget = global.sunGroup;
        return;
      }
      item.group.add(global.camera);
      global.camera.position.set(item.distance, 100, 0);
      global.camera.rotation.y = Math.PI/2;
      this.worldTarget = item.target;
    },
    updateCameraTarget(){
      if(!this.worldTarget){
        return;
      }
      this.worldTarget.getWorldPosition(global.cameraTarget);
    }
  },
};
</script>

<style lang="scss" scoped>
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
