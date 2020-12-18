import { makeStyles } from '@material-ui/core';
import { red } from '@material-ui/core/colors';

const DRAWER_WIDHT = 260

export default makeStyles(theme => ({
  drawer: {
    position: 'inherit',
    height: '100%',
    whiteSpace: 'nowrap',
    flexShrink: 0,
    width: DRAWER_WIDHT
  },
  drawerOpen: {
    transition: theme.transitions.create('width', {
      duration: theme.transitions.duration.leavingScreen,
      easing: theme.transitions.easing.sharp
    }),
    width: DRAWER_WIDHT,
    overflowX: 'hidden'
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      duration: theme.transitions.duration.leavingScreen,
      easing: theme.transitions.easing.sharp
    }),
    width: '60px !important',
    overflowX: 'hidden'
  },
  drawerPaper: {
    borderRight: 'none',
    position: 'inherit',
    background: '#FFF',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  sidebarAvatar: {
    background: red[300],
    width: theme.spacing(10),
    height: theme.spacing(10),
    fontSize: 28,
    marginBottom: theme.spacing(1),
    transition: theme.transitions.create('all', {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeInOut
    })
  },
  sidebarAvatarFolded: {
    width: 50,
    height: 50,
    fontSize: '1.25rem',
    transition: theme.transitions.create('all', {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeInOut
    })
  },
  nameUser: {
    textAlign: 'center'
  }
}))

export const useSidebarLinkStyles = makeStyles(theme => ({
  active: {
    background: theme.palette.primary.main,
    width: '95%',
    color: theme.palette.common.white,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    boxShadow: theme.shadows[3],
    '&:hover': {
      background: theme.palette.primary.dark,
      transition: theme.transitions.create('all', {
        duration: theme.transitions.duration.shortest,
        easing: theme.transitions.easing.easeInOut
      })
    },
    transition: theme.transitions.create('all', {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeInOut
    })
  },
  activeIcon: {
    color: theme.palette.common.white,
    transition: theme.transitions.create('all', {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeInOut
    })
  },
  disabled: {
    color: '#DDD',
    '& .material-icons-outlined': {
      color: '#DDD'
    }
  },
  sidebarItemFolded: {
    paddingLeft: 3,
    transition: theme.transitions.create('all', {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeInOut
    })
  },
  sidebarIconFolded: {
    background: theme.palette.primary.main,
    padding: theme.spacing(2),
    marginRight: 5,
    color: theme.palette.common.white,
    borderRadius: 50,
    boxShadow: theme.shadows[3],
    transition: theme.transitions.create('all', {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeInOut
    })
  },
  textWithBadge: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& .MuiChip-root': {
      fontFamily: 'Nunito'
    }
  }
}))
