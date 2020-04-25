<template>
  <v-card outlined class="book-area">
    <v-row class="mr-2 ml-2">
      <v-col cols="4">
        <v-img :src="url"></v-img>
      </v-col>
      <v-col cols="8">
        <div class="book-detail">
          <div class="book-title">{{ title }}</div>
          <div><span class="detail-caption">著者:</span> {{ authors }}</div>
          <div>
            <span class="detail-caption">発行日:</span> {{ publishedDate }}
          </div>
          <div>
            <span class="detail-caption">ページ数:</span> {{ pageCount }}
          </div>
          <div class="pt-1">{{ description }}</div>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
export default {
  props: {
    title: String,
    authors: String,
    publishedDate: String,
    pageCount: Number,
    url: String,
    description: String
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
