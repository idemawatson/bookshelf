<template>
  <v-app class="appTop">
    <searchForm></searchForm>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import searchForm from "@/components/searchForm";
export default {
  name: "App",
  data: () => ({
    //
  }),
  components: {
    searchForm
  }
};
</script>
<style>
.appTop {
  font-size: 16px;
}
</style>
