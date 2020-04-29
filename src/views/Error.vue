<template>
  <div>
    404: セッションが見つかりません。ログインしてください
    <v-btn @click="toLogin">ログインに戻る</v-btn>
  </div>
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
