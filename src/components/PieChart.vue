<template>
  <div>
    <div style="display: None">{{ chartData }}</div>
    <div id="d3PieChart"></div>
  </div>
</template>

<script>
import * as d3 from "d3";

export default {
  name: "PieChart",
  props: ["chartData"],
  mounted() {
    this.drawGraph();
  },
  updated() {
    this.drawGraph();
  },
  methods: {
    prepareData() {
      return d3
        .pie()
        .sort(null)
        .value((d) => d.value)([
        { label: "positive", value: this.chartData.positive },
        { label: "negative", value: this.chartData.negative },
        {
          label: "total",
          value:
            this.chartData.total -
            this.chartData.positive -
            this.chartData.negative,
        },
      ]);
    },
    drawGraph() {
      const data = this.prepareData();

      // set up canvas
      d3.selectAll("#d3PieChart > *").remove();
      const svg = d3
        .select("#d3PieChart")
        .append("svg")
        .attr("height", "100%")
        .attr("width", "100%")
        .attr("viewBox", [-1, -1, 2, 2]);

      const arc = d3
        .arc()
        .innerRadius(1 / 2)
        .outerRadius(1);
      svg
        .append("g")
        .selectAll("path")
        .data(data)
        .join("path")
        .attr("class", (d) => `slice ${d.data.label}`)
        .attr("d", arc);
    },
  },
};
</script>

<style>
#d3PieChart {
  max-height: 3500px;
  max-width: 3500px;
  /* width: 400px;
  height: 400px; */
}
#d3PieChart .positive {
  fill: rgb(55, 180, 76);
}
#d3PieChart .negative {
  fill: #ff1744;
}
#d3PieChart .total {
  fill: #eee;
}
</style>