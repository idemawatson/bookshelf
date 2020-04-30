<template>
  <div>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="$emit('openNav')"></v-app-bar-nav-icon>
      <v-toolbar-title class="app-title">Bookshelf</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-icon @click="signOut">mdi-logout</v-icon>
    </v-app-bar>
  </div>
</template>
<script>
import { signOut } from "@/plugins/auth";
export default {
  methods: {
    async signOut() {
      await signOut();
    }
  }
};
</script>
