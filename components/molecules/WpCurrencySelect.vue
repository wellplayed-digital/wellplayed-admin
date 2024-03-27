<template>
  <v-menu>
    <template #activator="{props: slotProps}">
      <WpIconButton v-bind="slotProps" :tooltip-text="$t('global.currency')">
        <div class="text-body-2">
          {{ currencyStore.userCurrency.code }}
        </div>
      </WpIconButton>
    </template>
    <v-list>
      <v-list-item
        v-for="currency in currencyStore.availableCurrencies"
        :key="`currency-${currency.code}`"
        :active="currencyStore.userCurrency.code === currency.code"
        @click="currencyStore.userCurrency = currency"
      >
        {{ currency.code }} - {{ currency.name }}
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup>
const currencyStore = useCurrencyStore()
</script>
