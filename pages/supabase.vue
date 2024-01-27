<template>
  <WpContainer max-width="50rem">
    <div class="text-h5 mb-4">
      Create a New Item
    </div>
    <WpForm :disabled="addingItem" class="mb-10" @submit="addItem">
      <v-row>
        <v-col cols="8">
          <WpTextField v-model="newItem.name" :rules="[required]" label="Item Name" />
        </v-col>
        <v-col cols="4">
          <WpButton type="submit" size="x-large" block :loading="addingItem">
            Add
          </WpButton>
        </v-col>
      </v-row>
    </WpForm>
    <template v-if="items.length > 0">
      <div class="text-h5 mb-4">
        Items
      </div>
      <v-list>
        <template v-for="(item, index) in items" :key="item.id">
          <WpDivider v-if="index > 0" />
          <v-list-item>
            <div class="d-flex justify-space-between align-center">
              <div>{{ item.name }}</div>
              <WpConfirmDialog
                text="¿Estas seguro que quieres guardar los cambios?"
                @confirm="deleteItem(item)"
                @cancel="unsavedChangesAlert()"
              >
                <template #activator="{ open }">
                  <WpIconButton
                    icon="mdi-delete"
                    size="small"
                    tooltip-text="Delete"
                    @click="open"
                  />
                </template>
              </WpConfirmDialog>
            </div>
          </v-list-item>
        </template>
      </v-list>
    </template>
  </WpContainer>
</template>

<script setup>
useHead({ title: 'Supabase' })

const supabase = useSupabaseClient()
const user = useSupabaseUser()
const snackbar = useSnackbar()
const { required } = useRules()

const items = ref([])
const loading = ref(false)
const getItems = async () => {
  try {
    loading.value = true
    const { data, error } = await supabase
      .from('items')
      .select('*')
    if (error) { throw error }
    items.value = data
  } catch (error) {
    snackbar.error({ text: error.message })
  } finally {
    loading.value = false
  }
}
onMounted(getItems)
const getDefaultNewItem = () => ({
  name: '',
  user_id: user.value.id
})
const newItem = ref(getDefaultNewItem())
const addingItem = ref(false)
const addItem = async () => {
  try {
    addingItem.value = true
    const { error } = await supabase.from('items').insert(newItem.value, {
      returning: 'minimal' // Don't return the value after inserting
    })
    if (error) { throw error }
    await getItems()
  } catch (error) {
    snackbar.error({ text: error.message })
  } finally {
    addingItem.value = false
  }
}
const deleteItem = async (item) => {
  try {
    loading.value = true
    const { error } = await supabase
      .from('items')
      .delete()
      .eq('id', item.id)
    if (error) { throw error }
    await getItems()
  } catch (error) {
    snackbar.error({ text: error.message })
  } finally {
    loading.value = false
  }
}
</script>
