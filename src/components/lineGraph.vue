<template>
  <div id="d3Graph"></div>
</template>

<script>
import * as d3 from "d3";

export default {
  name: "LineGraph",
  props: ["chartData"],
  data: () => ({
    m: { top: 20, bottom: 20, left: 20, right: 20 },
  }),
  mounted() {
    this.drawGraph();
    window.addEventListener("resize", this.drawGraph);
  },
  methods: {
    getDim() {
      return [
        window.innerWidth - this.m.left - this.m.right - 0,
        window.innerHeight - this.m.top - this.m.bottom - 6,
      ];
    },
    getScales(width, height) {
      const xRange = [this.chartData[0].time, this.chartData.slice(-1)[0].time];
      const yMax = this.chartData.reduce(
        (max, d) => (max < d.total ? d.total : max),
        0
      );

      const xScale = d3.scaleLinear().domain(xRange).range([0, width]);
      const yScale = d3.scaleLinear().domain([yMax, 0]).range([0, height]);
      return [xScale, yScale];
    },
    drawGraph() {
      const [width, height] = this.getDim();
      const [xScale, yScale] = this.getScales(width, height);

      const dataX = (d) => xScale(d.time);
      const dataYTotal = (d) => yScale(d.total);
      const dataYNegative = (d) => yScale(d.negative);
      const dataYPositive = (d) => yScale(d.positive + d.negative);

      const totalLine = d3
        .line()
        .x(dataX)
        .y(dataYTotal)
        .curve(d3.curveMonotoneX);
      const negativeLine = d3
        .line()
        .x(dataX)
        .y(dataYNegative)
        .curve(d3.curveMonotoneX);
      const positiveLine = d3
        .line()
        .x(dataX)
        .y(dataYPositive)
        .curve(d3.curveMonotoneX);

      d3.selectAll("#d3Graph > *").remove();
      const svg = d3
        .select("#d3Graph")
        .append("svg")
        .attr("width", width + this.m.left + this.m.right)
        .attr("height", height + this.m.top + this.m.bottom)
        .append("g")
        .attr("transform", `translate(${this.m.left}, ${this.m.top})`);

      svg
        .append("g")
        .attr("class", "x axis")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(xScale));
      // svg.append("g").attr("class", "y axis").call(d3.axisLeft(yScale));

      // draw total line
      svg
        .append("path")
        .datum(this.chartData)
        .attr("class", "line")
        .attr("d", totalLine);
      svg
        .selectAll(".dot")
        .data(this.chartData)
        .enter()
        .append("circle")
        .attr("class", "dot")
        .attr("cx", dataX)
        .attr("cy", dataYTotal)
        .attr("r", 5);
      // draw negative line
      svg
        .append("path")
        .datum(this.chartData)
        .attr("class", "line")
        .attr("d", negativeLine);
      // draw positive line
      svg
        .append("path")
        .datum(this.chartData)
        .attr("class", "line")
        .attr("d", positiveLine);
    },
  },
};
</script>

<style>
svg {
  max-height: 100vh;
}
.line {
  fill: none;
  stroke: #ffab00;
  stroke-width: 3;
}
.dot {
  fill: #ffab00;
  stroke: #fff;
}

.focus circle {
  fill: none;
  stroke: steelblue;
}
</style>