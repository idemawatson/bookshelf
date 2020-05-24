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
            <v-row>
              <v-col cols="8">
                <v-checkbox v-model="book.completed" class="ma-0" label="読んだ！" name="completed-check"></v-checkbox>
              </v-col>
              <v-col cols="4">
                <v-btn color="error" depressed small @click.stop="confirm = true"><v-icon>mdi-delete</v-icon></v-btn>
              </v-col>
            </v-row>
          </v-form>
          <v-dialog v-model="confirm" max-width="500px">
            <v-card class="pa-4">
              <v-card-text>
                <div class="delete-confirm">本棚から削除しますか？</div>
              </v-card-text>
              <v-row justify="space-around" class="pa-2">
                <v-btn @click.stop="deleteBook" color="error">削除</v-btn>
                <v-btn @click.stop="confirm = false" dark color="gray">キャンセル</v-btn>
              </v-row>
            </v-card>
          </v-dialog>
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
    confirm: false,
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
    },
    deleteBook() {
      this.$emit("deleteBook", this.book.id);
    }
  },
  props: {
    book: {}
  }
};
</script>
<style scoped>
.delete-confirm {
  font-size: 16px;
  font-weight: bold;
  color: var(--gray-color);
}
</style>