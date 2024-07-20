<template>
  <img :src="src" alt="Avatar" class="avatar" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Avatar",
  props: {
    src: {
      type: String,
      required: true,
    },
  },
});
</script>

<style scoped>
.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
</style>
