<template>
  <div class="message">
    <div>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "Message",
};
</script>

<style scoped>
.message {
  min-height: 100px;
  width: 100%;
  padding: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.message > div {
  /* background: #eee; */
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  padding: 10px;
  border-radius: 3px;
}
</style>