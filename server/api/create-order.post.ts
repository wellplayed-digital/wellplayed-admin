import { Preference } from 'mercadopago'

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig()
  const body = await readBody(event)

  if (body.payment_method === 'mercadopago') {
    const dollar = await criptoya.dollar()
    const preference = new Preference(mercadopago)

    const response = await preference.create({
      body: {
        auto_return: 'approved',
        back_urls: {
          success: `${runtimeConfig.public.baseUrl}/thank-you`
        },
        items: [
          {
            id: body.product_name.toLowerCase().replace(' ', '_'),
            quantity: 1,
            title: body.product_name,
            unit_price: body.price * dollar.blue.ask
          }
        ]
      }
    })
    return { url: runtimeConfig.public.enviroment === 'production' ? response.init_point : response.sandbox_init_point }
  }
})
