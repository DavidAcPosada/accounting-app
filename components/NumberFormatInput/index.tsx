import NumberFormat from "react-number-format"

interface INumberFormatInput {
  inputRef: any;
  onChange: (e: { target: { name: string; value: number | string } }) => void;
  onBlur: (e: { target: { name: string; value: number | string } }) => void;
  name: string;
  suffix?: string;
  prefix?: string;
}

const NumberFormatInput = ({ inputRef, onChange, onBlur, name, suffix, prefix, ...other }: INumberFormatInput | any) => {
  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name,
            value: values.value
          }
        })
        onBlur({
          target: {
            name,
            value: values.value
          }
        })
      }}
      thousandSeparator='.'
      decimalSeparator=','
      isNumericString
      prefix={prefix}
      suffix={suffix}
    />
  )
}

export default NumberFormatInput