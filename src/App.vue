<template>
  <v-app class="appTop">
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    //
  })
};
</script>
<style>
:root {
  --contents-color: rgba(76, 175, 80, 1);
  --white-color: rgba(242, 242, 242, 1);
  --dark-color: rgba(92, 115, 93, 1);
}
.appTop {
  font-size: 16px;
}
</style>
