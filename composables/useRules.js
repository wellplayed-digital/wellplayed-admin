export default () => {
  // eslint-disable-next-line no-useless-escape
  const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  const required = value => !!value || 'This filed is required'
  const validEmail = value => EMAIL_REGEX.test(value) || 'Email must be valid'

  return {
    required,
    validEmail
  }
}
