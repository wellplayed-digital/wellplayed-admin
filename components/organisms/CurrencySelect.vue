<template>
  <v-menu location="bottom center">
    <template #activator="{ props: slotProps }">
      <WpButton
        v-bind="slotProps"
        variant="text"
        size="small"
        prepend-icon="mdi-cash-multiple"
        prepend-icon-color="primary"
        tooltip-text="Currency"
      >
        {{ currencyStore.userCurrency.code }}
      </WpButton>
    </template>
    <v-list>
      <v-list-item
        v-for="currency in currencyStore.availableCurrencies"
        :key="`currency-${currency.code}`"
        :active="currencyStore.userCurrency.code === currency.code"
        class="text-body-2"
        @click="currencyStore.userCurrency = currency"
      >
        <span class="mr-2">{{ currency.code }}</span>
        <span class="text-medium-emphasis">{{ currency.name }}</span>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup>
const currencyStore = useCurrencyStore()
</script>
