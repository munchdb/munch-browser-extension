export function displayAddress (fsaData) {
  return [
    fsaData.address_line_1,
    fsaData.address_line_2,
    fsaData.address_line_3,
    fsaData.address_line_4,
    fsaData.postcode
  ].filter(Boolean).join(',<br>')
}
