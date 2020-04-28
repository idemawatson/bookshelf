<template>
  <v-container class="login-container" fluid>
    <transition name="bounce" tag="v-card" mode="out-in">
      <v-card id="logo-card" class="center-card" outlined color="rgba(76, 175, 80, 0)" v-if="status == ''" key="logo">
        <v-icon dark x-large>mdi-book</v-icon>
        <v-card-text>
          <div class="display-1 white-text">
            BookShelf
          </div>
        </v-card-text>
      </v-card>
      <v-card v-if="status == 'signUp'" class="center-card" key="login" color="lighten">
        <div class="card-title">
          <v-card-title>Sign Up</v-card-title>
          <v-icon class="mr-3" large @click="reset">mdi-backspace</v-icon>
        </div>
        <v-card-text>
          <v-form ref="form">
            <textField label="E-mail" :rules="emailRules" v-model="email"></textField>
            <textField label="password" :rules="passwordRules" v-model="password" counter="8"></textField>
            <textField label="userName" :rules="nameRules" v-model="userName" counter="8"></textField>
            <v-btn small raised color="accent" class="mt-3" @click="signUp">Go</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
      <v-card v-if="status == 'login'" class="center-card" key="login" color="lighten">
        <div class="card-title">
          <v-card-title>Login</v-card-title>
          <v-icon class="mr-3" large @click="reset">mdi-backspace</v-icon>
        </div>
        <v-card-text>
          <v-form ref="form">
            <textField label="E-mail" :rules="emailRules" v-model="email"></textField>
            <textField label="password" :rules="passwordRules" v-model="password"></textField>
            <textField label="userName" :rules="nameRules" v-model="userName" counter="8"></textField>
            <v-btn small raised color="accent" class="mt-3" @click="login">Go</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </transition>
    <div class="first-btn">
      <br />
      <v-btn rounded :outlined="status !== 'signUp'" x-large color="lighten" @click="changeStatus('signUp')"
        >SIGN UP</v-btn
      >
    </div>
    <div class="second-btn">
      <br />
      <v-btn rounded :outlined="status !== 'login'" x-large color="lighten" @click="changeStatus('login')">LOGIN</v-btn>
    </div>
    <Note ref="note"></Note>
  </v-container>
</template>
<script>
import Note from "@/components/notification";
import textField from "@/components/textField";
import * as auth from "@/plugins/auth";

export default {
  components: {
    Note,
    textField
  },
  data: () => ({
    email: "",
    password: "",
    userName: "",
    emailRules: [
      v => !!v || "メールアドレスを入力してください",
      v => (v && v.indexOf("@") > 0) || "無効なメールアドレスです"
    ],
    passwordRules: [
      v => !!v || "パスワードを入力してください",
      v => /^[a-z\d]{0,20}$/i.test(v) || "パスワードは半角英数字のみ使用できます",
      v => (v && v.length >= 8) || "パスワードは8文字以上です"
    ],
    nameRules: [v => !!v || "ユーザー名を入力してください", v => (v && v.length <= 8) || "ユーザー名は8文字以内です"],
    status: ""
  }),

  methods: {
    async signUp() {
      if (!this.$refs.form.validate()) return;
      try {
        await auth.signUp(this.email, this.password, this.userName);
        this.$refs.note.success("ユーザー登録: 完了\n引き続きログインしてください");
        this.changeStatus("login");
      } catch (error) {
        this.$refs.note.error(error.message);
      }
    },
    async login() {
      if (!this.$refs.form.validate()) return;
      try {
        await auth.login(this.email, this.password);
        this.$router.push("/home");
      } catch (error) {
        this.$refs.note.error(error.message);
      }
    },
    reset() {
      this.email = "";
      this.password = "";
      this.status = "";
    },
    changeStatus(status) {
      if (this.status == status) return;
      this.reset();
      this.status = status;
      if (this.$refs.form) {
        this.$refs.form.reset();
      }
    }
  }
};
</script>
<style scoped>
@import url("~@/css/login.css");
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0) translate(-50%, -50%);
  }
  50% {
    transform: scale(1.25) translate(-50%, -50%);
  }
  100% {
    transform: scale(1) translate(-50%, -50%);
  }
}
</style>
