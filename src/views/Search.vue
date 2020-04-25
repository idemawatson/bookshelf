<template>
  <div>
    <div>
      <searchForm @search="search"></searchForm>
      <div v-for="r in result" :key="r.index">{{ r }}</div>
    </div>
    <Note ref="note"></Note>
  </div>
</template>
<script>
import searchForm from "@/components/searchForm";
import Note from "@/components/notification";
import axios from "axios";
export default {
  components: {
    searchForm,
    Note
  },
  data: () => ({
    result: []
  }),
  methods: {
    async search(searchWord) {
      if (searchWord.length === 0) return;
      try {
        const url =
          "https://www.googleapis.com/books/v1/volumes?q=" + searchWord;
        const res = await axios.get(encodeURI(url));
        const items = res.data?.items;
        for (const item of items) {
          this.result.push(item.volumeInfo?.title);
        }
      } catch (error) {
        this.$refs.note.error("通信エラーが発生しました。");
      }
    }
  }
};
</script>
