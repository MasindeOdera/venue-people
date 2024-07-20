<template>
  <div>
    <h1>Contact Editor</h1>
    <form @submit.prevent="saveUser">
      <FormKit type="text" label="Full Name" v-model="user.fullName" />
      <FormKit type="email" label="Email" v-model="user.email" />
      <!-- Add more form fields as needed -->
      <Button classList="btn-primary" type="submit" icon="send">Save</Button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRoute } from "vue-router";
import FormKit from "@formkit/vue";
import UserService from "@/services/UserService";
import Button from "@/components/Button.vue";

export default defineComponent({
  name: "ContactEditor",
  components: { FormKit, Button },
  setup() {
    const route = useRoute();
    const user = ref({
      fullName: "",
      email: "",
      // Add more properties as needed
    });

    const saveUser = async () => {
      const id = Number(route.params.id);
      if (id) {
        await UserService.updateUser(id, user.value);
      } else {
        await UserService.createUser(user.value);
      }
    };

    return { user, saveUser };
  },
});
</script>
