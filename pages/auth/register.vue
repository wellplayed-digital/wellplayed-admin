<template>
  <div class="h-100 d-flex align-center">
    <WpContainer max-width="35rem">
      <h1 class="text-h4 text-center mb-10">
        Registrate y comenzá a disfrutar de los mejores alojamientos
      </h1>
      <WpForm @submit="register">
        <v-row dense>
          <v-col cols="12" sm="6">
            <WpTextField
              v-model="firstName"
              :rules="[isRequired]"
              label="Nombre"
            />
          </v-col>
          <v-col cols="12" sm="6">
            <WpTextField
              v-model="lastName"
              :rules="[isRequired]"
              label="Apellido"
            />
          </v-col>
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
              :rules="[isRequired, isValidPassword]"
              label="Contraseña"
            />
          </v-col>
          <v-col cols="12">
            <WpPasswordField
              v-model="confirmPassword"
              :rules="[isRequired, matchPassword(confirmPassword, password)]"
              label="Confirmar Contraseña"
            />
          </v-col>
          <v-col cols="12">
            <WpButton type="submit" color="primary" size="x-large" block>
              Registrarse
            </WpButton>
          </v-col>
        </v-row>
      </WpForm>
    </WpContainer>
  </div>
</template>

<script setup>
const { isRequired, isValidEmail, isValidPassword, matchPassword } = useRules()
const firstName = ref(null)
const lastName = ref(null)
const email = ref(null)
const password = ref(null)
const confirmPassword = ref(null)
const register = () => {
  console.log('register')
}
</script>
