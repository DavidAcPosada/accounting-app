import { Avatar, Box, Dialog, Table, TableBody, TableCell, TableRow, Tooltip } from '@material-ui/core'
import { teal, pink, deepPurple, lightGreen, orange } from '@material-ui/core/colors'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline'
import _ from 'lodash'

import useStyles, { StatCell } from './styles'

const COLORS = [
  teal[500],
  pink[400],
  deepPurple[400],
  lightGreen[400],
  orange[500]
]

const DetailsProductDialog = ({ open, onClose = () => {}, product = {} }) => {
  const classes = useStyles()
  return (
    <Dialog
      open={open}
      onClose={onClose}
      classes={{
        paper: classes.container
      }}
    >
      <Box className={classes.header} bgcolor={COLORS[Math.floor(Math.random() * COLORS.length)]}>
        <Avatar>{product?.name?.split(' ')?.slice(0, 2)?.map(char => char.substr(0, 1))?.join('')?.toUpperCase()}</Avatar>
      </Box>
      <Box paddingTop={9}>
        <Table size='small'>
          <TableBody>
            <TableRow>
              <TableCell width={100}>Nombre</TableCell>
              <StatCell>{_.startCase(product?.name)}</StatCell>
            </TableRow>
            <TableRow>
              <TableCell width={100}>Precio</TableCell>
              <StatCell>$ {new Intl.NumberFormat('es-ES', { currency: 'COP', minimumFractionDigits: 0 }).format(product?.price)}</StatCell>
            </TableRow>
            <TableRow>
              <TableCell width={100}>
                Stock
                <Tooltip title='La cantidad de unidades registradas en el sistema del producto'><HelpOutlineIcon fontSize='small' /></Tooltip>
              </TableCell>
              <StatCell>{product?.stock} uni.</StatCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
    </Dialog>
  )
}

export default DetailsProductDialog