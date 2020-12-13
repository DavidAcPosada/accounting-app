import { makeStyles } from "@material-ui/core";

export default makeStyles(theme => ({
  contextMenu: {
    zIndex: theme.zIndex.snackbar,
    display: 'flex',
    alignItems: 'center',
    transform: 'scale(1)',
    transition: theme.transitions.create('all', {
      duration: theme.transitions.duration.short,
      easing: theme.transitions.easing.easeInOut
    })
  },
  outside: {
    flexDirection: 'row-reverse',
    '& $arrow': {
      clipPath: 'polygon(0 0, 100% 50%, 0% 100%)',
    }
  },
  arrow: {
    width: 10,
    height: 15,
    minWidth: 10,
    minHeight: 15,
    background: theme.palette.common.white,
    clipPath: 'polygon(0 50%, 100% 0%, 100% 100%)',
    boxShadow: theme.shadows[6]
  },
  menu: {
    '& .MuiTypography-root': {
      marginRight: theme.spacing(2)
    },
    '& .MuiListItem-root': {
      justifyContent: 'space-between'
    },
    '& .MuiListItemIcon-root': {
      minWidth: 'unset'
    }
  },
  hidden: {
    transform: 'scale(0)'
  }
}))