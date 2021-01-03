const formatNumber = (value: string | number, decimals = 2) => {
  if (isNaN(Number(value))) return 'Invalid'
  const convert = Number(value).toFixed(decimals).toString()
  return convert.replace(/\./g, ',')
}

export default formatNumber