import { makeStyles } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";

const general = (theme) => ({
  buttonAction: {
    marginTop: theme.spacing(2),
    '& .MuiButton-contained': {
      backgroundColor: blue[400],
      color: theme.palette.common.white,
      '&:hover': {
        background: blue[600]
      }
    }
  }
})

const useSecondaryStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  image: {
    width: '70%'
  },
  ups: {
    color: blue[400],
    fontWeight: 'bold',
    marginTop: -theme.spacing(1)
  },
  secondaryActionBtn: {
    marginTop: theme.spacing(1)
  },
  ...general(theme)
}))

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
  ...general(theme)
}))

export {
  useSecondaryStyles
}