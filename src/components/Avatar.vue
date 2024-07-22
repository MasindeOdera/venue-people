<template>
  <div :style="avatarStyle" class="avatar-container">
    <img :src="src" :alt="alt" class="avatar-img" />
    <div v-if="showIcon" class="avatar-icon">
      <slot name="icon"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Avatar",
  props: {
    src: {
      type: String as PropType<string>,
      required: true,
    },
    alt: {
      type: String as PropType<string>,
      default: "Avatar",
    },
    width: {
      type: [String, Number] as PropType<string | number>,
      default: "50px",
    },
    height: {
      type: [String, Number] as PropType<string | number>,
      default: "50px",
    },
    display: {
      type: String as PropType<string>,
      default: "block",
    },
    marginRight: {
      type: [String, Number] as PropType<string | number>,
      default: "0",
    },
    showIcon: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  setup(props) {
    const avatarStyle = computed(() => {
      return {
        width: props.width,
        height: props.height,
        display: props.display,
        marginRight: props.marginRight,
        position: "relative",
      };
    });

    return {
      avatarStyle,
    };
  },
});
</script>

<style scoped lang="scss">
.avatar-container {
  position: relative;
  border-radius: 50%;
  overflow: hidden;
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-icon {
  position: absolute;
  bottom: 5px;
  right: 5px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
