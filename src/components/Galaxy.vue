<template>
  <div class="Galaxy" ref="Galaxy"></div>
</template>

<script>
import { loader3d } from "../assets/js/loader";
import global from "../assets/js/global";
export default {
  name: "Galaxy",
  props: {},
  data() {
    return {
      camera: null,
      renderer: null,
      light: null,
    };
  },
  mounted() {
    this.initMesh();
  },
  methods: {
    initMesh() {
      this.$refs.Galaxy.append(global.renderer.domElement);
      global.renderer.setSize(window.innerWidth, window.innerHeight);
      //灯光
      global.light.position.set(0, 0, 0);
      global.scene.add(global.light);
      global.scene.add(global.ambientLight);

      //相机
      global.camera.position.z = 12000;
      global.camera.position.x = 10000;
      global.camera.position.y = 2000;

      this.initGroup();
      this.loaderPlanet();
      this.animate();
    },
    animate() {
      requestAnimationFrame(this.animate);
      this.rotation();
      this.orbitalRevolution();
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
      global.marsGroupParent.add(global.marsGroup);
      global.jupiterGroupParent.add(global.jupiterGroup);
      global.saturnGroupParent.add(global.saturnGroup);
      global.uranusGroupParent.add(global.uranusGroup);
      global.neptuneGroupParent.add(global.neptuneGroup);
    },
    initOrbits(){
      global.mercuryLine.rotation.x += 1.57
      global.venusLine.rotation.x += 1.57
      global.earthLine.rotation.x += 1.57
      global.marsLine.rotation.x += 1.57
      global.jupiterLine.rotation.x += 1.57
      global.saturnLine.rotation.x += 1.57
      global.uranusLine.rotation.x += 1.57
      global.neptuneLine.rotation.x += 1.57

      global.scene.add(global.mercuryLine);
      global.scene.add(global.venusLine);
      global.scene.add(global.earthLine);
      global.scene.add(global.marsLine);
      global.scene.add(global.jupiterLine);
      global.scene.add(global.saturnLine);
      global.scene.add(global.uranusLine);
      global.scene.add(global.neptuneLine);
    },
    async loaderPlanet() {
      //太阳
      await loader3d("/glb/Sun.glb", (glb) => {
        console.log(glb);
        let sun = glb.scene;
        sun.scale.set(1.5, 1.5, 1.5);
        global.sunGroup.add(sun);
      });
      //水星
      await loader3d("/glb/Mercury.glb", (glb) => {
        let mercury = glb.scene;
        mercury.scale.set(0.035, 0.035, 0.035);
        // mercury.scale.set(0.0035, 0.0035, 0.0035);//等比例数据
        global.mercuryGroup.position.set(1000, 0, 0); 
        // global.mercuryGroup.position.set(4083.9, 0, 0);//等比例数据
        global.mercuryGroup.add(mercury);
      });
      //金星
      await loader3d("/glb/Venus.glb", (glb) => {
        let venus = glb.scene;
        venus.scale.set(0.09, 0.09, 0.09);
        // venus.scale.set(0.009, 0.009, 0.009);//等比例数据
        global.venusGroup.position.set(2000, 0, 0); 
        // global.venusGroup.position.set(7770.1, 0, 0);//等比例数据
        global.venusGroup.add(venus);
      });
      //地球
      await loader3d("/glb/Earth.glb", (glb) => {
        //天文单位/太阳直径=107.4712643678161
        let earth = glb.scene;
        earth.scale.set(0.09, 0.09, 0.09);
        // earth.scale.set(0.009, 0.009, 0.009);//等比例数据
        global.earthGroup.position.set(3000, 0, 0); 
        // global.earthGroup.position.set(10747.1, 0, 0);//等比例数据
        global.earthGroup.add(earth);
      });
      //火星
      await loader3d("/glb/Mars.glb", (glb) => {
        let mars = glb.scene;
        mars.scale.set(0.045, 0.045, 0.045);
        // mars.scale.set(0.0045, 0.0045, 0.0045);//等比例数据
        global.marsGroup.position.set(4000, 0, 0); 
        // global.marsGroup.position.set(16378.5, 0, 0);//等比例数据
        global.marsGroup.add(mars);
      });
      //木星
      await loader3d("/glb/Jupiter.glb", (glb) => {
        let jupiter = glb.scene;
        jupiter.scale.set(1, 1, 1);
        // jupiter.scale.set(0.1, 0.1, 0.1);//等比例数据
        global.jupiterGroup.position.set(5000, 0, 0); 
        // global.jupiterGroup.position.set(55932.7, 0, 0);//等比例数据
        global.jupiterGroup.add(jupiter);
      });
      //土星
      await loader3d("/glb/Saturn.glb", (glb) => {
        let saturn = glb.scene;
        saturn.scale.set(0.84, 0.84, 0.84);
        // saturn.scale.set(0.084, 0.084, 0.084);//等比例数据
        global.saturnGroup.position.set(6000, 0, 0); 
        // global.saturnGroup.position.set(102984, 0, 0);//等比例数据
        global.saturnGroup.add(saturn);
      });
      //天王星
      await loader3d("/glb/Uranus.glb", (glb) => {
        let uranus = glb.scene;
        uranus.scale.set(0.37, 0.37, 0.37);
        // uranus.scale.set(0.037, 0.037, 0.037);//等比例数据
        global.uranusGroup.position.set(7000, 0, 0); 
        // global.uranusGroup.position.set(206559.2, 0, 0);//等比例数据
        global.uranusGroup.add(uranus);
      });
      //海王星
      await loader3d("/glb/Neptune.glb", (glb) => {
        let neptune = glb.scene;
        neptune.scale.set(0.35, 0.35, 0.35);
        // neptune.scale.set(0.035, 0.035, 0.035);//等比例数据
        global.neptuneGroup.position.set(8000, 0, 0); 
        // global.neptuneGroup.position.set(3231605.3, 0, 0);//等比例数据
        global.neptuneGroup.add(neptune);
      });
      this.initOrbits();
    },
    rotation() {
      global.sunGroup.rotation.y += 0.0008;

      global.mercuryGroup.rotation.y += 0.00034;
      global.venusGroup.rotation.y += 0.000082;
      global.earthGroup.rotation.y += 0.02;
      global.marsGroup.rotation.y += 0.02;
      global.jupiterGroup.rotation.y += 0.048;
      global.saturnGroup.rotation.y += 0.046;
      global.uranusGroup.rotation.y += 0.028;
      global.neptuneGroup.rotation.y += 0.03;
    },
    orbitalRevolution() {
      global.mercuryGroupParent.rotation.y += 0.042;
      global.venusGroupParent.rotation.y += 0.015;
      global.earthGroupParent.rotation.y += 0.01;
      global.marsGroupParent.rotation.y += 0.0053;
      global.jupiterGroupParent.rotation.y += 0.000847;
      global.saturnGroupParent.rotation.y += 0.00034;
      global.uranusGroupParent.rotation.y += 0.00012;
      global.neptuneGroupParent.rotation.y += 0.000039;
    },
  },
};
</script>

<style scoped>
</style>
