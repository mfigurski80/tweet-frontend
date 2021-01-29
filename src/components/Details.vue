<template>
  <div class="details">
    <h2 class="total">
      Total: <span class="number">{{ data.total }}</span>
    </h2>
    <h2 class="positive">
      Positive: <span class="number">{{ data.positive }}</span> ({{
        percent(data.positive)
      }}%)
    </h2>
    <h2 class="negative">
      Negative: <span class="number">{{ data.negative }}</span> ({{
        percent(data.negative)
      }}%)
    </h2>
  </div>
</template>

<script>
export default {
  name: "Details",
  props: ["data"],
  methods: {
    percent(n) {
      return ((100 * n) / this.data.total).toFixed(2);
    },
  },
};
</script>

<style scoped>
.details {
  /* flex: 1; */
  padding: 20px;
}
h2 {
  font-weight: normal;
  display: block;
  margin: 5px;
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
</style>