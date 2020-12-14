import { makeStyles } from "@material-ui/core";

export default makeStyles(theme => ({
  root: {
    width: '100%',
    height: '100%',
    background: 'rgba(255, 255, 255, 0.3)',
    position: 'absolute',
    zIndex: 1,
    top: 0,
    left: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  circle: {
    strokeLinecap: 'round'
  },
  title: {
    marginTop: theme.spacing(1.5)
  }
}))