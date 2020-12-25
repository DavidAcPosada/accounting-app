import { makeStyles } from "@material-ui/core";
import { pink } from "@material-ui/core/colors";

export default makeStyles(theme => ({
  tableContainer: {
    border: '1px solid #ddd',
    borderRadius: 5,
    maxHeight: 500
  },
  tableHeader: {
    backgroundColor: pink[300],
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(.5, 1),
    color: '#FFF',
    '& .MuiCheckbox-root': {
      color: '#FFF'
    }
  },
  rowProducts: {
    cursor: 'pointer',
    '& .MuiTableCell-root': {
      padding: theme.spacing(1),
      paddingTop: 0,
      paddingBottom: 0,
    }
  }
}))