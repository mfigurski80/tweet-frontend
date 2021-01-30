<template>
  <div class="details">
    <h2 class="time">
      At {{ toTime(data.time).toLocaleTimeString() }} [{{
        toTime(data.time).toLocaleDateString()
      }}]
    </h2>
    <h2 class="total">
      Total: <span class="number">{{ data.total }}</span>
      <span class="change" v-if="!!previousData">{{ change("total") }}</span>
    </h2>
    <h2 class="positive">
      Positive: <span class="number">{{ data.positive }}</span>
      <span class="change" v-if="!!previousData">{{
        changeRelative("positive")
      }}</span>
    </h2>
    <h2 class="negative">
      Negative: <span class="number">{{ data.negative }}</span>
      <span class="change" v-if="!!previousData">{{
        changeRelative("negative")
      }}</span>
    </h2>
  </div>
</template>

<script>
import { toTime } from "../functions/time";

export default {
  name: "Details",
  props: ["data", "previousData"],
  methods: {
    changeRelative(field) {
      let ch = (
        (this.data[field] /
          this.data.total /
          (this.previousData[field] / this.previousData.total) -
          1) *
        100
      ).toFixed(1);
      if (ch > 0) return `↑${ch}%`;
      return `↓${Math.abs(ch)}%`;
    },
    change(field) {
      let ch = (
        (this.data[field] / this.previousData[field] - 1) *
        100
      ).toFixed(1);
      if (ch > 0) return `↑${ch}%`;
      return `↓${Math.abs(ch)}%`;
    },
    toTime: toTime,
  },
};
</script>

<style scoped>
.details {
  /* flex: 1; */
  padding: 0 20px;
}
h2 {
  font-weight: normal;
  display: block;
  margin: 6px 0;
}
.time {
  display: inline-block;
  padding: 8px 0;
  margin-bottom: 15px;
  border-bottom: 2px solid #eee;
  font-size: 18px;
  text-decoration: italic;
}
.number {
  font-weight: bold;
  display: inline-block;
  padding: 15px;
  background: #eee;
  border-radius: 3px;
}
h2.positive .number {
  color: rgb(55, 180, 76);
}
h2.negative .number {
  color: #ff1744;
}
.change {
  margin: 0 5px;
}
</style>