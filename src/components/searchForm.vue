<template>
  <div>
    <form id="search-form" class=" mb-1">
      <input id="term-field" class="pa-1 pl-4" type="text" v-model="searchWord" :placeholder="placeholder" />
      <v-icon name="clear-icon" medium class="term-clear" @click="clear">mdi-clear</v-icon>
      <input type="button" id="search-btn" value="検索" @click="$emit('search', searchWord)" />
    </form>
  </div>
</template>
<script>
export default {
  data: () => ({
    searchWord: ""
  }),
  methods: {
    clear() {
      this.searchWord = "";
    }
  },
  props: {
    placeholder: String
  }
};
</script>
<style scoped>
.app-title {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  color: var(--white-color);
  letter-spacing: 0.1em;
}
#search-form {
  position: relative;
  text-align: center;
}
#term-field {
  width: 100%;
  border-radius: 20px;
  font-size: 15px;
  outline: 0;
  background: white;
  border: solid 3px var(--gray-color);
  filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.3));
  height: 3em;
}
.term-clear {
  position: absolute;
  top: 25%;
  right: 16%;
  color: var(--gray-color);
}
#search-btn {
  position: absolute;
  right: 0%;
  background: var(--dark-color);
  color: var(--white-color);
  border-radius: 0 20px 20px 0;
  height: 100%;
  width: 15%;
}
</style>
