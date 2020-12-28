export default (value: string | number) => {
  if (isNaN(Number(value))) return 'Invalid'
  const convert = Number(value).toFixed(2).toString()
  return convert.replace(/\./g, ',')
}