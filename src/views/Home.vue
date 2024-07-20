<template>
  <div>
    <h1 class="h1-title">Venue People</h1>
    <Icon icon="home" />
    <Icon icon="settings" />
    <Button classList="btn-primary">Go to Contacts</Button>
    <Button classList="btn-primary" icon="add">Add User</Button>
    <Button classList="btn-secondary" icon="edit">Edit User</Button>
    <Button classList="btn-primary" icon="delete"></Button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Button from "@/components/Button.vue";
import Icon from "@/components/Icon.vue";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  components: { Button, Icon },
});
</script>
