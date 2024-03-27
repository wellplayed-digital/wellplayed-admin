export default defineEventHandler(async () => {
  try {
    const dollar = await criptoya.dollar()
    const dollarPrice = dollar.blue.ask
    return dollarPrice
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Cannot get dollar price'
    })
  }
})
