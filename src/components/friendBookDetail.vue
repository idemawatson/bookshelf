<template>
  <v-dialog id="book-detail-modal" v-model="dialog">
    <v-card>
      <Book v-bind:book="{ ...book }"></Book>
      <v-card-text class="pa-2">
        <v-container class="pa-3 pt-0">
          <v-form>
            <v-textarea
              v-model="book.comment"
              class="pa-0"
              counter="100"
              rows="3"
              placeholder="感想・コメント"
              name="comment-textarea"
              readonly
            ></v-textarea>
            <v-checkbox v-model="book.completed" readonly class="ma-0" label="読んだ！" name="completed-check"></v-checkbox>
          </v-form>
          <v-row justify="space-around" class="pa-2">
            <v-btn name="update-btn" color="primary" @click.stop="close">OK</v-btn>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
import Book from "@/components/book";

export default {
  components: {
    Book
  },
  data: () => ({
    dialog: false
  }),
  methods: {
    open() {
      this.dialog = true;
    },
    close() {
      this.dialog = false;
    }
  },
  props: {
    book: {}
  }
};
</script>
