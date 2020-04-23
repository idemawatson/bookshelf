<template>
  <v-container>
    <v-card v-for="b in books" :key="b.index">{{ b }}</v-card>
    <v-card>{{ error }}</v-card>
  </v-container>
</template>
<script>
import { mapState } from "vuex";
import firebase from "@/plugins/firebase";

export default {
  data: () => ({
    books: [],
    error: null
  }),
  async created() {
    this.error = null;
    const getBooks = firebase.functions().httpsCallable("getBooks");
    try {
      const response = await getBooks();
      this.books = response?.data?.body;
    } catch (error) {
      this.error = error;
    }
  },
  computed: {
    ...mapState(["token", "userName"])
  },
  methods: {}
};
</script>
