import { makeStyles } from "@material-ui/core";
import { amber, blueGrey, deepOrange, lightGreen } from "@material-ui/core/colors";
import styled, { css } from 'styled-components'

export default makeStyles(theme => ({
  itemCard: {
    cursor: 'pointer',
    background: theme.palette.common.white,
    borderRadius: theme.spacing(2),
    boxShadow: theme.shadows[2],
    padding: theme.spacing(1.5),
    transition: theme.transitions.create('all', {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.short
    }),
    '& .icon-state': {
      fontSize: 40
    },
    '& .MuiTypography-h4': {
      color: '#767676',
      fontFamily: 'Nunito, Arial'
    },
    '&:hover': {
      boxShadow: theme.shadows[3],
      transition: theme.transitions.create('all', {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.short
      })
    }
  },
  inProccessTitle: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
    '& .in': {
      color: amber[300]
    }
  }
}))

const COLOR = {
  FINISHED: lightGreen[300],
  PAUSED: blueGrey[300],
  CANCELED: deepOrange[500],
  PROCCESS: amber[300]
}

export const CardState = styled.div`
  & .icon-state, & .MuiTypography-caption {
    ${({ state }) => css`
      color: ${COLOR[state]};
    `}
  }
  & .MuiTypography-caption {
    text-align: right;
    width: 100%;
  }
`