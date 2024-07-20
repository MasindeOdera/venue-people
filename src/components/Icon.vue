<template>
  <span class="material-icons">{{ icon }}</span>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Icon",
  props: {
    icon: {
      type: String,
      required: true,
    },
  },
});
</script>

<style scoped>
.material-icons {
  font-size: 24px; /* Adjust the size as needed */
  vertical-align: middle;
}
</style>
