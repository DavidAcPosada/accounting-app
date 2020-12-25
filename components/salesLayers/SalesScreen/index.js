import { Box } from '@material-ui/core'

import DetailsInvoice from './../Details'
import NewInvoice from './../New'
import List from './../List'

const Screens = {
  new: NewInvoice,
  details: DetailsInvoice
}

const SalesScreen = ({ screen, setLoad, ...props }) => {
  const Screen = Screens[screen] || List
  return <Screen setLoad={setLoad} {...props} />
}

export default SalesScreen