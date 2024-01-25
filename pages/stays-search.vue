<template>
  <WpContainer>
    <StaysSearchForm @submit="searchStays" />
    <StaysList />
  </WpContainer>
</template>

<script setup>
useHead({ title: 'Busqueda' })
const searchStays = (data) => {
  console.log(data)
}
</script>
