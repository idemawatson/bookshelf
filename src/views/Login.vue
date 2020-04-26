<template>
  <v-container class="login-container" fluid>
    <transition name="bounce" tag="v-card" mode="out-in">
      <v-card id="logo-card" outlined color="rgba(76, 175, 80, 0)" v-if="status == ''" key="logo">
        <v-icon dark x-large>mdi-book</v-icon>
        <v-card-text>
          <div class="display-1 white-text">
            BookShelf
          </div>
        </v-card-text>
      </v-card>
      <v-card v-if="status == 'login'">
        <div style="display: flex; justify-content: space-between">
          <v-card-title>Login</v-card-title>
          <v-icon class="mr-3" large @click="reset">mdi-backspace</v-icon>
        </div>
        <v-card-text>
          <textField label="E-mail" :rules="emailRules" v-model="email"></textField>
          <textField label="password" :rules="passwordRules" v-model="password" counter="6"></textField>
        </v-card-text>
      </v-card>
      <v-card v-if="status == 'signUp'">
        <div style="display: flex; justify-content: space-between">
          <v-card-title>SignUp</v-card-title>
          <v-icon class="mr-3" large @click="reset">mdi-backspace</v-icon>
        </div>
        <v-card-text>
          <textField label="E-mail" :rules="emailRules" v-model="email"></textField>
          <textField label="password" :rules="passwordRules" v-model="password" counter="6"></textField>
        </v-card-text>
      </v-card>
    </transition>
    <div class="first-btn">
      <br />
      <v-btn rounded outlined x-large color="white" @click="status = 'signUp'">SIGN UP</v-btn>
    </div>
    <div class="second-btn">
      <br />
      <v-btn rounded x-large color="white" @click="status = 'login'">LOGIN</v-btn>
    </div>
    <Note ref="note"></Note>
  </v-container>
</template>
<script>
import Note from "@/components/notification";
import textField from "@/components/textField";
// import firebase from "@/plugins/firebase";

export default {
  components: {
    Note,
    textField
  },
  data: () => ({
    valid: true,
    email: "",
    password: "",
    emailRules: [v => (v && v.indexOf("@") > 0) || "無効なメールアドレスです", v => !!v || "メールアドレスは必須です"],
    passwordRules: [v => (v && v.length >= 6) || "パスワードが短すぎます", v => !!v || "パスワードは必須です"],
    status: ""
  }),

  methods: {
    signUp() {
      // firebase.auth().createUserWithEmailAndPassword(info.password):
    },
    login() {
      console.log("login");
    },
    reset() {
      this.email = "";
      this.password = "";
      this.showLogin = false;
      this.showSignup = false;
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
