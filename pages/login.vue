<template>
  <div class="h-75 d-flex align-center">
    <WpContainer max-width="35rem">
      <h1 class="text-h4 text-center mb-10">
        Iniciar Sesión
      </h1>
      <WpForm @submit="submit">
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
        <WpButton type="submit" color="primary" size="x-large" block>
          Iniciar Sesión
        </WpButton>
      </WpForm>
    </WpContainer>
  </div>
</template>

<script setup>
const { isRequired, isValidEmail } = useRules()
const email = ref(null)
const password = ref(null)
const submit = () => {
  console.log('submit')
}
</script>
