<template>
  <div class="data-controller">
    <button v-on:click="onLeft">‹</button>
    <button v-on:click="onRight" :disabled="rightDisabled">›</button>
  </div>
</template>

<script>
export default {
  name: "DataController",
  props: ["onLeft", "onRight", "rightDisabled"],
};
</script>

<style scoped>
.data-controller {
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
button {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  padding: 6px 12px;
  line-height: 20px;
  border-radius: 16px;
  margin-left: 6px;
  font-weight: bold;
  font-size: 14px;
}
button:not(:disabled):hover {
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}
button:disabled {
  cursor: unset;
  background: inherit;
  opacity: 0.6;
}
</style>