export default () => {
  const required = value => !!value || 'Este campo es requerido'

  return {
    required
  }
}
