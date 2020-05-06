<template>
  <v-col cols="10" lg="8" xl="8" class="pa-0">
    <v-card outlined class="pb-0 mb-2">
      <v-card-text class="pa-0 pr-3 pl-3">
        <div class="user-name pa-2 pt-4">{{ user.name }}</div>
        <v-row>
          <v-col cols="8">
            <div class="user-level pa-2">読書レベル: {{ user.level }}</div></v-col
          >
          <slot name="activator"></slot>
        </v-row>
      </v-card-text>
    </v-card>
  </v-col>
</template>
<script>
export default {
  props: {
    user: {}
  }
};
</script>
<style scoped>
.user-name {
  font-size: 24px;
  font-weight: bold;
  color: var(--contents-color);
}
.user-level {
  font-size: 20px;
  color: var(--gray-color);
}
</style>
