<template>
  <div class="graph">
    <h1>Graph Component</h1>
    <p>{{ dataPoints }}</p>
  </div>
</template>

<script>
export default {
  name: "Graph",
  props: {
    dataPoints: Array,
  },
};
</script>

<style scoped>
h1 {
  color: blue;
}
</style>