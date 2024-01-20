<template>
  <div class="h-100 d-flex align-center">
    <WpContainer max-width="35rem">
      <h1 class="text-h4 text-center mb-10">
        Iniciar Sesión
      </h1>
      <WpForm @submit="login">
        <v-row dense>
          <v-col cols="12">
            <WpTextField
              v-model="email"
              :rules="[isRequired, isValidEmail]"
              label="Email"
            />
          </v-col>
          <v-col cols="12">
            <WpPasswordField
              v-model="password"
              :rules="[isRequired]"
              label="Contraseña"
            />
          </v-col>
          <v-col cols="12">
            <WpButton type="submit" color="primary" size="x-large" block>
              Iniciar Sesión
            </WpButton>
          </v-col>
        </v-row>
      </WpForm>
    </WpContainer>
  </div>
</template>

<script setup>
const { isRequired, isValidEmail } = useRules()
const email = ref(null)
const password = ref(null)
const login = () => {
  console.log('login')
}
</script>
