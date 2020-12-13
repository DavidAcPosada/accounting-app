import { makeStyles, TableCell } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  container: {
    width: 350,
    minHeight: 300,
    borderRadius: theme.spacing(1),
    paddingBottom: theme.spacing(2)
  },
  header: {
    width: '100%',
    height: 120,
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    '& .MuiAvatar-root': {
      border: '6px solid #FFF',
      width: theme.spacing(15),
      height: theme.spacing(15),
      fontSize: theme.spacing(4.5),
      marginBottom: -theme.spacing(7.5),
    }
  }
}))

export const StatCell = withStyles({
  root: {
    fontWeight: 'bold',
    textAlign: 'right'
  }
})(TableCell)