export const weekday = (index: number) => {
  const weekdays = [
    'Chủ nhật',
    'Thứ Hai',
    'Thứ Ba',
    'Thứ Tư',
    'Thứ Năm',
    'Thứ Sáu',
    'Thứ Bảy',
  ]
  const dayOfWeek = weekdays[index]
  return dayOfWeek
}

export const CurrencyFormatter = (amount: number, x = 1) => {
  // const formattedNumber = amount.toLocaleString('en-US', {
  //   maximumFractionDigits: 0,
  // })
  return amount.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}
