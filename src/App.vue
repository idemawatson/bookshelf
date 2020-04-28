<template>
  <v-app class="app-top">
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
  --gray-color: rgba(115, 115, 115, 1);
  --accent-color: #acaf4c;
  --error-color: #ff6977;
  --info-color: #00a6ff;
}
.app-top {
  font-size: 16px;
}
</style>
