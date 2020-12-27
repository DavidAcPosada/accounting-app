import { Typography } from '@material-ui/core'
import NoResultsImage from '../../../static/image/no-results.svg'

import useStyles from './../styles'

const Primary = ({ text, actionButton }: { text?: string, actionButton?: any }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <NoResultsImage className={classes.image} />
      <div>
        <Typography variant='h3' className={classes.title}>No se encontraron resultados</Typography>
        <Typography variant='h5'>{text}</Typography>
        <div className={classes.buttonAction}>
          {actionButton}
        </div>
      </div>
    </div>
  )
}

export default Primary