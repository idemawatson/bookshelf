<template>
  <transition name="note">
    <v-card
      class="note"
      v-if="show"
      :color="color"
      :class="leftBar"
      raised
      max-width="300"
      @click="show = false"
    >
      <p class="ma-4" style="font-weight: bold; color: white;">{{ text }}</p>
    </v-card>
  </transition>
</template>
<script>
const INFO_COLOR = "#81d4fa";
const ERROR_COLOR = "#ff1744";
const SUCCESS_COLOR = "#4CAF50";
const INFO = "info";
const SUCCESS = "success";
const ERROR = "error";

export default {
  data: () => ({
    status: String,
    text: String,
    color: String,
    show: false
  }),
  methods: {
    success(text) {
      this.status = SUCCESS;
      this.text = text;
      this.color = SUCCESS_COLOR;
      this.showNote();
    },
    error(text) {
      this.status = ERROR;
      this.text = text;
      this.color = ERROR_COLOR;
      this.showNote();
    },
    info(text) {
      this.status = INFO;
      this.text = text;
      this.color = INFO_COLOR;
      this.showNote();
    },
    showNote() {
      this.show = true;
      setTimeout(this.reset, 3000);
    },
    reset() {
      this.status = "";
      this.text = "";
      this.color = "";
      this.show = false;
    }
  },
  computed: {
    leftBar: () => {
      return this?.status + "_bar";
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
}
.success_bar {
  border-left-color: #2e7d32 !important;
}
.error_bar {
  border-left-color: #d50000 !important;
}
.info_bar {
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
