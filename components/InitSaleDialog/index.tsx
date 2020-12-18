import { Button, Dialog, DialogActions, DialogTitle, IconButton, DialogContent } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import { IProps } from './interface'

import useStyles from './styles'

const InitSaleDialog = ({ open, onClose }: IProps) => {
  const classes = useStyles()

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth='sm'
      fullWidth
      scroll='paper'
    >
      <DialogTitle className={classes.title}>
        Iniciar nueva facturación
        <IconButton size='small' onClick={onClose} color='secondary'><Close /></IconButton>
      </DialogTitle>
      <div>
        no scroll content
      </div>
      <DialogContent>
        lorem
      </DialogContent>
      <DialogActions>
        <Button size='small' onClick={() => onClose()}>Cancelar</Button>
        <Button size='small' color='primary' variant='contained'>Continuar</Button>
      </DialogActions>
    </Dialog>
  )
}

export default InitSaleDialog