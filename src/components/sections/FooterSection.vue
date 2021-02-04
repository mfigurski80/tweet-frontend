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
        <p>
          Want to give feedback? Want access to this data? Want help with making
          something similar? Send me an email at:
          <a href="mailto:miko.f80@gmail.com">miko.f80@gmail.com</a>
        </p>
        <p>
          Check out my
          <a href="http://meeksfigs.surge.sh">other work</a>
        </p>
      </div>

      <div class="signup">
        <p>Recieve notifications about updates to this project:</p>
        <form @submit="onEmailSubmit">
          <input
            type="email"
            placeholder="name@email.com"
            v-model="email"
            :disabled="registeredEmail"
          />
          <div class="divider"></div>
          <button type="submit" :disabled="registeredEmail">Register</button>
        </form>
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
    email: null,
    registeredEmail: false,
    expiryDate: expiryDate,
    expiryPercentage: Math.min(
      (
        ((expiryDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24 * 30 * 2)) *
        100
      ).toFixed(0),
      100
    ),
  }),
  methods: {
    onEmailSubmit() {
      console.log(this.email);
      alert("This feature is not yet implemented");
      this.registeredEmail = true;
    },
  },
};
</script>

<style scoped>
#footer {
  background: #1e2c38;
  color: #6b8197;
  box-shadow: inset 0 3px 6px rgba(0, 0, 0, 0.16),
    inset 0 3px 6px rgba(0, 0, 0, 0.23);
  font-size: 15px;
}

.layout {
  padding: 30px 10px 15px 10px;
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
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
  background: rgba(0, 0, 0, 0.1);
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

.contact {
  justify-self: center;
}
form {
  background: rgba(0, 0, 0, 0.15);
  display: inline-block;
  border-radius: 4px;
}
input {
  padding: 10px;
  background: none;
  border-radius: 4px 0 0 4px;
}
.divider {
  display: inline;
  height: 50%;
  border-left: 1px solid #253746;
  margin-left: -1px;
  pointer-events: none;
}
.horizontal-divider {
  width: 100%;
  border-top: 1px solid #253746;
  margin-top: 15px;
}
button {
  padding: 10px;
  background: none;
  border-radius: 0 4px 4px 0;
  transition: all 0.1s;
}
button:enabled:hover {
  background: rgb(55, 180, 76);
  color: #1e2c38;
}
button:disabled,
input:disabled {
  cursor: unset;
  background: rgba(150, 150, 150, 0.2);
}

footer {
  grid-column: 1 / span 3;

  padding: 15px 0;
  font-size: 13px;
  /* text-align: center; */
  border-top: 1px solid #253746;
}
</style>