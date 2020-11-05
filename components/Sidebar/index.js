import { Avatar, Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Switch, Typography } from '@material-ui/core'
import RadioButtonUncheckedOutlinedIcon from '@material-ui/icons/RadioButtonUncheckedOutlined';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined'
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined'
import ReceiptOutlinedIcon from '@material-ui/icons/ReceiptOutlined'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useState } from 'react'
import clsx from 'clsx'

import { BiRocket, BiPackage } from 'react-icons/bi'

import useStyles, { useSidebarLinkStyles } from './styles'
import { AnimatePresence, motion } from 'framer-motion';

const SidebarLink = ({ open, fixed, title = '', Icon = RadioButtonUncheckedOutlinedIcon, href }) => {
  const { pathname } = useRouter()
  const classes = useSidebarLinkStyles()
  const active = pathname === href

  return (
    <Link href={href}>
      <ListItem button
        className={clsx({
          [classes.active]: active && (open || fixed),
          [classes.sidebarItemFolded]: active && !open && !fixed
        })}
      >
        <ListItemIcon>
          <Box display='flex' alignItems='center' className={clsx({ [classes.sidebarIconFolded]: active && !open && !fixed })}>
            <Icon size={22} className={clsx({ [classes.activeIcon]: active })} />
          </Box>
        </ListItemIcon>
        <ListItemText primary={<Typography>{ title }</Typography>} />
      </ListItem>
    </Link>
  )
}

const Sidebar = () => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [fixed, setFixed] = useState(true)

  return (
    <Drawer
      onMouseOver={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      variant='permanent'
      className={clsx({
        [classes.drawer]: true,
        [classes.drawerOpen]: open && !fixed,
        [classes.drawerClose]: !open && !fixed
      })}
      classes={{
        paper: clsx({
          [classes.drawerPaper]: true,
          [classes.drawerOpen]: open && !fixed,
          [classes.drawerClose]: !open && !fixed
        })
      }}
    >
      <Box>
        <Box width={260} display='flex' justifyContent='flex-end' paddingX={1} paddingTop={0.5}>
          <Switch
            checked={fixed}
            onChange={(e) => setFixed(e.target.checked)}
            size='small'
          />
        </Box>
        <Box marginY={(open || fixed) && 5} display='flex' alignItems='center' flexDirection='column'>
          <Avatar
            src='https://dl.airtable.com/DH4ROlhgSVG6TpXY0xrI_large_Joel-Monegro-pic-458x458.jpg'
            className={clsx({
              [classes.sidebarAvatar]: true,
              [classes.sidebarAvatarFolded]: !open && !fixed
            })}
          >U</Avatar>
          <AnimatePresence>
            {(open || fixed) && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={classes.nameUser}
              >
                <Typography variant='h5'>Santiago Ortega</Typography>
                <Typography variant='subtitle2'>Administrador</Typography>
              </motion.div>
            )}
          </AnimatePresence>
        </Box>
        <List>
          <SidebarLink href='/' Icon={BiRocket} title='Dashboard' open={open} fixed={fixed} />
          <SidebarLink href='/inventory' Icon={BiPackage} title='Inventario' open={open} fixed={fixed} />
          <SidebarLink href='/sales' Icon={ReceiptOutlinedIcon} title='Ventas' open={open} fixed={fixed} />
          <SidebarLink href='/users' Icon={PersonOutlineOutlinedIcon} title='Usuarios' open={open} fixed={fixed} />
        </List>
      </Box>
      <List>
        <SidebarLink href='/settings' Icon={SettingsOutlinedIcon} title='Configuración' open={open} fixed={fixed} />
      </List>
    </Drawer>
  )
}

export default Sidebar