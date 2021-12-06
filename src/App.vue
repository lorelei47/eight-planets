<template>
  <Galaxy />
</template>

<script>
// import { scene, camera, renderer } from "./assets/js/global";
import Galaxy from "./components/Galaxy.vue";

export default {
  name: "App",
  components: {
    Galaxy,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100vw;
  height: 100vh;
  /* margin-top: 60px; */
}
</style>
