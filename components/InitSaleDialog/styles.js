import { makeStyles } from "@material-ui/core";

export default makeStyles(theme => ({
  title: {
    '& .MuiTypography-h6': {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between'
    }
  }
}))