<template>
  <div id="app">
    <LineGraph :chartData="points" />
  </div>
</template>

<script>
import LineGraph from "./components/lineGraph.vue";

export default {
  name: "App",
  components: {
    LineGraph,
  },
  data: () => ({
    points: [
      { time: 5, total: 11, negative: 5, positive: 4 },
      { time: 10, total: 10, negative: 4, positive: 3 },
      { time: 15, total: 20, negative: 7, positive: 7 },
      { time: 20, total: 15, negative: 10, positive: 4 },
      { time: 25, total: 19, negative: 11, positive: 4 },
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
