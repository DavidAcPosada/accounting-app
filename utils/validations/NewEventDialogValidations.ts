import * as yup from 'yup'
import * as messages from './messages'

const NEW_EVENT_DIALOG_VALIDATIONS = yup.object().shape({
  name: yup.string()
    .required(messages.IS_REQUIRED),
  prices: yup.array()
    .of(yup.object().shape({
      id: yup.string()
        .required(messages.IS_REQUIRED),
      price: yup.number()
        .typeError(messages.ONLY_NUMBERS)
        .required(messages.IS_REQUIRED)
    }))
})

export default NEW_EVENT_DIALOG_VALIDATIONS