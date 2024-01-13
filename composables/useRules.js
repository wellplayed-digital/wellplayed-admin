// eslint-disable-next-line no-useless-escape
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export default () => {
  const isRequired = value => !!value || 'Este campo es requerido'
  const isValidEmail = (value) => {
    return EMAIL_REGEX.test(value) || 'Debe ser un email válido'
  }
  const isValidPassword = value => value.length >= 8 || 'Debe tener al menos 8 caracteres'
  const matchPassword = (value, password) => value === password || 'Las contraseñas no coinciden'

  return {
    isRequired,
    isValidEmail,
    isValidPassword,
    matchPassword
  }
}
