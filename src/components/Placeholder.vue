<template>
  <div class="placeholder">
    <p>Loading data...</p>
  </div>
</template>

<script>
export default {
  name: "Placeholder",
};
</script>

<style scoped>
.placeholder {
  width: 100%;
  height: 100%;
  background: #eee;
  position: relative;
  padding: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: -10;
}
.placeholder:after {
  content: "";
  display: block;
  position: absolute;
  height: 500px;
  width: 200px;
  background: white;
  transform: skew(-25deg);
  z-index: -1;
  left: -300px;
  animation-name: scroll;
  animation-duration: 2s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-delay: 2s;
  /* animation: scroll 4s repeat; */
}

@keyframes scroll {
  0% {
    left: -230px;
  }
  30% {
    left: 130vw;
  }
  100% {
    left: 130vw;
  }
}
</style>