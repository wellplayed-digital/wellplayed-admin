<template>
  <WpContainer max-width="50rem">
    <WpForm :disabled="addingItem" class="mb-10" @submit="addItem">
      <div class="text-h5 mb-4">
        Create a New Item
      </div>
      <v-row>
        <v-col cols="8">
          <WpTextField
            ref="$name"
            v-model="newItem.name"
            label="Item Name"
            clearable
          />
        </v-col>
        <v-col cols="4">
          <WpButton
            type="submit"
            color="primary"
            size="x-large"
            block
            :disabled="isEmpty(newItem.name)"
            :loading="addingItem"
          >
            Add
          </WpButton>
        </v-col>
      </v-row>
    </WpForm>
    <div v-if="items.length > 0">
      <div class="text-h5 mb-4">
        Items
      </div>
      <div v-for="item in items" :key="item.id">
        <WpTextField
          v-model="item.name"
          :variant="item.edit ? 'outlined' : 'solo'"
          :readonly="!item.edit"
          elevation="0"
          @keyup.enter="updateItem(item)"
        >
          <template #append-inner>
            <WpIconButton
              v-if="!item.edit"
              icon="mdi-pencil"
              size="small"
              tooltip-text="Edit"
              @click="item.edit = true"
            />
            <WpIconButton
              v-if="item.edit"
              icon="mdi-check"
              size="small"
              :loading="item.updating"
              @click="updateItem(item)"
            />
            <WpConfirmDialog
              text="¿Estas seguro que quieres guardar los cambios?"
              @confirm="deleteItem(item)"
            >
              <template #activator="{ open: openConfirmDialog }">
                <WpIconButton
                  icon="mdi-delete"
                  size="small"
                  tooltip-text="Delete"
                  :loading="item.deleting"
                  @click="openConfirmDialog"
                />
              </template>
            </WpConfirmDialog>
          </template>
        </WpTextField>
      </div>
    </div>
  </WpContainer>
</template>

<script setup>
import { trim } from 'lodash'
const isEmpty = value => trim(value).length === 0

useHead({ title: 'Supabase' })

const supabase = useSupabaseClient()
const snackbar = useSnackbar()

const $name = ref()
const items = ref([])
const loading = ref(false)
const fetchItems = async () => {
  try {
    loading.value = true
    const { data, error } = await supabase
      .from('items')
      .select('*')
      .order('id', { ascending: false })
    if (error) { throw error }
    items.value = data
  } catch (error) {
    snackbar.error({ text: error.message })
  } finally {
    loading.value = false
  }
}
onMounted(fetchItems)

const getNewItemDefault = () => ({ name: '' })
const newItem = ref(getNewItemDefault())
const addingItem = ref(false)
const addItem = async () => {
  try {
    addingItem.value = true
    const { data, error } = await supabase
      .from('items')
      .insert(newItem.value)
      .select('*')
      .single()
    if (error) { throw error }
    items.value.unshift(data)
    newItem.value = getNewItemDefault()
    $name.value.focus()
  } catch (error) {
    snackbar.error({ text: error.message })
  } finally {
    addingItem.value = false
  }
}

const deleteItem = async (item) => {
  try {
    item.deleting = true
    const { error } = await supabase
      .from('items')
      .delete()
      .eq('id', item.id)
    if (error) { throw error }
    items.value = items.value.filter(i => i.id !== item.id)
  } catch (error) {
    snackbar.error({ text: error.message })
  } finally {
    item.deleting = false
  }
}

const updateItem = async (item) => {
  if (isEmpty(item.name)) {
    deleteItem(item)
    return
  }
  try {
    item.updating = true
    const updates = {
      name: item.name,
      updated_at: new Date()
    }
    const { error } = await supabase
      .from('items')
      .update(updates)
      .eq('id', item.id)
    if (error) { throw error }
    item.edit = false
  } catch (error) {
    snackbar.error({ text: error.message })
  } finally {
    item.updating = false
  }
}

</script>
