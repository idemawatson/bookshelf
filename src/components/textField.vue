<template>
  <v-text-field
    clearable
    :value="value"
    :rules="rules"
    :label="label"
    @input="issueEvent"
    :counter="counter"
  ></v-text-field>
</template>
<script>
export default {
  props: {
    label: { type: String, required: true },
    value: { type: String, required: true },
    rules: { type: Array },
    counter: { type: String }
  },
  methods: {
    issueEvent(value) {
      this.$emit("input", value);
    }
  }
};
</script>
