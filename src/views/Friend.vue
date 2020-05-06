<template>
  <v-container fluid>
    <v-card flat color="lighten">
      <v-card-text>
        <v-row justify="center">
          <v-col cols="5" sm="3" md="3" lg="2" xl="2" class="pa-0 pt-3 pb-2">
            <div class="page-title">フレンド</div>
          </v-col>
          <v-col cols="1" class="pa-0 ma-0 mb-4">
            <v-btn small class="mx-2" fab dark color="primary">
              <v-icon @click="switchsearch">mdi-magnify</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <transition name="fade">
      <v-card v-if="show" flat color="lighten mb-5">
        <v-row justify="center">
          <v-col cols="12" sm="10" md="6" lg="6" xl="6">
            <SearchForm ref="search" :placeholder="placeholder" @search="search" style="width: 100%;"></SearchForm>
          </v-col>
        </v-row>
      </v-card>
    </transition>
    <v-card v-if="friends.length === 0" flat color="lighten" class="pa-3 mt-3">
      <v-card-text style="text-align: center; font-weight: bold; font-size: 16px; color: var(--gray-color);">
        <div>フレンドがいません</div>
        <div>ユーザーIDで検索してみましょう。</div>
      </v-card-text>
    </v-card>
    <v-row justify="center">
      <FriendCard v-for="friend in friends" :key="friend.index" :user="friend">
        <template v-slot:activator>
          <v-col cols="4"><v-btn color="primary" raised dark>本棚</v-btn></v-col>
        </template>
      </FriendCard>
    </v-row>
    <ConfirmDialog ref="dialog" :user="searchResult" @follow="follow"></ConfirmDialog>
    <Note ref="note"></Note>
    <Loading :active.sync="loading" :is-full-page="true" color="#4caf50"></Loading>
  </v-container>
</template>
<script>
import SearchForm from "@/components/searchForm";
import FriendCard from "@/components/friendCard";
import ConfirmDialog from "@/components/friendConfirmDialog";
import firebase from "@/plugins/firebase";
import Note from "@/components/notification";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import code from "@/plugins/errorCode";

export default {
  components: {
    SearchForm,
    FriendCard,
    ConfirmDialog,
    Note,
    Loading
  },
  data: () => ({
    placeholder: "UserIDを入力",
    show: false,
    friends: [],
    searchResult: null,
    loading: false
  }),
  async created() {
    this.loading = true;
    try {
      const friends = await firebase.functions().httpsCallable("getFriends")({ uid: this.$store.state.user.uid });
      this.friends = friends.data;
      this.loading = false;
    } catch (error) {
      let e = "";
      switch (error.code) {
        case code.UNAUTHENTICATED:
          this.$router.push("/error");
          break;
        default:
          this.$router.path("/500");
      }
      this.loading = false;
      this.$refs.note.error(e);
    }
  },
  methods: {
    switchsearch() {
      this.show = !this.show;
    },
    async search(searchWord) {
      this.searchResult = null;
      this.$refs.search.clear();
      if (this.$store.state.user.uid == searchWord) {
        this.$refs.note.error("自身のユーザーIDです");
        return;
      }
      const searchUser = firebase.functions().httpsCallable("searchUser");
      this.loading = true;
      try {
        const result = await searchUser({ uid: this.$store.state.user.uid, searchId: searchWord });
        if (!result.data) {
          this.searchResult = null;
        } else {
          this.searchResult = result.data;
        }
        this.loading = false;
        this.$refs.dialog.open();
      } catch (error) {
        let e = "";
        switch (error.code) {
          case code.UNAUTHENTICATED:
            this.$router.push("/error");
            break;
          case code.INVALID_ARGUMENT:
            e = "無効なリクエストです";
            break;
          default:
            e = "エラーが発生しました";
        }
        this.loading = false;
        this.$refs.note.error(e);
      }
    },
    async follow() {
      const addFriend = firebase.functions().httpsCallable("addFriend");
      this.loading = true;
      try {
        await addFriend({ uid: this.$store.state.user.uid, friend: this.searchResult.id });
        this.loading = false;
        this.$refs.note.info(`${this.searchResult.name}: フレンドに追加しました。`);
      } catch (error) {
        let e = "";
        switch (error.code) {
          case code.UNAUTHENTICATED:
            this.$router.push("/error");
            break;
          case code.INVALID_ARGUMENT:
            e = "無効なリクエストです";
            break;
          case code.NOT_FOUND:
            e = "データが見つかりません";
            break;
          default:
            e = "エラーが発生しました";
        }
        this.loading = false;
        this.$refs.note.error(e);
      }
    }
  }
};
</script>
<style scoped>
.page-title {
  text-align: center;
  color: var(--gray-color);
  letter-spacing: 0.1em;
  font-size: 32px;
  font-weight: bold;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}
.fade-enter,
.fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
