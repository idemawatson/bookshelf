<template>
  <v-dialog v-model="dialog" persistent max-width="500px">
    <v-card v-if="isFoundUser" class="pa-3">
      <v-card-title class="pa-3">
        <div class="title-confirm">友達に追加しますか？</div>
        <div class="warn-confirm">※追加すると本棚が閲覧できます。</div>
      </v-card-title>
      <v-card-text class="pa-0">
        <div class="user-info pa-4 ma-4 mt-2">
          <span class="title-confirm" style="font-size:16px;">ユーザー名: </span
          ><span class="user-name">{{ user.name }}</span>
        </div>
        <v-row justify="space-around" class="pa-2">
          <v-btn name="ok-btn" color="primary" dark @click.stop="follow">OK</v-btn>
          <v-btn name="cancel-btn" color="gray" dark @click.stop="close">CANCEL</v-btn>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card v-else class="pb-3 pt-3">
      <v-card-title>
        <div class="title-confirm">ユーザーが見つかりません。</div>
      </v-card-title>
      <v-card-text>
        <div class="warn-confirm" style="font-size: 16px;">※IDを確認してください。</div>
      </v-card-text>
      <v-card-actions class="mt-3" style="text-align:center;">
        <v-spacer></v-spacer>
        <v-btn dark color="primary" @click="close()">OK</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  data: () => ({
    dialog: false
  }),
  props: {
    user: {}
  },
  methods: {
    follow() {
      this.$emit("follow");
      this.close();
    },
    close() {
      this.dialog = false;
    },
    open() {
      this.dialog = true;
    }
  },
  computed: {
    isFoundUser() {
      return this.user !== null;
    }
  }
};
</script>
<style scoped>
.title-confirm {
  font-weight: bold;
  color: var(--gray-color);
}
.warn-confirm {
  font-weight: bold;
  color: var(--error-color);
  font-size: 12px;
}
.user-info {
  border: solid 1px var(--gray-color);
  border-radius: 10px;
}
.user-name {
  font-size: 16px;
  font-weight: bold;
  color: var(--contents-color);
}
</style>
