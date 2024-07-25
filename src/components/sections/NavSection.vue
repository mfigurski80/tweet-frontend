<template>
  <section id="#nav">
    <div class="layout">
      <h1 class="tag">#Coronavirus</h1>
      <h2 class="sub-title">Sentiment Dashboard</h2>
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
  padding: 8px 10px;
  max-width: 1300px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-gap: 10px 15px;
  justify-items: left;
  align-items: center;
}

.tag {
  display: inline-block;
  font-weight: normal;
  padding: 5px 8px;
  background: #eee;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
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

@media screen and (max-width: 1000px) {
  .layout {
    grid-template-columns: 1fr;
    justify-items: center;
  }
  section {
    position: unset;
  }
}
</style>
