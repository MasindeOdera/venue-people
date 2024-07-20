<template>
  <div class="user-card">
    <img :src="user.image" alt="Avatar" class="avatar" />
    <div class="user-name">
      <h3 class="normal-prominent">{{ user.displayName }}</h3>
      <p class="tiny-thin">{{ user.fullName }}</p>
    </div>
    <div class="user-role">
      <p>{{ user.functionName }}</p>
    </div>
    <div class="user-email">
      <p>{{ user.email }}</p>
    </div>
    <div class="user-phone">
      <p>{{ user.phoneCountryPrefix }} {{ user.phoneNumber }}</p>
    </div>
    <div class="user-team">
      <span
        v-for="teamId in user.teamIds"
        :key="teamId"
        class="normal-prominent"
        :class="['team-color', `team-color-${teamId}`]"
        :style="{ backgroundColor: getTeamColor(teamId) }"
        >{{ getTeamLetter(teamId) }}</span
      >
    </div>
    <Button
      classList="btn-primary"
      icon="delete"
      @click="handleDelete"
    ></Button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { User } from "@/types/User";
import { Team } from "@/types/Team";
import Button from "@/components/Button.vue";

export default defineComponent({
  name: "UserCard",
  components: { Button },
  props: {
    user: {
      type: Object as PropType<User>,
      required: true,
    },
    teams: {
      type: Array as PropType<Team[]>,
      required: true,
    },
  },
  methods: {
    handleDelete() {
      this.$emit("delete", this.user.id);
    },
    getTeamColor(teamId: number): string {
      const team = this.teams.find((team) => team.id === teamId);
      return team ? team.color : "#000000"; // Default to black if team not found.
    },
    getTeamLetter(teamId: number): string {
      const team = this.teams.find((team) => team.id === teamId);
      return team ? team.abbreviation : ""; // Display abbreviation in team circle.
    },
  },
});
</script>

<style scoped lang="scss">
.user-card {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #d2d2d2;
  padding: 10px;

  .avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 10px;
  }

  .user-name {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 150px;
    padding-right: 5%;
  }

  .user-role {
    width: 150px;
    padding-right: 5%;
  }

  .user-email {
    width: 180px;
    padding-right: 5%;
  }

  .user-phone {
    width: 180px;
    padding-right: 5%;
  }

  .user-team {
    margin-left: auto;
    padding-right: 10px;
    display: flex;

    .team-color {
      width: 28px;
      height: 28px;
      border-radius: 48%;
      margin-right: -8px;
      border: 1px solid #000000;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #000000;
      text-align: center;
    }
  }

  // Adjust default style of button to mimic design.
  .btn-primary {
    margin-left: 10px;
    width: 48px;
    height: 48px;
    padding: unset;
    background-color: transparent;
  }

  .user-role,
  .user-email,
  .user-phone,
  .user-team {
    > p {
      display: flex;
    }
  }

  .user-name h3,
  .user-name p {
    margin: 0;
    color: #666;
  }
}
// Hide the border for the last user-card.
.user-card:last-child {
  border-bottom: none;
}
</style>
