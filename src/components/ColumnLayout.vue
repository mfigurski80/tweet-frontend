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
  max-width: 1200px;
  padding: 20px 10px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}
/* .column-layout > * {
  flex-grow: 1;
} */
</style>