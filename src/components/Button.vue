<template>
  <button class="btn" :class="classList" @click="$emit('click')">
    <Icon v-if="icon" :icon="icon" />
    <span><slot></slot></span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Icon from "@/components/Icon.vue";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Button",
  components: { Icon },
  props: {
    classList: {
      type: String,
      default: "btn",
    },
    icon: {
      type: String,
      default: "",
    },
  },
});
</script>

<style scoped>
.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.btn .material-icons {
  margin-right: 8px; /* Adjust spacing as needed */
}
</style>
