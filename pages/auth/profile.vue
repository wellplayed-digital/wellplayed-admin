<template>
  <div class="h-100 d-flex align-center">
    <WpContainer max-width="35rem">
      <h1 class="text-h4 text-center mb-10">
        Este es tu perfil
      </h1>
      <WpForm :disabled="userStore.updatingProfile">
        <v-row dense>
          <v-col cols="12">
            <WpTextField
              :model-value="email"
              label="Email"
              readonly
              append-inner-icon="mdi-lock"
            />
          </v-col>
          <v-col cols="12" sm="6">
            <WpTextField
              v-model="firstName"
              :rules="[required]"
              label="Nombre"
            />
          </v-col>
          <v-col cols="12" sm="6">
            <WpTextField
              v-model="lastName"
              :rules="[required]"
              label="Apellido"
            />
          </v-col>
          <v-col>
            <WpConfirmDialog
              text="¿Estas seguro que quieres guardar los cambios?"
              @confirm="userStore.updateProfile({ firstName, lastName })"
              @cancel="resetForm"
            >
              <template #activator="{ props: slotProps }">
                <WpButton
                  color="primary"
                  size="x-large"
                  block
                  :loading="userStore.updatingProfile"
                  v-bind="slotProps"
                >
                  Guardar Cambios
                </WpButton>
              </template>
            </WpConfirmDialog>
          </v-col>
        </v-row>
      </WpForm>
      <WpDivider class="py-4" />
      <WpButton size="x-large" block :loading="userStore.signingOut" @click="userStore.signOut">
        Cerrar Sesión
      </WpButton>
    </WpContainer>
  </div>
</template>

<script setup>
const { required } = useRules()
const userStore = useUserStore()
const email = ref(userStore.user.email)
const firstName = ref(null)
const lastName = ref(null)
const resetForm = () => {
  firstName.value = userStore.profile.first_name
  lastName.value = userStore.profile.last_name
}
resetForm()
</script>
