<template>
  <div class="h-100 d-flex align-center">
    <WpContainer max-width="35rem">
      <h1 class="text-h4 text-center mb-10">
        This is your profile
      </h1>
      <WpConfirmDialog
        text="Are you sure you want to save the changes?"
        @confirm="userStore.updateProfile(firstName, lastName)"
        @cancel="unsavedChangesWarning"
      >
        <template #activator="{ open }">
          <WpForm :disabled="userStore.updatingProfile" @submit="open">
            <template #default="{ valid }">
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
                    label="First Name"
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <WpTextField
                    v-model="lastName"
                    :rules="[required]"
                    label="Last Name"
                  />
                </v-col>
                <v-col>
                  <WpButton
                    type="submit"
                    color="primary"
                    size="x-large"
                    block
                    :loading="userStore.updatingProfile"
                    :disabled="!valid || !hasUnsavedChanges"
                  >
                    Save
                  </WpButton>
                </v-col>
              </v-row>
            </template>
          </WpForm>
        </template>
      </WpConfirmDialog>
      <WpDivider class="py-4" />
      <WpConfirmDialog
        text="Are you sure you want to log out?"
        @confirm="userStore.signOut"
      >
        <template #activator="{ props: slotProps }">
          <WpButton
            v-bind="slotProps"
            variant="tonal"
            size="x-large"
            block
            :loading="userStore.signingOut"
          >
            Log Out
          </WpButton>
        </template>
      </WpConfirmDialog>
    </WpContainer>
  </div>
</template>

<script setup>
definePageMeta({
  title: 'Profile',
  middleware: ['auth']
})
const { required } = useRules()
const userStore = useUserStore()
const snackbar = useSnackbar()
const email = ref(userStore.user.email)
const firstName = ref(userStore.profile.first_name)
const lastName = ref(userStore.profile.last_name)
const hasUnsavedChanges = computed(() => (
  firstName.value !== userStore.profile.first_name ||
  lastName.value !== userStore.profile.last_name
))
const unsavedChangesWarning = () => {
  if (hasUnsavedChanges.value) {
    snackbar.warning({ text: 'You have unsaved changes' })
  }
}
</script>
