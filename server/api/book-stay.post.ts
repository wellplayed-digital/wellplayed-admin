import { Preference } from 'mercadopago'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)
  // payment_method
  // start_date
  // end_date
  // guests
  // cabin_id

  if (body.payment_method === 'mercadopago') {
    const dollar = await criptoya.dollar()
    const dollarPrice = dollar?.blue?.ask
    if (!dollarPrice) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Error getting dollar value'
      })
    }

    const preference = new Preference(mercadopago)

    const response = await preference.create({
      body: {
        items: [
          {
            id: body.product_name.toLowerCase().replace(' ', '_'),
            quantity: 1,
            title: body.product_name,
            unit_price: body.price * dollarPrice
          }
        ],
        auto_return: 'approved',
        back_urls: {
          success: `${config.public.baseUrl}/thank-you`
        }
      }
    })
    return {
      url: config.public.enviroment === 'production'
        ? response.init_point
        : response.sandbox_init_point
    }
  }
})
