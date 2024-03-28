<template>
  <div class="h-100 d-flex align-center">
    <WpContainer max-width="35rem">
      <h1 class="text-h4 text-center mb-10">
        {{ $t('pages.profile.title') }}
      </h1>
      <WpConfirmDialog
        :text="$t('pages.profile.confirmChanges')"
        @confirm="userStore.updateProfile({ firstName, lastName })"
        @cancel="unsavedChangesWarning"
      >
        <template #activator="{ open }">
          <WpForm
            :disabled="userStore.updatingProfile"
            @submit="open"
          >
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
                    :label="startCase($t('global.firstName'))"
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <WpTextField
                    v-model="lastName"
                    :rules="[required]"
                    :label="startCase($t('global.lastName'))"
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
                    {{ $t('global.save') }}
                  </WpButton>
                </v-col>
              </v-row>
            </template>
          </WpForm>
        </template>
      </WpConfirmDialog>
      <WpDivider class="py-4" />
      <WpConfirmDialog
        :text="$t('pages.profile.confirmLogout')"
        @confirm="userStore.signOut"
      >
        <template #activator="{ props: slotProps }">
          <WpButton
            variant="tonal"
            size="x-large"
            block
            :loading="userStore.signingOut"
            v-bind="slotProps"
          >
            {{ $t('global.logout') }}
          </WpButton>
        </template>
      </WpConfirmDialog>
    </WpContainer>
  </div>
</template>

<script setup>
import { startCase } from 'lodash'
import { useI18n } from 'vue-i18n'

useHead({ title: 'Perfil' })
const { t } = useI18n()
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
    snackbar.warning({ text: t('pages.profile.unsavedChangesWarning') })
  }
}
</script>
