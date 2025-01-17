<template>
  <div>
    <div v-if="loading">Loading...</div>
    <!-- Needed to display while data is being fetched -->
    <div class="contact-edit" v-else>
      <!-- This ensures that the data is only displayed when not loading -->
      <Avatar
        :src="user.image"
        width="72px"
        height="72px"
        display="block"
        margin-right="40px"
        :showIcon="true"
      >
        <template #icon>
          <Icon icon="edit_note" />
        </template>
      </Avatar>
      <form @submit.prevent="saveUser">
        <div class="name-group">
          <FormKit
            input-class="full"
            :outer-class="{
              'shared-row': true,
              'margin-left': false,
              'margin-right': true,
            }"
            type="text"
            label="Full name *"
            placeholder="First & last name"
            v-model="user.fullName"
          />
          <FormKit
            input-class="full"
            :outer-class="{
              'shared-row': true,
              'margin-left': true,
              'margin-right': false,
            }"
            type="text"
            label="Initials"
            placeholder="FIrst letters of your names"
            v-model="user.initials"
            validation="required|regex:/^[A-Z]{1,4}$/"
            :validation-messages="{
              required: 'Initials are required',
              regex: 'Initials must be 1 to 4 uppercase letters',
            }"
            validation-visibility="dirty"
          />
        </div>
        <FormKit
          input-class="full"
          type="text"
          label="Display name"
          placeholder="Name you go by"
          v-model="user.displayName"
        />
        <FormKit
          input-class="full"
          type="text"
          label="Role"
          placeholder="What is your function?"
          v-model="user.functionName"
        />
        <div class="contact-info">
          <FormKit
            input-class="full"
            :outer-class="{
              'shared-row': true,
              'margin-left': false,
              'margin-right': true,
            }"
            type="email"
            label="Email"
            v-model="user.email"
            validation="required|email"
            :validation-messages="{
              required: 'Email is required',
              email: 'Email must be a valid email address',
            }"
            validation-visibility="dirty"
          />
          <FormKit
            type="group"
            :config="{
              classes: {
                outer: 'formkit-group-outer',
                inner: 'formkit-group-inner',
                label: 'formkit-group-label',
              },
            }"
            :outer-class="{
              'shared-row': true,
              'margin-left': true,
              'margin-right': false,
            }"
          >
            <FormKit
              outer-class="phone-prefix"
              :input-class="{
                'white-background': true,
                'prefix-input': true,
              }"
              type="text"
              placeholder="+31"
              label="Phone"
              v-model="user.phonePrefix"
              validation="required|regex:/^[+][0-9]{2}$/"
              :validation-messages="{
                required: 'Prefix is required',
                regex: 'Prefix must be a valid number with a + sign',
              }"
              validation-visibility="dirty"
            />
            <FormKit
              outer-class="phone-number"
              input-class="phone-input"
              type="tel"
              label="number"
              placeholder="xxx-xxx-xxxx"
              v-model="user.phoneNumber"
              validation="matches:/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/"
              :validation-messages="{
                required: 'Phone number is required',
                matches: 'Phone number must be in the format xxx-xxx-xxxx',
              }"
              validation-visibility="dirty"
            />
          </FormKit>
        </div>
        <FormKit
          input-class="full"
          type="text"
          label="Street"
          v-model="user.address.addressLineOne"
        />
        <FormKit
          input-class="full"
          type="text"
          label=""
          v-model="user.address.addressLineTwo"
        />
        <div class="address-group">
          <FormKit
            input-class="full"
            :outer-class="{
              'shared-row': true,
              'margin-left': false,
              'margin-right': true,
            }"
            type="text"
            label="City"
            v-model="user.address.city"
          />
          <FormKit
            input-class="full"
            :outer-class="{
              'shared-row': true,
              'margin-left': true,
              'margin-right': false,
            }"
            type="text"
            label="Postal code"
            v-model="user.address.postalCode"
          />
        </div>
        <FormKit
          input-class="full"
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
import Avatar from "@/components/Avatar.vue";
import Icon from "@/components/Icon.vue";

export default defineComponent({
  name: "ContactEditor",
  components: { FormKit, Button, Avatar, Icon },
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
          address: {
            addressLineOne: "",
            addressLineTwo: "",
            city: "",
            postalCode: "",
            country: "",
          },
          image: "https://avatar.iran.liara.run/public",
        };
      }
      loading.value = false;
    });

    const saveUser = async () => {
      const id = Number(route.params.id);
      const fullPhoneNumber = `${user.value.phonePrefix}${user.value.phoneNumber}`;
      user.value.phoneNumber = fullPhoneNumber;

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
  justify-content: center;

  form {
    width: 60%;

    .phone-number-group {
      display: flex;
      align-items: center;

      .phone-prefix,
      .phone-number {
        margin: 0;
      }

      .phone-prefix {
        flex: 0 0 auto;
        width: 50px;
      }

      .phone-number {
        flex: 1;
      }
    }

    .name-group,
    .address-group,
    .contact-info {
      display: flex;
    }

    .cta {
      display: flex;
      justify-content: flex-end;
      margin-top: 32px;

      .btn.black-on-white {
        margin-right: 16px;
      }
    }
  }
}

@media (max-width: 390px) {
  .contact-edit {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
