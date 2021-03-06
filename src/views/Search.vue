<template>
  <div>
    <v-card class="pb-3 search-form" :class="formPosition" flat color="lighten">
      <h3 class="page-title pt-3 pb-3">書籍検索</h3>
      <searchForm @search="search" :placeholder="placeholder"></searchForm>
    </v-card>
    <Book v-for="r in results" :key="r.index" v-bind:book="r">
      <template v-slot:activator>
        <v-btn @click="addBookToShelf(r)" class="mt-1 mb-2" small dark color="primary">本棚へ</v-btn>
      </template>
    </Book>
    <Note ref="note"></Note>
    <Loading :active.sync="loading" :is-full-page="true" color="#4caf50"></Loading>
  </div>
</template>
<script>
import searchForm from "@/components/searchForm";
import Note from "@/components/notification";
import Book from "@/components/book";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import axios from "axios";
import firebase from "@/plugins/firebase";

export default {
  components: {
    searchForm,
    Note,
    Book,
    Loading
  },
  data: () => ({
    results: [],
    loading: false,
    placeholder: "キーワードを入力"
  }),
  methods: {
    async search(searchWord) {
      this.results = [];
      if (searchWord.length === 0) return;
      this.loading = true;
      try {
        const url = "https://www.googleapis.com/books/v1/volumes?q=" + searchWord;
        const res = await axios.get(encodeURI(url));
        // const res = await import("@/assets/sampleSearchResult.json");
        const items = res.data?.items;
        for (const item of items) {
          const info = item.volumeInfo;
          if (!info?.description) continue;
          this.results.push({
            id: item.id,
            title: info?.title,
            authors: info?.authors?.join(","),
            url: info?.imageLinks?.smallThumbnail,
            publishedDate: info?.publishedDate,
            pageCount: info?.pageCount,
            description: info?.description < 100 ? info?.description : info?.description?.substr(0, 69) + "..."
          });
        }
        this.loading = false;
      } catch (error) {
        this.loading = false;
        console.log(error);
        this.$refs.note.error("通信エラーが発生しました");
      }
    },
    async addBookToShelf(book) {
      this.loading = true;
      book.uid = this.$store.state.user.uid;
      const addBookToShelf = firebase.functions().httpsCallable("addBookToShelf");
      try {
        await addBookToShelf(book);
        this.loading = false;
        this.$refs.note.info("本棚に追加しました");
      } catch (error) {
        let e = "";
        switch (error.code) {
          case "unauthorized":
            this.$router.push("/error");
            return;
          case "invalid-argument":
            e = "不正なリクエストです";
            break;
          case "already-exists":
            e = "既に登録済みです";
            break;
          default:
            e = "通信エラーが発生しました";
        }
        this.loading = false;
        this.$refs.note.error(e);
      }
    }
  },
  computed: {
    formPosition() {
      if (this.results.length == 0) {
        return "center-card";
      }
      return "";
    }
  }
};
</script>
<style scoped>
.page-title {
  text-align: center;
  color: var(--gray-color);
  letter-spacing: 0.1em;
}
.search-form {
  width: 80%;
  margin: auto;
}
.center-card {
  position: absolute;
  top: 40%;
}
</style>
