export default () => {
  const USDFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  })

  const USD = price => USDFormat.format(price)

  return {
    USD
  }
}
