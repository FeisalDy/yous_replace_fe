//add dots as thousand separators in JavaScript
export const addThousandSeparators = (num: number) => {
  return new Intl.NumberFormat('id-ID').format(num)
}
