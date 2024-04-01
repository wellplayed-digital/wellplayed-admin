export default defineEventHandler(async () => {
  const dollar = await criptoya.dollar()
  const dollarPrice = dollar?.cripto?.usdt?.bid || dollar?.blue?.bid
  if (!dollarPrice) {
    throw createError({
      statusCode: 500,
      message: 'Cannot get dollar price'
    })
  }
  return dollarPrice
})
