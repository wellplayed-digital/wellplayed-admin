import { MercadoPagoConfig } from 'mercadopago'

const config = useRuntimeConfig()

export const mercadopago = new MercadoPagoConfig({
  accessToken: config.mercadopagoAccessToken
})
