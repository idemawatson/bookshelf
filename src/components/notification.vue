<template>
  <transition name="note">
    <v-card class="note" v-if="show" :class="status + '-bar'" raised max-width="300" @click="show = false">
      <p class="ma-4" style="font-weight: bold; color: white;">{{ text }}</p>
    </v-card>
  </transition>
</template>
<script>
const INFO = "info";
const SUCCESS = "success";
const ERROR = "error";

export default {
  data: () => ({
    status: String,
    text: String,
    show: false
  }),
  methods: {
    success(text) {
      this.status = SUCCESS;
      this.text = text;
      this.showNote();
    },
    error(text) {
      this.status = ERROR;
      this.text = text;
      this.showNote();
    },
    info(text) {
      this.status = INFO;
      this.text = text;
      this.showNote();
    },
    showNote() {
      this.show = true;
      setTimeout(this.reset, 30000);
    },
    reset() {
      this.status = "";
      this.text = "";
      this.show = false;
    }
  }
};
</script>
<style scoped>
.note {
  position: absolute;
  right: 3%;
  bottom: 3%;
  border-left: solid 15px;
  white-space: pre-wrap;
}
.success-bar {
  background-color: var(--accent-color) !important;
  border-left-color: #909432 !important;
}
.error-bar {
  background-color: var(--error-color) !important;
  border-left-color: #c12f47 !important;
}
.info-bar {
  background-color: var(--info-color) !important;
  border-left-color: #29b6f6 !important;
}
.note-enter-active,
.note-leave-active {
  transition: opacity 0.5s;
}
.note-enter,
.note-leave-to {
  opacity: 0;
}
</style>
