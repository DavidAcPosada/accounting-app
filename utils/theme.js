import { createMuiTheme } from "@material-ui/core"

const theme = createMuiTheme({
  typography: {
    h5: {
      fontFamily: 'Nunito, Arial'
    },
    subtitle2: {
      fontFamily: 'Nunito, Arial',
      '&.bold': {
        fontWeight: 'bold'
      }
    }
  }
})

export default theme