<template>
  <transition name="note">
    <v-card class="note" :color="color" :class="leftBorder" v-if="showNote" raised max-width="300">
      <p class="ma-4" style="font-weight: bold; color: white;">{{ text }}</p>
    </v-card>
  </transition>
</template>
<script>
export default {
  data: () => ({
    showNote: false,
    text: "",
    color: "",
    leftBorder: ""
  }),
  methods: {
    updateAndShowNote(status, text) {
      switch (status) {
        case "info":
          this.color = "#81d4fa";
          this.leftBorder = status + "_bar";
          break;
        case "error":
          this.color = "#ff1744";
          this.leftBorder = status + "_bar";
          break;
        case "success":
          this.color = "#4CAF50";
          this.leftBorder = status + "_bar";
          break;
        default:
          break;
      }
      this.text = text;
      this.showNote = true;
      setTimeout(this.reset, 3000);
    },
    reset () {
      this.showNote = false,
      this.text = "",
      this.color = ""
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
  border-left-color: #2E7D32 !important;
}
.error_bar {
  border-left-color: #D50000 !important;
}
.info_bar {
  border-left-color: #29B6F6 !important;
}
.note-enter-active, .note-leave-active {
  transition: opacity .5s;
}
.note-enter, .note-leave-to {
  opacity: 0;
}
</style>
