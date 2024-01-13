<template>
  <div class="h-100 d-flex align-center">
    <WpContainer max-width="35rem">
      <v-form v-model="validForm" @submit.prevent="submit">
        <h1 class="text-h4 text-center mb-10">
          Registrate y comenzá a disfrutar de los mejores alojamientos
        </h1>
        <WpTextField
          v-model="firstName"
          :rules="[isRequired]"
          label="Nombre"
          class="mb-4"
        />
        <WpTextField
          v-model="lastName"
          :rules="[isRequired]"
          label="Apellido"
          class="mb-4"
        />
        <WpTextField
          v-model="email"
          :rules="[isRequired, isValidEmail]"
          label="Email"
          class="mb-4"
        />
        <WpPasswordField
          v-model="password"
          :rules="[isRequired, isValidPassword]"
          label="Contraseña"
          class="mb-4"
        />
        <WpPasswordField
          v-model="confirmPassword"
          :rules="[isRequired, matchPassword(confirmPassword, password)]"
          label="Confirmar Contraseña"
          class="mb-4"
        />
        <WpButton type="submit" size="x-large" block>
          Registrarse
        </WpButton>
      </v-form>
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

const validForm = ref(false)
const submit = () => {
  if (!validForm.value) { return }
  console.log('submit')
}
</script>
