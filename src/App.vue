<template>
  <v-app class="app-top">
    <v-content class="app-content">
      <div v-if="needBar">
        <Header @openNav="drawer = true"></Header>
        <v-navigation-drawer app v-model="drawer" temporary dark color="primary">
          <v-list-item>
            <v-list-item-title class="app-title" style="text-align: left">
              Bookshelf
            </v-list-item-title>
            <v-btn icon name="chevron" @click.stop="close">
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
          </v-list-item>
          <v-divider />
          <v-list nav>
            <v-list-item v-for="menu in menus" :key="menu.title" :to="menu.url" @click.stop="close" :name="menu.icon">
              <div>
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
      { title: "書籍検索", icon: "mdi-magnify", url: "/search" },
      { title: "プロフィール", icon: "mdi-account", url: "/user" }
    ]
  }),
  computed: {
    needBar() {
      const fullViewList = ["/login", "/error"];
      return !fullViewList.includes(this.$route.path);
    }
  },
  methods: {
    close() {
      this.drawer = false;
    }
  }
};
</script>
<style>
@import url("~@/css/app.css");
</style>
