<template>
  <button :class="['btn', buttonType, classList]" @click="handleClick">
    <Icon v-if="icon" :icon="icon" />
    <span><slot></slot></span>
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
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
    buttonType: {
      type: String as PropType<"white-on-black" | "black-on-white">,
      default: "primary",
    },
  },
  methods: {
    handleClick(event: Event) {
      this.$emit("click", event);
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

.white-on-black {
  width: 148px;
  height: 40px;
  padding: 4px 24px;
  border-radius: 999px;
  border: 1px 0px 0px 0px;
  opacity: 0px;
  background: #000000;
  color: #ffffff;
}

.black-on-white {
  width: 148px;
  height: 40px;
  padding: 4px 24px;
  border-radius: 999px;
  border: 1px 0px 0px 0px;
  opacity: 0px;
  background: #efefef;
  color: #000000;
}
</style>
