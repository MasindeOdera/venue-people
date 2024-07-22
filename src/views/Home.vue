<template>
  <div>
    <h1 class="h1-title">Venue People</h1>
    <Icon icon="home" />
    <Icon icon="settings" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Icon from "@/components/Icon.vue";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  components: { Icon },
});
</script>
