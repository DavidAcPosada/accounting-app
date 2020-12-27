import { Box, Typography } from '@material-ui/core'
import clsx from 'clsx'
import NoResultsImage from '../../../static/image/no-results-2.svg'
import { useSecondaryStyles } from '../styles'

interface ISecondary {
  text?: string;
  actionButton?: React.ReactElement;
}

const Secondary = ({ text, actionButton }: ISecondary) => {
  const classes = useSecondaryStyles()

  return (
    <Box className={classes.root}>
      <NoResultsImage className={classes.image} />
      <Typography variant='h5' className={classes.ups}>Ups!</Typography>
      <Typography variant='subtitle2'>{text}</Typography>
      <div className={clsx(classes.buttonAction, classes.secondaryActionBtn)}>{actionButton}</div>
    </Box>
  )
}

export default Secondary