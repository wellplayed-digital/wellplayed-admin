<template>
  <div class="h-100 d-flex align-center">
    <WpContainer max-width="32rem">
      <div class="text-center mb-14">
        <h1 class="text-h4 mb-2">
          Access with your email
        </h1>
        <p class="text-h5 text-disabled">
          We'll send an access link to your inbox
        </p>
      </div>
      <WpForm :disabled="userStore.logginIn" @submit="userStore.login(email)">
        <template #default="{ valid }">
          <v-row dense>
            <v-col cols="12">
              <WpTextField
                v-model="email"
                :rules="[required, validEmail]"
                label="Email"
              />
            </v-col>
            <v-col cols="12">
              <WpButton
                type="submit"
                color="primary"
                size="x-large"
                block
                :loading="userStore.logginIn"
                :disabled="!valid"
              >
                Send link
              </WpButton>
            </v-col>
          </v-row>
        </template>
      </WpForm>
    </WpContainer>
  </div>
</template>

<script setup>
definePageMeta({
  title: 'Login',
  middleware: ['guest']
})
const { required, validEmail } = useRules()
const userStore = useUserStore()
const email = ref(null)
</script>
