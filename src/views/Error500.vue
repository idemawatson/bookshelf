<template>
  <v-container fluid class="error-container">
    <v-card class="error-card pa-3">
      <v-card-title>
        <div class="error-title">500</div>
      </v-card-title>
      <v-card-text style="font-size: 16px;">
        <div>エラーが発生しました</div>
        <div>管理者にご連絡ください</div>
      </v-card-text>
      <v-card-actions class="mt-3" style="text-align:center;">
        <v-spacer></v-spacer>
        <v-btn dark color="darken" @click="toLogin">ログイン</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
export default {
  methods: {
    toLogin() {
      this.$router.push("/login");
    }
  }
};
</script>
<style scoped>
.error-container {
  position: relative;
  text-align: center;
  color: white;
  height: 100%;
  background-color: var(--contents-color);
}
.error-card {
  position: absolute;
  top: 40%;
  left: 50%;
  transform-origin: 0 0 0;
  transform: translate(-50%, -50%);
  width: 80%;
  max-width: 500px;
}
.error-title {
  margin: auto;
  text-align: center;
  font-size: 32px;
  font-weight: bold;
  color: var(--dark-color);
}
</style>
