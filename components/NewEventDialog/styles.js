import { makeStyles } from "@material-ui/core";
import { grey, lightGreen, red } from "@material-ui/core/colors";

export default makeStyles(theme => ({
  productName: {
    fontFamily: 'Nunito',
    fontWeight: 500
  },
  typo: {
    fontWeight: 'bold',
    color: grey[600],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  up: {
    color: lightGreen[500]
  },
  down: {
    color: red[400]
  }
}))