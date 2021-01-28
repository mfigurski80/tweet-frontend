<template>
  <div id="app">
    <LineGraph :chartData="points" :onSelect="onSelect" />
  </div>
</template>

<script>
import LineGraph from "./components/LineGraph.vue";

export default {
  name: "App",
  components: {
    LineGraph,
  },
  data: () => ({
    points: [
      { time: 5 * 3600, total: 11, negative: 6, positive: 4 },
      { time: 6 * 3600, total: 10, negative: 4, positive: 3 },
      { time: 7 * 3600, total: 20, negative: 6, positive: 7 },
      { time: 8 * 3600, total: 15, negative: 10, positive: 4 },
      { time: 9 * 3600, total: 19, negative: 7, positive: 5 },
      { time: 10 * 3600, total: 19, negative: 6, positive: 8 },
      { time: 11 * 3600, total: 19, negative: 9, positive: 8 },
      { time: 12 * 3600, total: 19, negative: 11, positive: 9 },
      { time: 13 * 3600, total: 19, negative: 10, positive: 7 },
      { time: 14 * 3600, total: 19, negative: 12, positive: 5 },
    ],
    selected: null,
  }),
  methods: {
    onSelect(d) {
      alert(`clicked point at ${d.time}`);
    },
  },
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
