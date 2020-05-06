<template>
  <div class="background">
    <div class="page-title pt-3">{{ user.displayName }}の本棚</div>
    <v-container class="shelf-container pa-5 pt-0" fluid>
      <v-card v-if="books.length === 0" flat color="lighten" class="pa-3 mt-3">
        <v-card-text style="text-align: center; font-size: 16px; color: var(--gray-color);">
          <div>書籍がまだありません。</div>
          <div>書籍検索から追加してみましょう！</div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" to="/search">書籍を追加する</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
      <v-carousel v-else show-arrows-on-hover height="100%">
        <v-carousel-item v-for="part in partializedBooks" :key="part.index">
          <v-row>
            <v-col cols="4" sm="3" ml="3" lg="2" xl="2" v-for="book in part" :key="book.index">
              <v-card color="lighten" @click="openDetail(book)">
                <v-img v-if="book.url" :src="book.url" aspect-ratio="0.8"></v-img>
                <div v-else class="alternative-book">{{ book.title }}</div>
              </v-card>
            </v-col>
          </v-row>
        </v-carousel-item>
      </v-carousel>
      <Note ref="note"></Note>
      <Loading :active.sync="loading" :is-full-page="true" color="#4caf50" :opacity="1"></Loading>
    </v-container>
    <BookDetail ref="detail" :book="book" @update="update"></BookDetail>
  </div>
</template>
<script>
import { mapState } from "vuex";
import firebase from "@/plugins/firebase";
import Note from "@/components/notification";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import BookDetail from "@/components/bookDetail";
import code from "@/plugins/errorCode";

export default {
  components: {
    Note,
    Loading,
    BookDetail
  },
  data: () => ({
    books: [],
    book: Object,
    loading: false,
    dialog: false
  }),
  async created() {
    this.loading = true;
    const getBooks = firebase.functions().httpsCallable("getBooks");
    try {
      const response = await getBooks({ uid: this.user.uid });
      // const response = await import("@/assets/sampleShelf.json");
      this.books = response?.data?.body;
      this.loading = false;
    } catch (error) {
      if (error.code == "unauthenticated") {
        this.$router.push("/error");
      } else {
        this.loading = false;
        this.$router.path("/500");
      }
    }
  },
  computed: {
    ...mapState(["user"]),
    partializedBooks() {
      const ret = this.books.reduce((newArr, _, i) => (i % 12 ? newArr : [...newArr, this.books.slice(i, i + 12)]), []);
      return ret;
    }
  },
  methods: {
    openDetail(book) {
      this.book = { ...book };
      this.$refs.detail.open();
    },
    async update(data) {
      this.loading = true;
      const updateBook = firebase.functions().httpsCallable("updateBook");
      try {
        await updateBook(data);
        this.loading = false;
        this.$refs.note.info("更新しました");
        this.$router.go({ path: this.$router.currentRoute.path, force: true });
      } catch (error) {
        let e = "";
        switch (error.code) {
          case code.UNAUTHENTICATED:
            this.$router.push("/error");
            break;
          case code.NOT_FOUND:
            e = "データが見つかりませんでした";
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
.background {
  height: 100%;
  background-color: var(--white-color);
  color: var(--gray-color);
}
.shelf-container {
  height: 90%;
  background-color: var(--white-color);
}
.page-title {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 0.1em;
}
.alternative-book {
  height: 120px;
  width: 90px;
  font-weight: bold;
  color: var(--gray-color);
}
</style>
