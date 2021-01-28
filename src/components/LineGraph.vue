<template>
  <div id="d3Graph"></div>
</template>

<script>
import * as d3 from "d3";

export default {
  name: "LineGraph",
  props: ["chartData"],
  data: () => ({
    m: { top: 40, bottom: 20, left: 0, right: 0 },
    selected: -1,
  }),
  mounted() {
    this.drawGraph();
    window.addEventListener("resize", this.drawGraph);
  },
  methods: {
    getDim() {
      return [
        window.innerWidth - this.m.left - this.m.right,
        500 - this.m.top - this.m.bottom - 6,
      ];
    },
    getScales(width, height) {
      const xRange = [this.chartData[0].time, this.chartData.slice(-1)[0].time];
      xRange[1] += Math.floor(
        (xRange[1] - xRange[0]) / (this.chartData.length - 1)
      );
      const yMax =
        this.chartData.reduce((max, d) => {
          let highest = d.positive > d.negative ? d.positive : d.negative;
          return max > highest ? max : highest;
        }, 0) * 1.1;

      const xScale = d3.scaleLinear().domain(xRange).range([0, width]);
      const yScale = d3.scaleLinear().domain([yMax, 0]).range([0, height]);
      return [xScale, yScale];
    },
    addLine(canvas, dataX, dataY, datum, className) {
      const line = d3.line().x(dataX).y(dataY).curve(d3.curveMonotoneX);
      canvas
        .append("path")
        .datum(datum)
        .attr("class", `line ${className}`)
        .attr("d", line);
    },
    addPoints(canvas, dataX, dataY, datum, className) {
      canvas
        .selectAll(`.dot.${className.replace(" ", ".")}`)
        .data(datum)
        .enter()
        .append("circle")
        .attr("class", `dot ${className}`)
        .attr("cx", dataX)
        .attr("cy", dataY)
        .attr("r", 5);
    },
    drawGraph() {
      const [width, height] = this.getDim();
      const [xScale, yScale] = this.getScales(width, height);

      // make canvas
      d3.selectAll("#d3Graph > *").remove();
      const svg = d3
        .select("#d3Graph")
        .append("svg")
        .attr("width", width + this.m.left + this.m.right)
        .attr("height", height + this.m.top + this.m.bottom)
        .append("g")
        .attr("transform", `translate(${this.m.left}, ${this.m.top})`);

      // axis append
      svg
        .append("g")
        .attr("class", "x axis")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(xScale).ticks(4, "s").tickSize(0));
      // svg.append("g").attr("class", "y axis").call(d3.axisLeft(yScale));

      // draw lines
      const dataX = (d) => xScale(d.time);
      const dataYNegative = (d) => yScale(d.negative);
      const dataYPositive = (d) => yScale(d.positive);
      this.addLine(svg, dataX, dataYNegative, this.chartData, "negative");
      this.addLine(svg, dataX, dataYPositive, this.chartData, "positive");
      this.addPoints(svg, dataX, dataYNegative, this.chartData, "negative");
      this.addPoints(svg, dataX, dataYPositive, this.chartData, "positive");

      // add hover areas
      svg
        .selectAll(".hoverArea")
        .data(this.chartData)
        .enter()
        .append("rect")
        .attr("class", "hoverArea")
        .attr("x", dataX)
        .attr("y", 0)
        .attr("width", width / this.chartData.length)
        .attr("height", height);
    },
  },
};
</script>

<style>
#d3Graph {
  width: 90vw;
  min-height: 400px;
  overflow: show;
}
#d3Graph .line {
  fill: none !important;
  stroke-width: 3;
}
#d3Graph .dot {
  stroke-width: 3;
  fill: white;
  stroke: blue;
}
#d3Graph .positive {
  stroke: rgb(55, 180, 76);
}
#d3Graph .negative {
  stroke: #ff1744;
}
#d3Graph .hoverArea {
  cursor: pointer;
  fill: rgba(0, 0, 0, 0);
  transition: 0.1s;
  stroke-width: 1;
}
#d3Graph .hoverArea:hover {
  fill: rgba(0, 0, 0, 0.2);
}
</style>