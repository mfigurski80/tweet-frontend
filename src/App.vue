<template>
  <div id="app">
    <Graph :dataPoints="points" />
  </div>
</template>

<script>
import Graph from "./components/Graph.vue";

export default {
  name: "App",
  components: {
    Graph,
  },
  data: () => ({
    points: [
      { total: 10000 },
      { total: 9000 },
      { total: 9500 },
      { total: 11000 },
    ],
  }),
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: Montserrat, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
