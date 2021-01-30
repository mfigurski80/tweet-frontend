<template>
  <div class="tweets">
    <div class="tweet" :class="t.sentiment" v-for="t in data" :key="t.id">
      <div class="group head">
        <a
          :href="'https://twitter.com/' + t.username"
          class="username"
          target="_blanck"
        >
          @{{ t.username }}
        </a>
        <p class="time">{{ t.createdAt }}</p>
      </div>
      <div class="group body">
        <p class="text">{{ t.text }}</p>
      </div>
      <div class="group footer">
        <p class="sentiment">{{ t.sentiment }}</p>
        <p class="confidence">
          <span class="number">{{ t.confidence }}%</span> confidence
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tweets",
  props: ["data"],
};
</script>

<style scoped>
.tweet {
  max-width: 500px;
  margin: 15px 0;
  padding: 10px 30px;
  border: 1px solid #eee;
  border-radius: 3px;
  /* box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24); */
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  /* background: #eee; */
  transition: 0.2s;
}
.tweet:hover {
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}
/* .tweet.positive:hover {
  box-shadow: 0 0 0 4px rgb(55, 180, 76);
}
.tweet.negative:hover {
  box-shadow: 0 0 0 4px #ff1744;
} */

.group {
  margin: 15px 0;
}

.username {
  font-size: 20px;
}

.text {
  line-height: 25px;
}

.sentiment {
  display: inline-block;
  padding: 10px 8px;
  background: #2c3e50;
  color: white;
  border-radius: 2px;
}
.positive .sentiment {
  background: rgb(55, 180, 76);
}
.negative .sentiment {
  background: #ff1744;
}
.confidence {
  font-size: 17px;
  display: inline;
  margin-left: 12px;
}
.confidence .number {
  font-size: 20px;
  font-weight: bold;
}
</style>