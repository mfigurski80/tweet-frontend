<template>
  <div id="app">
    <nav-section />
    <section id="charts">
      <svg-definitions />
      <line-graph :chartData="points" :onSelect="onSelect" />
      <data-controller
        :onLeft="onMoveLeft"
        :onRight="onMoveRight"
        :rightDisabled="nLeft === 0"
      />
      <column-layout v-if="selected > 0">
        <pie-chart :chartData="points[selected]" />
        <Details
          :data="points[selected]"
          :previousData="selected > 1 ? points[selected - 1] : null"
        />
        <Tweets :data="tweets[selected]" />
      </column-layout>
      <message v-else>
        <p>🔎 Click to inspect a point and view more information!</p>
      </message>
    </section>
    <about-section />
    <footer-section />
  </div>
</template>

<script>
import { fetchPoints, fetchTweets } from "./functions/fetchData";
import { toTimestamp } from "./functions/time";

import SvgDefinitions from "./components/SvgDefinitions.vue";
import LineGraph from "./components/LineGraph.vue";
import DataController from "./components/DataController.vue";
import ColumnLayout from "./components/ColumnLayout.vue";
import PieChart from "./components/PieChart.vue";
import Details from "./components/Details.vue";
import Tweets from "./components/Tweets.vue";
import Message from "./components/Message.vue";

import NavSection from "./components/sections/NavSection.vue";
import FooterSection from "./components/sections/FooterSection.vue";
import AboutSection from "./components/sections/AboutSection.vue";

export default {
  name: "App",
  components: {
    SvgDefinitions,
    LineGraph,
    DataController,
    ColumnLayout,
    PieChart,
    Details,
    Tweets,
    Message,
    NavSection,
    FooterSection,
    AboutSection,
  },
  data: () => ({
    points: null,
    selected: -1,
    tweets: null,
    showCount: 15,
    nLeft: 0,
  }),
  methods: {
    async onSelect(i) {
      this.selectedTweets = null;
      this.selected = i;
      if (!this.tweets[i]) {
        this.tweets[i] = await fetchTweets(this.points[i].time);
        this.$forceUpdate();
      }
    },
    async populateData(to) {
      this.points = await fetchPoints(to, this.showCount);
      this.selected = -1;
      this.tweets = new Array(this.showCount);
    },
    onMoveLeft() {
      this.populateData(this.points[0].time);
      this.nLeft += 1;
    },
    onMoveRight() {
      if (this.nLeft === 0) {
        alert("Cannot move dataset further right");
        return;
      }
      this.populateData(this.points.slice(-1)[0].time + 3600 * this.showCount);
      this.nLeft -= 1;
    },
    updateTargetPointCount() {
      this.showCount = Math.floor(window.innerWidth / 120) + 6;
    },
  },
  mounted() {
    this.updateTargetPointCount();
    this.populateData(toTimestamp(new Date()));
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
  background: white;
  color: #2c3e50;
  font-family: Montserrat, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1 {
  font-size: 40px;
}
h1,
h2,
h3 {
  line-height: 50px;
}
p {
  margin-top: 8px;
  margin-bottom: 8px;
  line-height: 26px;
}
a {
  color: inherit;
}

input {
  border: none;
  background: rgba(0, 0, 0, 0.15);
  color: inherit;
  padding: 4px 8px;
  border-radius: 3px;
  font-family: inherit;
  font-size: 14px;
}

button,
.button {
  border: none;
  color: inherit;
  padding: 4px 8px;
  border-radius: 3px;
  cursor: pointer;
  font-family: inherit;
  font-size: 14px;
}
</style>
