<template>
  <v-container>
    <v-card v-for="b in books" :key="b.index">{{ b }}</v-card>
    <Note ref="note"></Note>
    <Loading
      :active.sync="loading"
      :is-full-page="true"
      color="#f2f2f2"
      background-color="#4caf50"
      :opacity="1"
    ></Loading>
  </v-container>
</template>
<script>
import { mapState } from "vuex";
import firebase from "@/plugins/firebase";
import Note from "@/components/notification";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  components: {
    Note,
    Loading
  },
  data: () => ({
    books: [],
    loading: false
  }),
  async created() {
    this.loading = true;
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
    this.loading = false;
  },
  computed: {
    ...mapState(["token", "userName"])
  },
  methods: {}
};
</script>
