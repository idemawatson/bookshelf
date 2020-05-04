<template>
  <v-dialog id="book-detail-modal" v-model="dialog">
    <v-card>
      <Book v-bind:book="{ ...book }"></Book>
      <v-card-text class="pa-2">
        <v-container class="pa-3 pt-0">
          <v-form ref="book">
            <v-textarea
              v-model="book.comment"
              :rules="commentRules"
              class="pa-0"
              counter="100"
              rows="3"
              clearable
              placeholder="感想・コメント"
              name="comment-textarea"
            ></v-textarea>
            <v-checkbox v-model="book.completed" class="ma-0" label="読んだ！" name="completed-check"></v-checkbox>
          </v-form>
          <v-row justify="space-around" class="pa-2">
            <v-btn name="update-btn" color="primary" @click.stop="update">OK</v-btn>
            <v-btn name="close-btn" color="primary" @click.stop="close">CANCEL</v-btn>
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
    dialog: false,
    commentRules: [v => !v || (v && v.length <= 100) || "100文字を超えています"]
  }),
  methods: {
    open() {
      this.dialog = true;
    },
    update() {
      if (!this.$refs.book.validate()) return;
      this.$emit("update", {
        id: this.book.id,
        uid: this.book.user,
        comment: this.book.comment,
        completed: this.book.completed
      });
      this.close();
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
