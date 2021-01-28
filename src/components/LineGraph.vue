<template>
  <div>
    <StripePattern />
    <div id="d3Graph"></div>
  </div>
</template>

<script>
import * as d3 from "d3";
import StripePattern from "./StripePattern.vue";

export default {
  name: "LineGraph",
  props: ["chartData", "onSelect"],
  components: {
    StripePattern,
  },
  data: () => ({
    m: { top: 40, bottom: 20, left: 0, right: 20 },
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
      // xRange[1] += Math.floor(
      //   (xRange[1] - xRange[0]) / (this.chartData.length - 1)
      // );
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

      // add hover groups backgrounds
      const hoverGroups = svg
        .selectAll("hoverGroup")
        .data(this.chartData)
        .enter()
        .append("g")
        .attr("class", "hoverGroup")
        .on("click", (e, d) => this.onSelect(d));
      hoverGroups
        .append("rect")
        .attr("class", "rect")
        .attr(
          "x",
          (d) => xScale(d.time) - width / (this.chartData.length - 1) + 5
        )
        .attr("y", 0)
        .attr("width", width / (this.chartData.length - 1))
        .attr("height", height);
      hoverGroups
        .append("circle")
        .attr("class", `dot positive`)
        .attr("cx", dataX)
        .attr("cy", dataYPositive)
        .attr("r", 5);
      hoverGroups
        .append("circle")
        .attr("class", `dot negative`)
        .attr("cx", dataX)
        .attr("cy", dataYNegative)
        .attr("r", 5);
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
  transition: 0.1s;
}
#d3Graph .positive {
  stroke: rgb(55, 180, 76);
}
#d3Graph .negative {
  stroke: #ff1744;
}
#d3Graph .hoverGroup .rect {
  cursor: pointer;
  stroke-width: 1;
  stroke: rgb(0, 0, 0);
  fill: url(#stripe-pattern);
  opacity: 0;
  transition: 0.1s;
}
#d3Graph .hoverGroup:hover .rect {
  opacity: 0.2;
}
#d3Graph .hoverGroup:hover .positive {
  fill: rgb(55, 180, 76);
}
#d3Graph .hoverGroup:hover .negative {
  fill: #ff1744;
}
</style>