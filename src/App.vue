<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/venue-people">Venue People</router-link> |
    <router-link to="/contacts/edit/:id?">Contact Editor</router-link>
  </nav>
  <!-- <VerticalMenu /> -->
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import VerticalMenu from "@/components/VerticalMenu.vue";

export default defineComponent({
  name: "App",
  // components: {
  //   VerticalMenu,
  // },
});
</script>

<style lang="scss">
#app {
  text-align: center;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
