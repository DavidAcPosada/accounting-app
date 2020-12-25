import { makeStyles } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";

export default makeStyles(theme => ({
  root: {
    margin: 'auto',
    width: '100%',
    height: 500,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    height: '80%'
  },
  title: {
    color: blue[400],
    fontFamily: 'Nunito',
    fontWeight: 'bold'
  },
  buttonAction: {
    marginTop: theme.spacing(2),
    '& .MuiButton-contained': {
      backgroundColor: blue[400],
      '&:hover': {
        background: blue[600]
      }
    }
  }
}))