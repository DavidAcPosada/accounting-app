import { CircularProgress, Typography } from '@material-ui/core'
import useStyles from './styles'

const Loader = (props: { open: boolean }) => {
  const { open } = props
  const classes = useStyles()
  
  if (!open) return null
  return (
    <div className={classes.root}>
      <CircularProgress
        color='primary'
        size={100}
        classes={{
          circle: classes.circle
        }}
      />
      <Typography variant='h5' className={classes.title}>Cargando</Typography>
    </div>
  )
}

export default Loader