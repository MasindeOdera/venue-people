<template>
  <div>
    <div v-if="loading">Loading...</div>
    <!-- Needed to display while data is being fetched -->
    <div class="contact-edit" v-else>
      <!-- This ensures that the data is only displayed when not loading -->
      <img :src="user.image" alt="Avatar" class="avatar" />
      <form @submit.prevent="saveUser">
        <FormKit
          input-class="half"
          type="text"
          label="Full name *"
          v-model="user.fullName"
        />
        <FormKit
          class="half"
          type="text"
          label="Initials"
          v-model="user.initials"
        />
        <FormKit
          class="full"
          type="text"
          label="Display name"
          v-model="user.displayName"
        />
        <FormKit
          class="full"
          type="text"
          label="Role"
          v-model="user.functionName"
        />
        <FormKit class="half" type="email" label="Email" v-model="user.email" />
        <FormKit
          class="half"
          type="tel"
          label="Phone number"
          placeholder="xxx-xxx-xxxx"
          validation="matches:/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/"
          :validation-messages="{
            matches: 'Phone number must be in the format xxx-xxx-xxxx',
          }"
          validation-visibility="dirty"
          v-model="user.phoneNumber"
        />
        <FormKit
          class="full"
          type="text"
          label="Street"
          v-model="user.address.addressLineOne"
        />
        <FormKit
          class="full"
          type="text"
          label=""
          v-model="user.address.addressLineTwo"
        />
        <FormKit
          class="half"
          type="text"
          label="City"
          v-model="user.address.city"
        />
        <FormKit
          class="half"
          type="text"
          label="Postal code"
          v-model="user.address.postalCode"
        />
        <FormKit
          class="full"
          type="text"
          label="Country"
          v-model="user.address.country"
        />
        <div class="cta">
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

<style lang="scss" scoped>
.contact-edit {
  display: flex;
  justify-content: space-evenly;

  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    display: block;
    margin-bottom: 20px;
  }

  form {
    width: 60%;

    .formkit-input {
      margin-bottom: 16px; // Add some spacing between fields
    }

    .formkit-input.full {
      width: 100%;
    }

    .formkit-input.half {
      width: 50%;
    }

    .formkit-outer {
      text-align: left;

      .formkit-wrapper {
        .formkit-inner {
          .formkit-input {
            &.full {
              width: 100%;
            }
            &.half {
              width: 50%;
            }
          }
        }
      }
    }

    .cta {
      display: flex;
      justify-content: flex-end;
      margin-top: 32px;
    }
  }
}
</style>
