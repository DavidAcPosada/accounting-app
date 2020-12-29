import { createMuiTheme } from "@material-ui/core"

const theme = createMuiTheme({
  typography: {
    h2: {
      fontFamily: 'Nunito, Arial',
      fontWeight: 600
    },
    h5: {
      fontFamily: 'Nunito, Arial'
    },
    subtitle2: {
      fontFamily: 'Nunito, Arial',
      '&.bold': {
        fontWeight: 'bold'
      }
    }
  },
  overrides: {
    MuiButton: {
      root: {
        fontFamily: 'Nunito, Arial',
        borderRadius: 50
      }
    }
  }
})

export default theme