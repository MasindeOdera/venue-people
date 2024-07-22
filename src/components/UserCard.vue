<template>
  <div v-if="!loading" class="user-card" @click="navigateToEditor">
    <Avatar
      :src="user.image"
      width="50px"
      height="50px"
      display="flex"
      margin-right="10px"
    />
    <div class="user-name">
      <h3 class="normal-prominent">{{ user.displayName }}</h3>
      <p class="tiny-thin">{{ user.fullName }}</p>
    </div>
    <div class="user-role">
      <p>{{ user.functionName }}</p>
    </div>
    <div class="user-email" @click.stop="copyToClipboard(user.email)">
      <p>{{ user.email }}</p>
    </div>
    <div
      class="user-phone"
      @click.stop="
        copyToClipboard(user.phoneCountryPrefix + ' ' + user.phoneNumber)
      "
    >
      <p>{{ user.phoneCountryPrefix }} {{ user.phoneNumber }}</p>
    </div>
    <div class="not-desktop">
      <span>
        <span class="normal-prominent">{{ user.displayName }}</span>
        <span class="tiny-thin">{{ user.functionName }}</span>
      </span>
      <span>
        <span class="tiny-thin" @click.stop="copyToClipboard(user.email)"
          >{{ user.email }} |
        </span>
        <span
          @click.stop="
            copyToClipboard(user.phoneCountryPrefix + ' ' + user.phoneNumber)
          "
          >{{ user.phoneCountryPrefix }} {{ user.phoneNumber }}</span
        >
      </span>
    </div>
    <div class="user-team">
      <span
        v-for="teamId in user.teamIds"
        :key="teamId"
        class="normal-prominent"
        :class="['team-color', `team-color-${teamId}`]"
        :style="{ backgroundColor: getTeamColor(teamId) }"
      >
        {{ getTeamLetter(teamId) }}
      </span>
    </div>
    <Button
      classList="btn-primary"
      icon="delete"
      @click.stop="handleDelete"
    ></Button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, PropType } from "vue";
import { useRouter } from "vue-router";
import TeamService from "@/services/TeamService";
import { User } from "@/types/User";
import { Team } from "@/types/Team";
import Button from "@/components/Button.vue";
import Avatar from "./Avatar.vue";

export default defineComponent({
  name: "UserCard",
  components: { Button, Avatar },
  props: {
    user: {
      type: Object as PropType<User>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const router = useRouter();
    const teams = ref<Team[]>([]);
    const loading = ref(true); // Loading state

    const navigateToEditor = () => {
      router.push({ name: "ContactEditor", params: { id: props.user.id } });
    };

    const fetchTeams = async () => {
      try {
        const data = await TeamService.getTeams();
        // Convert team IDs from strings to numbers
        teams.value = data.map((team: { id: string }) => ({
          ...team,
          id: parseInt(team.id, 10), // Ensure the id is a number
        }));
      } catch (error) {
        console.error("Failed to fetch teams:", error);
      } finally {
        loading.value = false; // Set loading to false once fetch is complete
      }
    };

    const getTeamColor = (teamId: number): string => {
      const team = teams.value.find((team) => team.id === teamId);
      return team ? team.color : "#000000"; // Default to black if team not found.
    };

    const getTeamLetter = (teamId: number): string => {
      const team = teams.value.find((team) => team.id === teamId);
      return team ? team.abbreviation : ""; // Display abbreviation in team circle. Or nothing, mwhahahaha!
    };

    const handleDelete = () => {
      // Emit delete event
      emit("delete", props.user.id);
    };

    const copyToClipboard = async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        console.log(`Copied to clipboard: ${text}`);
        // Optionally show a success message to the user, if there is time.
      } catch (err) {
        console.error("Failed to copy: ", err);
      }
    };

    onMounted(async () => {
      await fetchTeams(); // Fetch teams data on mount
    });

    return {
      navigateToEditor,
      getTeamColor,
      getTeamLetter,
      handleDelete,
      copyToClipboard,
      teams,
      loading,
    };
  },
});
</script>

<style scoped lang="scss">
@import "@/assets/styles/breakpoints.scss";

@include small-only {
  // Styles for small screens (under 380px)
  .user-card {
    display: flex;
    border-bottom: 1px solid #d2d2d2;
    padding: 10px;
    cursor: pointer;

    .avatar-container {
      width: 30px !important;
      height: 30px !important;
    }

    .user-name,
    .user-role,
    .user-email,
    .user-phone {
      display: none;
    }

    .not-desktop {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      > span .normal-prominent {
        margin-right: 4px;
      }
    }

    .user-team {
      margin-left: auto;
      padding-right: 10px;
      display: flex;
      align-items: center;

      .team-color {
        width: 18px;
        height: 18px;
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

    .btn-primary {
      margin-left: 10px;
      width: 48px;
      height: 48px;
      padding: unset;
      background-color: transparent;
    }
  }

  // Hide the border for the last user-card.
  .user-card:last-child {
    border-bottom: none;
  }
}

@include medium-only {
  // Styles for medium screens (380px to 900px)
  .user-card {
    display: flex;
    border-bottom: 1px solid #d2d2d2;
    padding: 10px;
    cursor: pointer;

    .avatar-container {
      width: 50px !important;
      height: 50px !important;
    }

    .user-name,
    .user-role,
    .user-email,
    .user-phone {
      display: none;
    }

    .not-desktop {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      > span .normal-prominent {
        margin-right: 4px;
      }
    }

    .user-team {
      margin-left: auto;
      padding-right: 10px;
      display: flex;
      align-items: center;

      .team-color {
        width: 20px;
        height: 20px;
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

    .btn-primary {
      margin-left: 10px;
      width: 48px;
      height: 48px;
      padding: unset;
      background-color: transparent;
    }
  }

  // Hide the border for the last user-card.
  .user-card:last-child {
    border-bottom: none;
  }
}

@include large-only {
  // Styles for large screens (over 900px)
  .user-card {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #d2d2d2;
    padding: 10px;
    cursor: pointer;

    .user-name {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: 150px;
      padding-right: 5%;
    }

    .user-role {
      display: flex;
      width: 150px;
      padding-right: 5%;
    }

    .user-email,
    .user-phone {
      display: flex;
      width: 180px;
      padding-right: 5%;
      cursor: pointer;
    }

    .not-desktop {
      display: none;
    }

    .user-team {
      margin-left: auto;
      padding-right: 10px;
      display: flex;
      align-items: center;

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
}

@media (max-width: 390px) {
  .not-desktop span:nth-child(2) .tiny-thin {
    display: none;
  }
}
</style>
