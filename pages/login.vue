<template>
  <div class="h-75 d-flex align-center">
    <WpContainer max-width="35rem">
      <v-form v-model="validForm" @submit.prevent="submit">
        <h1 class="text-h4 text-center mb-10">
          Iniciar Sesión
        </h1>
        <WpTextField
          v-model="email"
          :rules="[isRequired, isValidEmail]"
          label="Email"
          class="mb-4"
        />
        <WpPasswordField
          v-model="password"
          :rules="[isRequired]"
          label="Contraseña"
          class="mb-4"
        />
        <WpButton type="submit" size="x-large" block>
          Iniciar Sesión
        </WpButton>
      </v-form>
    </WpContainer>
  </div>
</template>

<script setup>
const { isRequired, isValidEmail } = useRules()
const email = ref(null)
const password = ref(null)
const validForm = ref(false)
const submit = () => {
  if (!validForm.value) { return }
  console.log('submit')
}
</script>
