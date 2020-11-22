import { makeStyles } from "@material-ui/core";

export default makeStyles(theme => ({
  pageSizingInput: {
    marginRight: theme.spacing(1.5),
    minWidth: 150
  },
  dense: {
    borderRadius: 50,
    '& .MuiOutlinedInput-inputMarginDense': {
      paddingTop: 6.5,
      paddingBottom: 6.5
    }
  }
}))