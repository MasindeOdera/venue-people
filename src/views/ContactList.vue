<template>
  <div class="contact-category">
    <h1 class="h1-title">Venue People</h1>
    <p class="tiny-thin">Teams</p>
    <div class="teams-section">
      <TeamBadge v-for="team in teams" :key="team.id" :team="team" />
    </div>
    <div class="new"><Icon icon="add" /> <a href="/">New Team</a></div>
    <p class="tiny-thin">People</p>
    <div class="list">
      <UserCard
        v-for="user in users"
        :key="user.id"
        :user="user"
        :teams="teams"
        @delete="deleteUser"
      />
    </div>
    <div class="new"><Icon icon="add" /> <a href="/">New User</a></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import UserCard from "@/components/UserCard.vue";
import TeamBadge from "@/components/TeamBadge.vue";
import Icon from "@/components/Icon.vue";
import UserService from "@/services/UserService";
import { User } from "@/types/User";
import { Team } from "@/types/Team";

export default defineComponent({
  name: "ContactList",
  components: { UserCard, TeamBadge, Icon },
  setup() {
    const users = ref<User[]>([]);
    const teams = ref<Team[]>([]);

    const fetchUsers = async () => {
      try {
        const data = await UserService.getUsers();
        users.value = data;
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    const fetchTeams = async () => {
      try {
        const data = await UserService.getTeams();
        teams.value = data;
      } catch (error) {
        console.error("Failed to fetch teams:", error);
      }
    };

    const deleteUser = async (userId: number) => {
      try {
        await UserService.deleteUser(userId);
        users.value = users.value.filter((user) => user.id !== userId);
      } catch (error) {
        console.error("Failed to delete user:", error);
      }
    };

    onMounted(() => {
      fetchUsers();
      fetchTeams();
    });

    return { users, teams, deleteUser };
  },
});
</script>

<style scoped lang="scss">
.contact-category {
  margin: auto 20px;

  > .tiny-thin {
    text-transform: uppercase;
    padding: 0px 16px;
  }

  > .new {
    display: flex;
    align-items: center;
    height: 48px;
    margin-bottom: 48px;

    > .material-icons {
      text-decoration: none;
    }
  }

  header {
    display: flex;
    color: #5f5f5f;
    padding: 16px 0px;
  }

  .teams-section {
    display: flex;
    margin-bottom: 10px;
  }

  .list {
    border: 1px solid #d2d2d2;
    border-radius: 16px;
    margin: 8px auto;
  }
}
</style>
