<template>
  <div class="vertical-menu">
    <div class="logo">
      <img src="@/assets/logo.png" alt="Company Logo" />
    </div>
    <div class="menu-items">
      <Icon icon="home" label="Home" @click="navigateTo('home')" />
      <Icon icon="list_alt" label="List" @click="navigateTo('ContactList')" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import Icon from "@/components/Icon.vue";

export default defineComponent({
  name: "VerticalMenu",
  components: { Icon },
  setup() {
    const router = useRouter();

    const navigateTo = (routeName: string) => {
      router.push({ name: routeName });
    };

    return {
      navigateTo,
    };
  },
});
</script>

<style scoped lang="scss">
.vertical-menu {
  width: 56px;
  height: 100vh;
  background-color: #e2e2e2;
  border: 1px solid #000000;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  position: fixed;
  top: 0;
  left: 0;

  .logo {
    margin-bottom: 30px;

    img {
      width: 70px;
      height: auto;
    }
  }

  .menu-items {
    display: flex;
    flex-direction: column;
    width: 100%;

    .material-icons {
      width: 100%;
      text-align: center;
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        background-color: #34495e;
      }
    }
  }
}
</style>
