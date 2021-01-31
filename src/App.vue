<template>
  <div id="app">
    <nav-section />
    <section id="charts">
      <svg-definitions />
      <line-graph :chartData="points" :onSelect="onSelect" />
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
    <footer-section />
  </div>
</template>

<script>
import { fetchPoints, fetchTweets } from "./functions/fetchPoints";

import SvgDefinitions from "./components/SvgDefinitions.vue";
import LineGraph from "./components/LineGraph.vue";
import ColumnLayout from "./components/ColumnLayout.vue";
import PieChart from "./components/PieChart.vue";
import Details from "./components/Details.vue";
import Tweets from "./components/Tweets.vue";
import Message from "./components/Message.vue";

import NavSection from "./components/NavSection.vue";
import FooterSection from "./components/FooterSection.vue";

export default {
  name: "App",
  components: {
    SvgDefinitions,
    LineGraph,
    ColumnLayout,
    PieChart,
    Details,
    Tweets,
    Message,
    NavSection,
    FooterSection,
  },
  data: () => ({
    points: null,
    selected: -1,
    tweets: null,
  }),
  methods: {
    async onSelect(i) {
      this.selectedTweets = null;
      this.selected = i;
      if (!this.tweets[i]) {
        console.log(`fetching tweets for point ${i}`);
        this.tweets[i] = await fetchTweets(this.points[i].time);
        this.$forceUpdate();
      }
    },
    async populateData() {
      this.points = await fetchPoints(new Date(), 15);
      this.selected = -1;
      this.tweets = new Array(15);
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
  background: white;
  color: #2c3e50;
  font-family: Montserrat, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1 {
  font-size: 40px;
}
p {
  margin-top: 6px;
  margin-bottom: 6px;
  line-height: 24px;
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
