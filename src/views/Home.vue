<template>
  <v-container>
    <v-card>{{ books }}</v-card>
  </v-container>
</template>
<script>
import { mapState } from "vuex";
import { functions } from "@/main.js";

export default {
  data: () => ({
    books: [],
    database: null
  }),
  async created() {
    const getBooks = functions.httpsCallable("getBooks");
    this.books = await getBooks();
  },
  computed: {
    ...mapState(["token", "userName"])
  },
  methods: {}
};
</script>
