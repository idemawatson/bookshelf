<template>
  <div>
    <searchForm @search="search"></searchForm>
    <div v-for="r in result" :key="r.index">{{ r }}</div>
  </div>
</template>
<script>
import searchForm from "@/components/searchForm";
import axios from "axios";
export default {
  components: {
    searchForm
  },
  data: () => ({
    result: []
  }),
  methods: {
    async search(searchWord) {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/books/v1/volumes?q=" + searchWord
        );
        for (const item in res.items) {
          this.result.push(item.volumeInfo?.title);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
