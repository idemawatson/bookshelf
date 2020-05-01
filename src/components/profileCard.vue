<template>
  <v-col cols="10" lg="6" xl="6">
    <v-card flat class="prof-card pr-5 pl-5 pt-2 pb-2" color="white">
      <v-card-title class="prof-title pl-0 pr-0">{{ title }}</v-card-title>
      <v-card-text class="prof-content pr-2" :class="fontSize">{{ value }}</v-card-text>
      <slot name="additional"></slot>
    </v-card>
  </v-col>
</template>
<script>
export default {
  props: {
    title: String,
    value: { type: String },
    fontSize: { type: String, default: "normal" }
  }
};
</script>
<style scoped>
.prof-card {
  border-radius: 10px;
}
.prof-title {
  font-weight: bold;
  font-size: 24px;
  color: var(--gray-color);
}
.prof-content {
  text-align: right;
  font-weight: bold;
  color: var(--contents-color) !important;
}
.normal {
  font-size: 24px;
}
.large {
  font-size: 48px;
}
</style>
