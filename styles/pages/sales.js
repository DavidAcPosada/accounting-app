import { Button, makeStyles } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
import { withStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  hero: {
    width: '100%',
    height: 200,
    borderRadius: theme.spacing(2),
    background: blue[100],
    display: 'flex',
    position: 'relative'
  },
  heroImage: {
    width: '30%',
    height: '150%'
  },
  backButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    fontWeight: 600,
    padding: theme.spacing(2, 2.5),
    borderTopLeftRadius: 15,
    borderBottomRightRadius: 20
  }
}))

export const NewInvoice = withStyles(theme => ({
  root: {
    fontWeight: 'bold'
  },
  contained: {
    background: blue[700],
    color: '#FFF',
    marginTop: theme.spacing(1),
    '&:hover': {
      background: blue[900]
    }
  }
 }))(Button)