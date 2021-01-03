import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { indigo } from "@material-ui/core/colors";

export default makeStyles((theme: Theme) => createStyles({
  root: {
    padding: 0,
    boxShadow: 'none',
    minWidth: 600,
    maxWidth: 600
  },
  rootMessage: {
    width: '100%',
    padding: 0
  },
  content: {
    width: '100%',
    backgroundColor: indigo[50],
    borderColor: indigo[300]
  },
  actionRoot: {
    padding: theme.spacing(2),
    justifyContent: 'space-between'
  },
  list: {
    maxHeight: 'calc(100vh - 50%)'
  },
  cell: {
    border: 0
  }
}))