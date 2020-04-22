<template>
  <v-container class="login-container" fluid>
    <transition name="bounce" tag="v-card" mode="out-in">
      <v-card
        id="logo-card"
        outlined
        color="rgba(76, 175, 80, 0)"
        v-if="!showSignup && !showLogin"
        key="logo"
      >
        <v-icon dark x-large>mdi-book</v-icon>
        <v-card-text>
          <div class="display-1 white-text">
            BookShelf
          </div>
        </v-card-text>
      </v-card>

      <v-card id="logo-card" v-if="showLogin" key="login">
        <div style="display: flex; justify-content: space-between">
          <v-card-title>Login</v-card-title>
          <v-icon class="mr-3" large @click="reset">mdi-backspace</v-icon>
        </div>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="e-mail"
              required
            >
            </v-text-field>
            <v-text-field
              v-model="password"
              :rules="passwordRules"
              required
              label="password"
              :counter="6"
            >
            </v-text-field>
          </v-form>
        </v-card-text>
      </v-card>

      <v-card id="logo-card" v-if="showSignup" key="signup">
        <div style="display: flex; justify-content: space-between">
          <v-card-title>SignUp</v-card-title>
          <v-icon class="mr-3" large @click="reset">mdi-backspace</v-icon>
        </div>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
            >
            </v-text-field>
            <v-text-field
              v-model="password"
              :rules="passwordRules"
              required
              label="Password"
              :counter="6"
            >
            </v-text-field>
            <v-text-field
              v-model="name"
              :rules="nameRules"
              required
              label="UseName"
            >
            </v-text-field>
          </v-form>
        </v-card-text>
      </v-card>
    </transition>
    <div v-if="!showLogin" class="first-btn">
      <br />
      <v-btn rounded outlined x-large color="white" @click="signUp"
        >SIGN UP</v-btn
      >
    </div>
    <div v-if="!showSignup" :class="fadeBtn">
      <br />
      <v-btn rounded x-large color="white" @click="login">LOGIN</v-btn>
    </div>
    <Note ref="note"></Note>
  </v-container>
</template>
<script>
import Note from "@/components/notification";

export default {
  components: {
    Note: Note
  },
  data: () => ({
    valid: true,
    email: "",
    emailRules: [
      v => (v && v.indexOf("@") > 0) || "E-mail must be valid",
      v => !!v || "E-mail is required"
    ],
    password: "",
    passwordRules: [
      v => (v && v.length >= 6) || "Password too short",
      v => !!v || "Password is required"
    ],
    name: "",
    nameRules: [v => !!v || "UserName is required"],
    showLogin: false,
    showSignup: false
  }),

  computed: {
    fadeBtn: function() {
      return {
        "second-btn": !this.showSignUp && !this.showLogin,
        "first-btn": this.showLogin
      };
    }
  },

  methods: {
    reset() {
      this.$refs.form.reset();
      this.showLogin = false;
      this.showSignup = false;
    },
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
