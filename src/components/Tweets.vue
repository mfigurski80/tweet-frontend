<template>
  <div class="tweets" v-if="!!data">
    <div class="tweet" :class="t.sentiment" v-for="t in data" :key="t.id">
      <div class="group head">
        <a
          :href="'https://twitter.com/' + t.username"
          class="username"
          target="_blanck"
        >
          @{{ t.username }}
        </a>
        -
        <a class="time" :href="t.link"
          >posted at:
          {{
            t.createdAt
              ? toTime(t.createdAt).toLocaleTimeString()
              : "[not recorded]"
          }}</a
        >
      </div>
      <div class="group body">
        <p class="text">{{ t.text }}</p>
      </div>
      <div class="group footer">
        <p class="sentiment">{{ t.sentiment }}</p>
        <p class="confidence">
          ~ <span class="number">{{ t.confidence }}%</span> confidence
        </p>
      </div>
    </div>
  </div>
  <div class="placeholders" v-else>
    <div class="placeholder-tweet" v-for="i in [0, 1]" :key="i">
      <placeholder />
    </div>
  </div>
</template>

<script>
import Placeholder from "./Placeholder.vue";

import { toTime } from "../functions/time";

export default {
  name: "Tweets",
  props: ["data"],
  components: { Placeholder },
  methods: {
    toTime,
  },
};
</script>

<style scoped>
.tweet {
  max-width: 450px;
  margin: 15px 0;
  padding: 10px 30px;
  border: 1px solid #eee;
  border-radius: 3px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  /* background: #eee; */
  overflow-wrap: break-word;
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
.time {
  font-size: 14px;
  /* margin: 0 10px; */
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

.placeholder-tweet {
  width: 450px;
  height: 200px;
  margin: 15px 0;
  border-radius: 2px;
  overflow: hidden;
}
</style>