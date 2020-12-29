import { CircularProgress, Typography } from '@material-ui/core'
import Lottie from 'react-lottie'

import animationData from './../../static/animations/ready.json'

import { ILoader } from './interface'

import useStyles from './styles'

const Loader = (props: ILoader) => {
  const { open, children, size, opacity = 0.3, type = 'LOADING' } = props
  const classes = useStyles(opacity)
  
  if (!open) return null
  return (
    <div className={classes.root}>
      {type === 'LOADING' && (
        <>
          <CircularProgress
            color='primary'
            size={size ?? 100}
            classes={{
              circle: classes.circle
            }}
          />
          <Typography variant='h5' className={classes.title}>{typeof children === 'string' ? children : 'Cargando'}</Typography>
        </>
      )}
      {type === 'READY' && (
        <>
          <Lottie
            height={100}
            width={100}
            options={{
              animationData,
              autoplay: true,
              loop: false
            }}
          />
          <Typography variant='h5' className={classes.title}>{typeof children === 'string' ? children : 'Hecho!'}</Typography>
        </>
      )}
    </div>
  )
}

export default Loader