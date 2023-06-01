function formatDate(date, time = true) {
  const { format } = Intl.DateTimeFormat('pt-br', { dateStyle: 'medium', timeStyle: time ? 'short' : undefined })
  return format(date)
}

export default formatDate
