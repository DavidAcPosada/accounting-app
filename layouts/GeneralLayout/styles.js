import { makeStyles } from "@material-ui/core";

export default makeStyles(theme => ({
  root: {
    height: '100vh',
    minHeight: '100vh',
    maxHeight: '100vh',
    display: 'flex',
    alignItems: 'stretch',
    overflow: 'hidden'
  },
  dot: {
    height: 5,
    width: 5,
    borderRadius: 5,
    background: theme.palette.secondary.main,
    '&:nth-child(2)': {
      margin: theme.spacing(0, 1.5)
    }
  },
  establishmentsContainer: {
    background: theme.palette.common.black,
    padding: theme.spacing(1.5)
  },
  establishmentsAvatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shorter,
      easing: theme.transitions.easing.easeInOut
    }),
    '&:hover': {
      transform: 'scale(1.05)',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shorter,
        easing: theme.transitions.easing.easeInOut
      })
    },
  },
  establishmentsAvatarActive: {
    background: theme.palette.secondary.dark,
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shorter,
      easing: theme.transitions.easing.easeInOut
    }),
  },
  loaderEstablishments: {
    background: 'rgba(255, 255, 255, 0.11) !important',
    marginBottom: theme.spacing(2)
  },
  active: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    '&::before': {
      content: '" "',
      position: 'absolute',
      height: 20,
      width: 4,
      borderRadius: '0px 5px 5px 0',
      background: theme.palette.common.white,
      left: -theme.spacing(1.5),
      transition: theme.transitions.create('height', {
        duration: theme.transitions.duration.shorter,
        easing: theme.transitions.easing.easeOut
      })
    },
    '&:hover::before': {
      height: 30,
      transition: theme.transitions.create('height', {
        duration: theme.transitions.duration.shorter,
        easing: theme.transitions.easing.easeIn
      })
    }
  },
  inactive: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    '&::before': {
      content: '" "',
      position: 'absolute',
      height: 20,
      width: 4,
      opacity: 0.5,
      borderRadius: '0px 5px 5px 0',
      background: theme.palette.common.white,
      left: -theme.spacing(1.5),
      transform: 'scale(0)',
      transition: theme.transitions.create(['height', 'transform'], {
        duration: theme.transitions.duration.shorter,
        easing: theme.transitions.easing.easeOut
      })
    },
    '&:hover::before': {
      height: 30,
      transform: 'scale(1)',
      transition: theme.transitions.create(['height', 'transform'], {
        duration: theme.transitions.duration.shorter,
        easing: theme.transitions.easing.easeIn
      })
    }
  },
  addAvatar: {
    background: 'rgba(255, 255, 255, 0.16)'
  },
  content: {
    background: '#FAFAFA',
    width: '100%',
    height: '100vh',
    maxHeight: '100vh',
    overflowY: 'scroll',
    position: 'relative'
  }
}))