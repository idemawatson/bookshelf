<template>
  <v-col cols="5" lg="4" xl="4"
    ><v-card>
      <v-card-title>{{ title }}</v-card-title>
      <v-card-text>{{ value }}</v-card-text></v-card
    ></v-col
  >
</template>
<script>
export default {
  props: {
    title: String,
    value: String
  }
};
</script>
