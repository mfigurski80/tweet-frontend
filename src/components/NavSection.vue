<template>
  <section id="#nav">
    <div class="layout">
      <div class="title-section">
        <h1 class="tag">#Coronavirus</h1>
        <h2 class="sub-title">A Sentimentrophogajizer</h2>
      </div>
      <nav class="links-section">
        <a href="#charts">Charts</a>
        <a href="#about">About</a>
        <a href="#footer">Contact</a>
      </nav>
    </div>
  </section>
</template>

<script>
export default {
  name: "NavSection",
};
</script>

<style scoped>
section {
  border-bottom: 1px solid #eee;
  position: sticky;
  z-index: 100;
  top: 0;
  /* box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24); */
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  background: white;
}
.layout {
  padding: 0 10px;
  max-width: 1300px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  flex-wrap: wrap-reverse;
}

.title-section {
  padding: 10px 0;
  display: flex;
  align-items: center;
  flex: 1;
}
.tag {
  display: inline-block;
  font-weight: normal;
  padding: 6px 10px;
  background: #eee;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}
.sub-title {
  margin: 0 15px;
  /* font-weight: normal; */
}

.links-section {
  padding: 15px 0 15px 0;
  text-align: center;
}
a {
  margin: 0 10px;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
</style>