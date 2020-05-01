<template>
  <v-container style="height:100%;">
    <v-row justify="center">
      <v-col cols="10" lg="8" xl="8">
        <v-card flat class="pb-0 mb-0" color="lighten" min-height="100%">
          <div class="user-name">
            <span style="font-size: 32px;">{{ $store.state.user.displayName }}</span>
            <span style="font-size: 16px;">さん</span>
          </div>
          <v-text-field
            v-model="$store.state.user.uid"
            outlined
            readonly
            label="User ID"
            background-color="white"
            style="font-size: 15px"
          ></v-text-field>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <Card title="読書レベル" :value="String(user.level)" fontSize="large">
        <template v-slot:additional>
          <div>
            <v-progress-linear :value="user.progress" height="10px" class="linear-bar"></v-progress-linear>
            <div class="linear-detail pt-1">次のレベルまで{{ user.rest }}ページ</div>
          </div>
        </template>
      </Card>
      <Card title="読んだ本" :value="bookCount"></Card>
      <Card title="総読書量" :value="pageCount"></Card>
    </v-row>
    <LevelUp ref="levelUp" :level="user.level" :beforeLevel="user.beforeLevel"></LevelUp>
    <Note ref="note"></Note>
    <Loading :active.sync="loading" :is-full-page="true" color="#4caf50" :opacity="1"></Loading>
  </v-container>
</template>
<script>
import firebase from "@/plugins/firebase";
import Card from "@/components/profileCard";
import LevelUp from "@/components/levelUpDialog";
import Note from "@/components/notification";
import Loading from "vue-loading-overlay";
import code from "@/plugins/errorCode";

export default {
  components: {
    Card,
    LevelUp,
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
    },
    pageCount() {
      return this.user.pageCount + "ページ";
    }
  },
  async created() {
    this.loading = true;
    const getUserInfo = firebase.functions().httpsCallable("getUserInfo");
    try {
      const user = await getUserInfo({ uid: this.$store.state.user.uid });
      // const user = await import("@/assets/sampleUser.json");
      this.user = user.data?.body;
      this.loading = false;
      if (this.user.beforeLevel < this.user.level) this.$refs.levelUp.open();
    } catch (error) {
      let e = "";
      console.log(error);
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
<style scoped>
.user-name {
  font-weight: bold;
  color: var(--gray-color);
  text-align: center;
}
.linear-bar {
  width: 100%;
  margin: auto;
}
.linear-detail {
  text-align: right;
  color: var(--gray-color);
  font-size: 12px;
}
</style>
