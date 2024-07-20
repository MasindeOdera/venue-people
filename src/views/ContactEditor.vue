<template>
  <div>
    <h1>Contact Editor</h1>
    <div v-if="loading">Loading...</div>
    <!-- Needed to display while data is being fetched -->
    <div v-else>
      <!-- This ensures that the data is only displayed when not loading -->
      <img :src="user.image" alt="Avatar" class="avatar" />
      <form @submit.prevent="saveUser">
        <FormKit type="text" label="Full Name" v-model="user.fullName" />
        <FormKit type="text" label="Initials" v-model="user.initials" />
        <FormKit type="text" label="Display Name" v-model="user.displayName" />
        <FormKit type="text" label="Role" v-model="user.functionName" />
        <FormKit type="email" label="Email" v-model="user.email" />
        <FormKit type="text" label="Phone Number" v-model="user.phoneNumber" />
        <FormKit type="text" label="Street" v-model="user.street" />
        <FormKit type="text" label="City" v-model="user.city" />
        <FormKit type="text" label="Postal Code" v-model="user.postalCode" />
        <FormKit type="text" label="Country" v-model="user.country" />
        <div>
          <Button buttonType="black-on-white" @click="cancelEdit"
            >Cancel</Button
          >
          <Button buttonType="white-on-black" type="submit"
            >Save changes</Button
          >
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import FormKit from "@formkit/vue";
import UserService from "@/services/UserService";
import Button from "@/components/Button.vue";

export default defineComponent({
  name: "ContactEditor",
  components: { FormKit, Button },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const user = ref<any>(null);
    const loading = ref(true);

    onMounted(async () => {
      const id = Number(route.params.id);
      if (id) {
        user.value = await UserService.getUser(id);
      } else {
        user.value = {
          fullName: "",
          email: "",
          initials: "",
          displayName: "",
          functionName: "",
          phoneNumber: "",
          street: "",
          city: "",
          postalCode: "",
          country: "",
          image: "https://avatar.iran.liara.run/public",
        };
      }
      loading.value = false;
    });

    const saveUser = async () => {
      const id = Number(route.params.id);
      if (id) {
        await UserService.updateUser(id, user.value);
      } else {
        await UserService.createUser(user.value);
      }
      router.push({ name: "ContactList" });
    };

    const cancelEdit = () => {
      router.push({ name: "ContactList" });
    };

    return { user, saveUser, cancelEdit, loading };
  },
});
</script>

<style scoped>
.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: block;
  margin-bottom: 20px;
}
</style>
