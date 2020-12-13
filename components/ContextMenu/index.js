import { Box, ListItemIcon, MenuItem, MenuList, Paper, Typography } from "@material-ui/core"
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import DetailsIcon from '@material-ui/icons/Details'
import clsx from 'clsx'

import useStyles from './styles'

const ContextMenu = ({ setContextRef = () => {}, position = {left: 0, top: 0, outside: false, show}, details = {} }) => {
  const classes = useStyles()

  return (
    <Box className={clsx({
      [classes.contextMenu]: true,
      [classes.outside]: position.outside,
      [classes.hidden]: !position.show
    })} position='absolute' {...position}>
      <div className={classes.arrow} />
      <Paper ref={ref => setContextRef(ref)}>
        <MenuList className={classes.menu}>
          <MenuItem>
            <Typography variant='inherit'>Detalles</Typography>
            <ListItemIcon>
              <DetailsIcon fontSize='small' />
            </ListItemIcon>
          </MenuItem>
          <MenuItem>
            <Typography variant='inherit'>Editar</Typography>
            <ListItemIcon>
              <EditOutlinedIcon fontSize='small' />
            </ListItemIcon>
          </MenuItem>
          <MenuItem>
            <Typography variant='inherit'>Borrar</Typography>
            <ListItemIcon>
              <DeleteOutlineOutlinedIcon fontSize='small' />
            </ListItemIcon>
          </MenuItem>
        </MenuList>
      </Paper>
  </Box>
  )
}

export default ContextMenu