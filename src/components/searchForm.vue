<template>
  <v-card absolute color="rgba(76, 175, 80, 1.0)" id="searchBar" class="pa-2">
    <div class="appTitle">bookshelf</div>
    <form id="searchForm" class="mt-1 mb-1">
      <input
        id="termField"
        class="pa-1 pl-4"
        type="text"
        v-model="searchWord"
        placeholder="キーワードを入力"
      />
      <input
        type="button"
        id="searchBtn"
        value="検索"
        @click="$emit('search', searchWord)"
      />
    </form>
  </v-card>
</template>
<script>
export default {
  data: () => ({
    searchWord: ""
  })
};
</script>
<style scoped>
.appTitle {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  color: var(--white-color);
  letter-spacing: 0.05em;
}
#searchForm {
  position: relative;
  text-align: center;
}
#termField {
  width: 80%;
  border-radius: 20px;
  outline: 0;
  background: var(--white-color);
}
#searchBtn {
  position: absolute;
  right: 10%;
  background: var(--dark-color);
  color: var(--white-color);
  border-radius: 0 20px 20px 0;
  height: 100%;
  width: 15%;
}
</style>
