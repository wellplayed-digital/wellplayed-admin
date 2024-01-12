export default () => {
  const plural = (singular, count, suffix) => singular + (count > 1 ? suffix || 's' : '')

  return {
    plural
  }
}
