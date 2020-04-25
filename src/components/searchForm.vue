<template>
  <v-card absolute color="rgba(76, 175, 80, 1.0)" id="searchBar" class="pa-3">
    <div class="app-title">Bookshelf</div>
    <form id="search-form" class="mt-1 mb-1">
      <input
        id="term-field"
        class="pa-1 pl-4"
        type="text"
        v-model="searchWord"
        placeholder="キーワードを入力"
      />
      <v-icon medium class="term-clear" @click="searchWord = ''"
        >mdi-close</v-icon
      >
      <input
        type="button"
        id="search-btn"
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
.app-title {
  text-align: center;
  font-size: 32px;
  font-weight: bold;
  color: var(--white-color);
  letter-spacing: 0.1em;
}
#search-form {
  position: relative;
  text-align: center;
}
#term-field {
  width: 80%;
  border-radius: 20px;
  outline: 0;
  background: var(--white-color);
}
.term-clear {
  position: absolute;
  top: 10%;
  right: 26%;
  color: var(--dark-color);
}
#search-btn {
  position: absolute;
  right: 10%;
  background: var(--dark-color);
  color: var(--white-color);
  border-radius: 0 20px 20px 0;
  height: 100%;
  width: 15%;
}
</style>
