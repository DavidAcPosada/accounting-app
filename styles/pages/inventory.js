import { makeStyles } from '@material-ui/core'

const styles = makeStyles(theme => ({
  card: {
    padding: theme.spacing(1),
    background: theme.palette.common.white,
    boxShadow: theme.shadows[2],
    borderRadius: theme.spacing(2)
  },
  cardSearch: {
    padding: theme.spacing(0, 1.2),
    paddingTop: 5,
    borderRadius: 50,
    position: 'relative'
  },
  inputBase: {
    paddingBottom: 10
  },
  inputAdornedStart: {
    marginBottom: theme.spacing(0.5),
    marginRight: theme.spacing(0.5)
  },
  content: {
    display: 'flex',
    alignItems: 'flex-start'
  },
  items: {
    minHeight: 200,
    paddingBottom: 80
  },
  details: {
    marginLeft: 15,
    overflow: 'hidden',
    width: '30%',
    transformOrigin: 'top-left',
    padding: theme.spacing(2.5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative'
  },
  detailAvatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    fontSize: theme.spacing(4),
    background: theme.palette.secondary.main,
    marginBottom: theme.spacing(2.5)
  },
  transitionable: {
    transition: theme.transitions.create('all', {
      duration: theme.transitions.duration.standard,
      easing: theme.transitions.easing.easeInOut
    })
  },
  dataTable: {
    border: 'none',
    minHeight: 250,
    '& .MuiDataGrid-mainGridContainer': {
      position: 'unset',
      paddingBottom: 0,
      border: '1px solid #ddd',
      borderRadius: 5,
    },
    '& .MuiDataGrid-columnsContainer': {
      position: 'inherit'
    },
    '& .MuiDataGrid-viewport': {
      minHeight: 250
    },
    '& .MuiDataGrid-window': {
      position: 'inherit'
    },
    '& .MuiDataGrid-overlay': {
      position: 'unset',
      background: 'transparent'
    }
  },
  dataTableControls: {
    marginLeft: theme.spacing(1)
  }
}))

export const ANIMATIONS = {
  tableVariants: {
    expanded: {
      width: '70%',
      transition: {
        ease: 'easeIn'
      }
    },
    collapsed: {
      width: '100%',
      transition: {
        delay: 0.2,
        ease: 'easeIn'
      }
    }
  },
  detailsVariants: {
    expanded: {
      width: ['0%', '30%', '30%'],
      marginLeft: [0, 15, 15],
      clipPath: ['circle(0vh at 0px 0px)', 'circle(100vh at 0px 0px)', 'circle(100vh at 0px 0px)'],
      marginLeft: [0, 15, 15],
      transition: {
        delay: 0.1,
        duration: 0.5,
        ease: 'easeIn'
      }
    },
    collapsed: {
      width: ['30%', '30%', '0%'],
      clipPath: ['circle(100vh at 0px 0px)', 'circle(0vh at 0px 0px)', 'circle(0vh at 0px 0px)'],
      marginLeft: [15, 15, 0],
      transition: {
        delay: 0.1,
        duration: 0.7,
        ease: 'easeInOut'
      }
    }
  }
}

export default styles
