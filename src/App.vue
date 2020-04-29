<template>
  <v-app class="app-top">
    <v-content class="app-content">
      <div v-if="!isLoginView">
        <Header @openNav="drawer = true"></Header>
        <v-navigation-drawer app v-model="drawer" dark color="primary">
          <v-list-item>
            <v-list-item-title class="app-title" style="text-align: left">
              Bookshelf
            </v-list-item-title>
            <v-btn icon>
              <v-icon @click="drawer = false">mdi-chevron-left</v-icon>
            </v-btn>
          </v-list-item>
          <v-divider />
          <v-list nav>
            <v-list-item v-for="menu in menus" :key="menu.title" :to="menu.url">
              <div @click="drawer = false">
                <v-icon>{{ menu.icon }}</v-icon>
                <div class="pa-2" style="display: inline;">{{ menu.title }}</div>
              </div>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
      </div>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Header from "@/components/header";

export default {
  name: "App",
  components: {
    Header
  },
  data: () => ({
    drawer: false,
    menus: [
      { title: "本棚", icon: "mdi-home", url: "/home" },
      { title: "書籍検索", icon: "mdi-magnify", url: "/search" }
    ]
  }),
  computed: {
    isLoginView() {
      return this.$route.path === "/login";
    }
  }
};
</script>
<style>
:root {
  --contents-color: rgba(76, 175, 80, 1);
  --white-color: rgba(242, 242, 242, 1);
  --dark-color: rgba(92, 115, 93, 1);
  --gray-color: rgba(115, 115, 115, 1);
  --accent-color: #acaf4c;
  --error-color: #ff6977;
  --info-color: #00a6ff;
}
.app-top {
  font-size: 16px;
}
.app-content {
  background: var(--white-color);
}
.app-title {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  color: var(--white-color);
  letter-spacing: 0.1em;
}
</style>
