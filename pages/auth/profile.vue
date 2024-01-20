<template>
  <div class="h-100 d-flex align-center">
    <WpContainer max-width="35rem">
      <h1 class="text-h4 text-center mb-10">
        Este es tu perfil
      </h1>
      <WpConfirmDialog
        :confirm-action="updateUser"
        :cancel-action="resetUser"
        text="¿Estas seguro que quieres guardar los cambios?"
      >
        <template #default="{ askToConfirm }">
          <WpForm @submit="askToConfirm">
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
              <v-col>
                <WpButton type="submit" color="primary" size="x-large" block>
                  Guardar Cambios
                </WpButton>
              </v-col>
            </v-row>
          </WpForm>
        </template>
      </WpConfirmDialog>
      <WpDivider class="py-4" />
      <WpButton size="x-large" block @click="resetPassword">
        Resetear contraseña
      </WpButton>
    </WpContainer>
  </div>
</template>

<script setup>
import { useLocalStorage } from '@vueuse/core'

const { isRequired, isValidEmail } = useRules()
const DEFAULT_USER = {
  id: 1,
  first_name: 'Marcelo',
  last_name: 'Gallardo',
  email: 'muñco@fake.email'
}

const user = ref(useLocalStorage('user', DEFAULT_USER))
const firstName = ref(user.value.first_name)
const lastName = ref(user.value.last_name)
const email = ref(user.value.email)
const updateUser = () => {
  user.value.first_name = firstName.value
  user.value.last_name = lastName.value
  user.value.email = email.value
}
const resetUser = () => {
  firstName.value = user.value.first_name
  lastName.value = user.value.last_name
  email.value = user.value.email
}
const resetPassword = () => {
  console.log('resetPassword')
}
</script>
