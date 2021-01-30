<template>
  <div id="app">
    <svg-definitions />
    <div v-if="points !== null">
      <line-graph :chartData="points" :onSelect="onSelect" />
      <column-layout v-if="selected > 0">
        <pie-chart :chartData="points[selected]" />
        <Details
          :data="points[selected]"
          :previousData="selected > 1 ? points[selected - 1] : null"
        />
        <Tweets :data="points[selected].tweets" />
      </column-layout>
    </div>
  </div>
</template>

<script>
import fetchPoints from "./functions/fetchPoints";

import SvgDefinitions from "./components/SvgDefinitions.vue";
import LineGraph from "./components/LineGraph.vue";
import ColumnLayout from "./components/ColumnLayout.vue";
import PieChart from "./components/PieChart.vue";
import Details from "./components/Details.vue";
import Tweets from "./components/Tweets.vue";

export default {
  name: "App",
  components: {
    SvgDefinitions,
    LineGraph,
    ColumnLayout,
    PieChart,
    Details,
    Tweets,
  },
  data: () => ({
    points: null,
    selected: -1,
  }),
  methods: {
    onSelect(i) {
      this.selected = i;
    },
    async populateData() {
      this.points = await fetchPoints(new Date(), 15);
      this.selected = -1;
    },
  },
  mounted() {
    this.populateData();
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

a {
  color: inherit;
}
</style>
