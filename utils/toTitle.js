const toTitle = upper => {
  if (!upper) {
    return ''
  }
  return upper[0].toUpperCase() + upper.substring(1).toLowerCase()
}
export default toTitle
