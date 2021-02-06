<template>
  <div id="line-graph">
    <div style="display: None">{{ chartData }}</div>
    <div v-if="!!chartData">
      <div id="d3Graph"></div>
      <div class="legend">
        <p class="negative legend-marker">negative sentiment tweets</p>
        <p class="positive legend-marker">positive sentiment tweets</p>
      </div>
    </div>
    <div class="placeholder" v-else>
      <placeholder />
    </div>
  </div>
</template>

<script>
import * as d3 from "d3";

import Placeholder from "./Placeholder.vue";

export default {
  name: "LineGraph",
  props: ["chartData", "onSelect"],
  components: { Placeholder },

  data: () => ({
    m: { top: 0, bottom: 20, left: 0, right: 20 },
    selected: -1,
  }),
  mounted() {
    this.drawGraph();
    window.addEventListener("resize", this.drawGraph);
  },
  updated() {
    this.drawGraph();
  },
  methods: {
    prepareData() {
      return this.chartData.map((d, i) => ({
        time: d.time,
        positive: d.positive,
        negative: d.negative,
        i,
      }));
    },
    getDim() {
      return [
        window.innerWidth - this.m.left - this.m.right,
        500 - this.m.top - this.m.bottom - 6,
      ];
    },
    getScales(data, width, height) {
      const xRange = [data[0].time, data.slice(-1)[0].time];
      // xRange[1] += Math.floor(
      //   (xRange[1] - xRange[0]) / (data.length - 1)
      // );
      const yMax =
        data.reduce((max, d) => {
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
    formatDate(t) {
      return new Date(t * 1000).toLocaleString();
    },
    onSelectPoint(e, d) {
      this.selected = d.i;
      this.drawGraph();
      this.onSelect(d.i);
    },
    drawGraph() {
      if (!this.chartData) return;
      const chartData = this.prepareData();
      const [width, height] = this.getDim();
      const [xScale, yScale] = this.getScales(chartData, width, height);

      // make canvas
      d3.selectAll("#d3Graph > *").remove();
      const svg = d3
        .select("#d3Graph")
        .append("svg")
        .attr("width", width + this.m.left + this.m.right)
        .attr("height", height + this.m.top + this.m.bottom)
        .append("g")
        .attr("transform", `translate(${this.m.left}, ${this.m.top})`);

      // draw lines
      const dataX = (d) => xScale(d.time);
      const dataYNegative = (d) => yScale(d.negative);
      const dataYPositive = (d) => yScale(d.positive);
      this.addLine(svg, dataX, dataYNegative, chartData, "negative");
      this.addLine(svg, dataX, dataYPositive, chartData, "positive");

      // add hover groups backgrounds
      const hoverGroups = svg
        .selectAll("hoverGroup")
        .data(chartData)
        .enter()
        .append("g")
        .attr(
          "class",
          (d) => `hoverGroup ${this.selected === d.i ? "selected" : ""}`
        )
        .on("click", this.onSelectPoint);
      hoverGroups
        .append("rect")
        .attr("class", "rect")
        .attr("x", (d) => xScale(d.time) - width / (chartData.length - 1) + 6)
        .attr("y", 0)
        .attr("width", width / (chartData.length - 1))
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

      // axis append
      svg
        .append("rect")
        .attr("class", "y-axis-background")
        .attr("height", height);
      svg
        .append("g")
        .attr("class", "x axis")
        .attr("transform", `translate(0, ${height})`)
        .call(
          d3.axisBottom(xScale).ticks(4).tickFormat(this.formatDate).tickSize(0)
        )
        .select(".domain")
        .remove();
      svg
        .append("g")
        .attr("class", "y axis")
        .call(
          d3.axisRight(yScale).ticks(5, "s").tickSizeOuter(0).tickSizeInner(20)
        )
        .select(".domain")
        .remove();
    },
  },
};
</script>

<style>
#line-graph {
  padding-bottom: 10px;
  position: relative;
}
#line-graph .placeholder {
  width: 100vw;
  height: 500px;
}

#line-graph .legend {
  position: absolute;
  top: 15px;
  right: 20px;
  overflow: show;
  padding: 8px 15px;
  background: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  border-radius: 4px;
  pointer-events: none;
  font-size: 14px;
}
#line-graph .positive.legend-marker:before {
  content: "";
  display: inline-block;
  height: 8px;
  width: 8px;
  /* background: rgb(55, 180, 76); */
  border-radius: 50%;
  border: 3px solid rgb(55, 180, 76);
  margin-right: 6px;
}
#line-graph .negative.legend-marker:before {
  content: "";
  display: inline-block;
  height: 8px;
  width: 8px;
  border-radius: 50%;
  border: 3px solid #ff1744;
  margin-right: 6px;
}

#d3Graph {
  width: 100vw;
  height: 500px;
  overflow: show;
}
/* Lines and Dots */
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
/* Hover Groups */
#d3Graph .hoverGroup .rect {
  cursor: pointer;
  stroke-width: 1;
  stroke: none;
  fill: url(#stripe-pattern);
  opacity: 0;
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
/* SELECTED Hover Groups */
#d3Graph .hoverGroup.selected .rect {
  stroke: rgb(0, 0, 0);
  opacity: 0.2;
}
/* Axis */
#d3Graph .axis {
  pointer-events: none;
}
#d3Graph .y-axis-background {
  fill: url(#vertical-gradient);
  pointer-events: none;
  width: 100px;
}
</style>