function formatDate(date) {
  const { format } = Intl.DateTimeFormat('pt-br', { dateStyle: 'medium', timeStyle: 'short' })
  return format(date)
}

export default formatDate
