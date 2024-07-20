<template>
  <div class="team-badge">
    <span class="color-circle" :style="{ backgroundColor: team.color }"></span>
    <h1 class="big-prominent">{{ team.name }}</h1>
    <Icon icon="edit_note" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Team } from "@/types/Team";
import Icon from "@/components/Icon.vue";

export default defineComponent({
  name: "TeamBadge",
  components: { Icon },
  props: {
    team: {
      type: Object as PropType<Team>,
      required: true,
    },
  },
});
</script>

<style scoped>
.team-badge {
  display: flex;
  align-items: flex-start;
  width: 260px;
  height: 40px;
  padding: 16px 8px;
  background-color: #efefef;
  margin-right: 8px;

  .color-circle {
    width: 44px;
    height: 44px;
    border-radius: 48%;
    margin-right: 5px;
  }

  .material-icons {
    margin-top: 8px;
    margin-left: auto;
    padding-right: 10px;
    cursor: pointer;
  }
}
</style>
