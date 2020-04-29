<template>
  <v-container>
    <v-card v-for="b in books" :key="b.index">{{ b }}</v-card>
    <Note ref="note"></Note>
  </v-container>
</template>
<script>
import { mapState } from "vuex";
import firebase from "@/plugins/firebase";
import Note from "@/components/notification";

export default {
  components: {
    Note
  },
  data: () => ({
    books: []
  }),
  async created() {
    const getBooks = firebase.functions().httpsCallable("getBooks");
    try {
      const response = await getBooks({ uid: firebase.auth().currentUser.uid });
      this.books = response?.data?.body;
    } catch (error) {
      if (error.code == "unauthenticated") {
        this.$router.push("/error");
      } else {
        this.$refs.note.error("エラーが発生しました");
      }
    }
  },
  computed: {
    ...mapState(["token", "userName"])
  },
  methods: {}
};
</script>
