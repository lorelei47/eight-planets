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
      path: 'http://lorelei47.cn-gd.ufileos.com/glb/', //正式环境
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
    };
  },
  mounted() {
    this.initMesh();
  },
  methods: {
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
      global.camera.position.z = 50000;
      global.camera.position.x = 40000;
      global.camera.position.y = 20000;
      let cameraFolder = global.gui.addFolder("Camera");
        cameraFolder.add(global.camera.position, "x", 0, 40000, 1);
        cameraFolder.add(global.camera.position, "y", 0, 20000, 1);
        cameraFolder.add(global.camera.position, "z", 0, 50000, 1);

      this.initStats();
      this.initGroup();
      this.loaderPlanet();
    },
    animate() {
      requestAnimationFrame(this.animate);
      this.rotation();
      this.orbitalRevolution();
      this.updateGui();
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
        .scale.set(this.mercuryScale.size, this.mercuryScale.size, this.mercuryScale.size);
      global.venusGroup
        .getObjectByName("venus")
        .scale.set(this.venusScale.size, this.venusScale.size, this.venusScale.size);
      global.earthGroup
        .getObjectByName("earth")
        .scale.set(this.earthScale.size, this.earthScale.size, this.earthScale.size);
      global.marsGroup
        .getObjectByName("mars")
        .scale.set(this.marsScale.size, this.marsScale.size, this.marsScale.size);
      global.jupiterGroup
        .getObjectByName("jupiter")
        .scale.set(this.jupiterScale.size, this.jupiterScale.size, this.jupiterScale.size);
      global.saturnGroup
        .getObjectByName("saturn")
        .scale.set(this.saturnScale.size, this.saturnScale.size, this.saturnScale.size);
      global.uranusGroup
        .getObjectByName("uranus")
        .scale.set(this.uranusScale.size, this.uranusScale.size, this.uranusScale.size);
      global.neptuneGroup
        .getObjectByName("neptune")
        .scale.set(this.neptuneScale.size, this.neptuneScale.size, this.neptuneScale.size);
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
        mercury.scale.set(0.035, 0.035, 0.035);
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
        venus.scale.set(0.09, 0.09, 0.09);
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
        earth.scale.set(0.09, 0.09, 0.09);
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
      });
      //火星
      await loader3d(this.path + "Mars.glb", (glb) => {
        let mars = glb.scene;
        mars.name = "mars";
        mars.scale.set(0.045, 0.045, 0.045);
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
      });
      //木星
      await loader3d(this.path + "Jupiter.glb", (glb) => {
        let jupiter = glb.scene;
        jupiter.name = "jupiter";
        jupiter.scale.set(1, 1, 1);
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
      });
      //土星
      await loader3d(this.path + "Saturn.glb", (glb) => {
        let saturn = glb.scene;
        saturn.name = "saturn";
        saturn.scale.set(0.84, 0.84, 0.84);
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
      });
      //天王星
      await loader3d(this.path + "Uranus.glb", (glb) => {
        let uranus = glb.scene;
        uranus.name = "uranus";
        uranus.scale.set(0.37, 0.37, 0.37);
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
      });
      //海王星
      await loader3d(this.path + "Neptune.glb", (glb) => {
        let neptune = glb.scene;
        neptune.name = "neptune";
        neptune.scale.set(0.35, 0.35, 0.35);
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
      });
      this.initOrbits();
      this.animate();
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
    initPointerLockControls() {
      global.scene.add(global.plControls.getObject());
    },
    onKeyUp(event) {
      switch (event.code) {
        case "ArrowUp":
        case "KeyW":
          this.moveForward = false;
          break;
        case "ArrowLeft":
        case "KeyA":
          this.moveLeft = false;
          break;
        case "ArrowDown":
        case "KeyS":
          this.moveBackward = false;
          break;
        case "ArrowRight":
        case "KeyD":
          this.moveRight = false;
          break;
      }
    },
  },
};
</script>

<style scoped>
</style>
