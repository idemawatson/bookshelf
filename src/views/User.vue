<template>
  <v-container style="height:100%;">
    <v-row justify="center" style="min-height:20%">
      <v-col cols="10" lg="8" xl="8">
        <v-card flat color="lighten" min-height="100%">
          <div>{{ $store.state.user.displayName }}</div></v-card
        >
      </v-col>
    </v-row>
    <v-row justify="center">
      <Card title="レベル" :value="user.level"></Card>
      <Card title="読んだ本" :value="bookCount"></Card>
    </v-row>
    <v-row justify="center">
      <Card title="経験値" :value="user.progress"></Card>
      <Card title="ID" :value="$store.state.user.uid"></Card>
    </v-row>
    <Note ref="note"></Note>
    <Loading :active.sync="loading" :is-full-page="true" color="#4caf50"></Loading>
  </v-container>
</template>
<script>
// import firebase from "@/plugins/firebase";
import Card from "@/components/profileCard";
import Note from "@/components/notification";
import Loading from "vue-loading-overlay";
import code from "@/plugins/errorCode";

export default {
  components: {
    Card,
    Note,
    Loading
  },
  data: () => ({
    loading: false,
    user: {}
  }),
  computed: {
    bookCount() {
      return this.user.bookCount + "冊";
    }
  },
  async created() {
    this.loading = true;
    // const getUserInfo = firebase.functions().httpsCallable("getUserInfo");
    try {
      // const user = await getUserInfo({ uid: this.$store.state.user.uid });
      const user = await import("@/assets/sampleUser.json");
      this.user = user.data?.body;
      this.loading = false;
    } catch (error) {
      let e = "";
      console.log(error.code);
      switch (error.code) {
        case code.UNAUTHORIZED:
          this.$router.push("/error");
          return;
        case code.NOT_FOUND:
          e = "ユーザーが見つかりませんでした";
          break;
        case code.DATA_LOSS:
          e = "データが不正です";
          break;
        default:
          e = "通信エラーが発生しました";
      }
      this.loading = false;
      this.$refs.note.error(e);
    }
  }
};
</script>
