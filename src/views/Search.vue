<template>
  <div>
    <v-card class="pb-3" :class="formPosition" flat color="lighten">
      <h3 class="page-title pt-3 pb-3">書籍検索</h3>
      <searchForm @search="search"></searchForm>
    </v-card>
    <Book v-for="r in results" :key="r.index" v-bind="r"></Book>
    <Note ref="note"></Note>
  </div>
</template>
<script>
import searchForm from "@/components/searchForm";
import Note from "@/components/notification";
import Book from "@/components/book";
import axios from "axios";

export default {
  components: {
    searchForm,
    Note,
    Book
  },
  data: () => ({
    results: []
  }),
  methods: {
    async search(searchWord) {
      this.results = [];
      if (searchWord.length === 0) return;
      try {
        const url = "https://www.googleapis.com/books/v1/volumes?q=" + searchWord;
        const res = await axios.get(encodeURI(url));
        // const res = await import("@/assets/sampleSearchResult.json");
        const items = res.data?.items;
        for (const item of items) {
          const info = item.volumeInfo;
          if (!info?.description) continue;
          this.results.push({
            title: info?.title,
            authors: info?.authors?.join(","),
            url: info?.imageLinks?.smallThumbnail,
            publishedDate: info?.publishedDate,
            pageCount: info?.pageCount,
            description: info?.description < 100 ? info?.description : info?.description?.substr(0, 69) + "..."
          });
        }
      } catch (error) {
        this.$refs.note.error("通信エラーが発生しました。");
        console.log(error);
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
.center-card {
  position: absolute;
  width: 100%;
  top: 40%;
}
</style>
