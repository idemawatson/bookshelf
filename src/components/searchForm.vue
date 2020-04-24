<template>
  <v-card absolute color="rgba(76, 175, 80, 1.0)" id="searchBar" class="pa-2">
    <div class="appTitle">bookshelf</div>
    <div id="searchField">
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="searchWord"
            class="mt-2"
            label="search"
            hide-details
            dense
            solo
            color="white"
            append-icon="mdi-magnify"
          >
            <template v-slot:append-outer>
              <v-btn v-on="$emit('search', searchWord)">
                検索
              </v-btn>
            </template>
          </v-text-field>
        </v-col>
      </v-row>
    </div>
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
  color: white;
  letter-spacing: 0.05em;
}
#searchField {
  max-width: 90%;
  text-align: center;
  margin: auto !important;
}
</style>
