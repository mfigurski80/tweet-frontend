<template>
  <div id="footer">
    <div class="layout">
      <div class="funding">
        <p>
          This project will go offline on
          <span class="date">{{ expiryDate.toLocaleDateString() }}</span
          >.
        </p>
        <p>
          If you have expertise in reducing cloud costs or want to otherwise
          show support, please
          <a href="mailto:miko.f80@gmail.com">get in touch!</a>
        </p>
        <div class="progress-bar" :percentage="expiryPercentage + '% funded'">
          <div
            class="progress-indicator"
            :style="`width:${expiryPercentage}%`"
            :class="expiryPercentage < 40 ? 'low' : ''"
          ></div>
        </div>
      </div>
      <div class="contact">
        <p>Contact me?</p>
      </div>
      <footer>© Mikolaj Figurski - 2021</footer>
    </div>
  </div>
</template>

<script>
const expiryDate = new Date("02 30 2021");
export default {
  name: "FooterSection",
  data: () => ({
    expiryDate: expiryDate,
    expiryPercentage: Math.min(
      (
        ((expiryDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24 * 60)) *
        100
      ).toFixed(0),
      100
    ),
  }),
};
</script>

<style scoped>
#footer {
  background: #1e2c38;
  color: #5d748b;
  box-shadow: inset 0 3px 6px rgba(0, 0, 0, 0.16),
    inset 0 3px 6px rgba(0, 0, 0, 0.23);
}

.layout {
  padding: 30px 10px 15px 10px;
  max-width: 1300px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 3fr;
  grid-gap: 20px 40px;
}

.date {
  text-decoration: underline;
}
.progress-bar {
  width: 100%;
  height: 25px;
  margin: 20px 0;
  padding-right: 20px;
  background: rgba(0, 0, 0, 0.15);
  box-shadow: inset 0 3px 6px rgba(0, 0, 0, 0.16),
    inset 0 3px 6px rgba(0, 0, 0, 0.23);
  border-radius: 4px;
  /* overflow: hidden; */
}
.progress-bar:after {
  content: attr(percentage);
  line-height: 20px;
  font-size: 13px;
}
.progress-bar .progress-indicator {
  padding-left: 8px;
  height: 100%;

  /* width: 100%; */
  background: rgb(55, 180, 76);
  border-radius: 4px;
}
.progress-bar .progress-indicator.low {
  background: #ff1744;
}

footer {
  grid-column: 1 / span 2;

  padding: 15px 0;
  font-size: 13px;
  /* text-align: center; */
  border-top: 1px solid #253746;
}
</style>