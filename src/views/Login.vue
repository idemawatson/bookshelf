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
      <v-card v-if="status == 'login'" class="center-card" key="login" color="lighten">
        <div class="card-title">
          <v-card-title>Login</v-card-title>
          <v-icon class="mr-3" large @click="reset">mdi-backspace</v-icon>
        </div>
        <v-card-text>
          <textField label="E-mail" :rules="emailRules" v-model="email"></textField>
          <textField label="password" :rules="passwordRules" v-model="password"></textField>
          <v-btn small raised color="accent" @click="signUp">Go</v-btn>
        </v-card-text>
      </v-card>
      <v-card v-if="status == 'signUp'" class="center-card" key="login" color="lighten">
        <div class="card-title">
          <v-card-title>Sign Up</v-card-title>
          <v-icon class="mr-3" large @click="reset">mdi-backspace</v-icon>
        </div>
        <v-card-text>
          <textField label="E-mail" :rules="emailRules" v-model="email"></textField>
          <textField label="password" :rules="passwordRules" v-model="password" counter="8"></textField>
          <v-btn small raised color="accent" @click="login">Go</v-btn>
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
import firebase from "@/plugins/firebase";

export default {
  components: {
    Note,
    textField
  },
  data: () => ({
    email: "",
    password: "",
    emailRules: [v => !!v || "メールアドレスは必須です", v => (v && v.indexOf("@") > 0) || "無効なメールアドレスです"],
    passwordRules: [v => !!v || "パスワードは必須です", v => (v && v.length >= 8) || "パスワードは8文字以上です"],
    status: ""
  }),

  methods: {
    async signUp() {
      try {
        await firebase.auth().createUserWithEmailAndPassword(this.email, this.password);
        this.$refs.note.success("`ユーザー登録: ${ this.email }`");
        this.changeStatus("login");
      } catch (error) {
        console.error(error);
        this.$refs.note.error("ユーザー登録に失敗しました。");
      }
    },
    login() {
      console.log("login");
    },
    reset() {
      this.email = "";
      this.password = "";
      this.status = "";
    },
    changeStatus(status) {
      this.reset();
      this.status = status;
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
