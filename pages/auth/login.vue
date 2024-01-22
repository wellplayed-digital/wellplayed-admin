<template>
  <div class="h-100 d-flex align-center">
    <WpContainer max-width="35rem">
      <h1 class="text-h4 text-center mb-10">
        Iniciar Sesión
      </h1>
      <WpForm :disabled="userStore.logginIn" @submit="userStore.login(email)">
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
            >
              Iniciar Sesión
            </WpButton>
          </v-col>
        </v-row>
      </WpForm>
    </WpContainer>
  </div>
</template>

<script setup>
const { required, validEmail } = useRules()
const userStore = useUserStore()
const email = ref(null)
</script>
