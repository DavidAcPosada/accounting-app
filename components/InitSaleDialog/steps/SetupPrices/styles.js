import { makeStyles } from "@material-ui/core";

export default makeStyles(theme => ({
  listEvent: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  listEventBtn: {
    marginLeft: theme.spacing(1.5)
  }
}))