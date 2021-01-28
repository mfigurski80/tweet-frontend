<template>
  <div id="app">
    <svg-definitions />
    <line-graph :chartData="points" :onSelect="onSelect" />
    <column-layout v-if="details !== null">
      <pie-chart :chartData="details" />
      <h2>Hello world and welcome back</h2>
    </column-layout>
  </div>
</template>

<script>
import SvgDefinitions from "./components/SvgDefinitions.vue";
import LineGraph from "./components/LineGraph.vue";
import ColumnLayout from "./components/ColumnLayout.vue";
import PieChart from "./components/PieChart.vue";

export default {
  name: "App",
  components: {
    SvgDefinitions,
    LineGraph,
    ColumnLayout,
    PieChart,
  },
  data: () => ({
    points: [
      { time: 5 * 3600, total: 50000, negative: 6420, positive: 4423 },
      { time: 6 * 3600, total: 10000, negative: 4320, positive: 3243 },
      { time: 7 * 3600, total: 40000, negative: 6892, positive: 7523 },
      { time: 8 * 3600, total: 50000, negative: 10098, positive: 4523 },
      { time: 9 * 3600, total: 40000, negative: 7000, positive: 5552 },
      { time: 10 * 3600, total: 40000, negative: 6787, positive: 8960 },
      { time: 11 * 3600, total: 50000, negative: 9298, positive: 8142 },
      { time: 12 * 3600, total: 40000, negative: 11982, positive: 9182 },
      { time: 13 * 3600, total: 40000, negative: 10492, positive: 7523 },
      { time: 14 * 3600, total: 40000, negative: 12839, positive: 5153 },
    ],
    details: { time: 5 * 3600, total: 50000, negative: 6420, positive: 4423 },
  }),
  methods: {
    onSelect(i) {
      console.log(`clicked point at ${i}`);
      this.details = this.points[i];
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;900&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  overflow-x: hidden;
}

#app {
  font-family: Montserrat, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
