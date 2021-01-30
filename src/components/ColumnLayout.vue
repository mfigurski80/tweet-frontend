<template>
  <div class="column-layout">
    <slot />
  </div>
</template>

<script>
export default {
  name: "ColumnLayout",
};
</script>

<style scoped>
.column-layout {
  max-width: 1300px;
  padding: 60px 10px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: top;
}
.column-layout > * {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>