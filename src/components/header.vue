<template>
  <div>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title class="app-title">Bookshelf</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-icon>mdi-logout</v-icon>
    </v-app-bar>
  </div>
</template>
<style scoped>
.app-title {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  color: var(--white-color);
  letter-spacing: 0.1em;
}
</style>
