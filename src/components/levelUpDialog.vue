<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-text class="pa-2">
          <v-card-title class="headline-levelup">Level UP!!!</v-card-title>
          <v-card-text class="detail-levelup">
            <div>読書レベルが</div>
            <div class="level-info ma-2">
              <span>{{ beforeLevel }}</span>
              <span style="color: var(--gray-color); font-size:16px;"> から </span>
              <span>{{ level }}</span>
            </div>
            <div>にアップしました！</div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn name="close-btn" color="primary" @click.stop="close">OK</v-btn>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  data: () => ({
    dialog: false
  }),
  props: {
    beforeLevel: Number,
    level: Number
  },
  methods: {
    open() {
      this.dialog = true;
    },
    close() {
      this.dialog = false;
    }
  }
};
</script>
<style scoped>
.headline-levelup {
  font-weight: bold;
  font-size: 32px;
  color: var(--contents-color);
}
.detail-levelup {
  font-weight: bold;
  font-size: 16px;
  white-space: pre-wrap;
}
.level-info {
  font-size: 24px;
  color: var(--error-color);
}
</style>
