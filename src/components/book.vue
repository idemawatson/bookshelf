<template>
  <v-card outlined class="book-area">
    <v-row class="mr-2 ml-2">
      <v-col cols="4">
        <v-img id="book-img" :src="book.url"></v-img>
      </v-col>
      <v-col cols="8">
        <div class="book-detail">
          <div class="book-title">{{ book.title }}</div>
          <div><span class="detail-caption">著者:</span> {{ book.authors }}</div>
          <v-row>
            <v-col cols="8" class="pt-0 pb-0 pr-0">
              <div><span class="detail-caption">発行日:</span> {{ book.publishedDate }}</div>
              <div><span class="detail-caption">ページ数:</span> {{ book.pageCount }}</div>
            </v-col>
            <v-col cols="4" class="pt-0 pb-0 pl-0">
              <slot name="activator"></slot>
            </v-col>
          </v-row>
          <div id="book-description" class="pt-1">{{ book.description }}</div>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
export default {
  props: {
    book: Object
  }
};
</script>
<style scoped>
.book-area {
  background-color: var(--white-color);
}
.book-detail {
  font-size: 12px;
}
.book-title {
  font-weight: bold;
  font-size: 16px;
}
.detail-caption {
  font-weight: bold;
}
</style>
