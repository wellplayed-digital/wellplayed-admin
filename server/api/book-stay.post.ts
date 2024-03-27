import { Preference } from 'mercadopago'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)
  await supabase.auth.setSession({
    access_token: body.access_token,
    refresh_token: body.refresh_token
  })
  const { data, error } = await supabase.rpc('book_stay', {
    cabin_id: body.cabin_id,
    start_date: body.start_date,
    end_date: body.end_date,
    guests: body.guests
  })
  if (error) { throw createError(error) }

  if (body.payment_method === 'mercadopago') {
    const dollar = await criptoya.dollar()
    const dollarPrice = dollar?.blue?.ask
    if (!dollarPrice) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Cannot get dollar price'
      })
    }
    const priceInARS = data.final_total_price * dollarPrice
    const preference = new Preference(mercadopago)
    const response = await preference.create({
      body: {
        items: [
          {
            id: data.id,
            quantity: 1,
            title: 'Ayrampo',
            unit_price: priceInARS
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
