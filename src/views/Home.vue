<template>
  <div class="background">
    <div class="page-title pt-3">{{ user.displayName }}の本棚</div>
    <v-container class="shelf-container pa-5 pt-0" fluid>
      <v-carousel show-arrows-on-hover height="100%">
        <v-carousel-item v-for="part in partializedBooks" :key="part.index">
          <v-row>
            <v-col cols="4" sm="3" ml="3" lg="2" xl="2" v-for="book in part" :key="book.index">
              <v-card color="lighten">
                <v-img v-if="book.url" :src="book.url" aspect-ratio="0.8"></v-img>
                <div v-else class="alternative-book">{{ book.title }}</div>
              </v-card>
            </v-col>
          </v-row>
        </v-carousel-item>
        <Note ref="note"></Note>
        <Loading :active.sync="loading" :is-full-page="true" color="#4caf50"></Loading>
      </v-carousel>
    </v-container>
  </div>
</template>
<script>
import { mapState } from "vuex";
// import firebase from "@/plugins/firebase";
import Note from "@/components/notification";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  components: {
    Note,
    Loading
  },
  data: () => ({
    books: [],
    loading: false
  }),
  async created() {
    this.loading = true;
    // const getBooks = firebase.functions().httpsCallable("getBooks");
    try {
      // const response = await getBooks({ uid: this.user.uid });
      const response = await import("@/assets/sampleShelf.json");
      this.books = response?.data?.body;
    } catch (error) {
      if (error.code == "unauthenticated") {
        this.$router.push("/error");
      } else {
        this.$refs.note.error("エラーが発生しました");
      }
    }
    this.loading = false;
  },
  computed: {
    ...mapState(["user"]),
    partializedBooks() {
      const ret = this.books.reduce((newArr, _, i) => (i % 12 ? newArr : [...newArr, this.books.slice(i, i + 12)]), []);
      console.log(ret);
      return ret;
    }
  },
  methods: {}
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
