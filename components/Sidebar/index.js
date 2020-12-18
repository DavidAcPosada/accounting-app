import { Avatar, Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Switch, Typography, Icon, Chip, Badge } from '@material-ui/core'
import RadioButtonUncheckedOutlinedIcon from '@material-ui/icons/RadioButtonUncheckedOutlined';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined'
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined'
import ReceiptOutlinedIcon from '@material-ui/icons/ReceiptOutlined'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import clsx from 'clsx'

import { BiRocket, BiPackage } from 'react-icons/bi'

import useStyles, { useSidebarLinkStyles } from './styles'
import { AnimatePresence, motion } from 'framer-motion';
import { firestore } from '../../utils/firebase';

const SidebarLink = ({ open, fixed, title = '', icon = 'apps', href, enable, badge, badge_text }) => {
  const { pathname } = useRouter()
  const classes = useSidebarLinkStyles()
  const active = pathname === href

  return (
    <Link href={enable ? href : '#'} >
        <ListItem button
          className={clsx({
            [classes.active]: active && (open || fixed),
            [classes.sidebarItemFolded]: active && !open && !fixed,
            [classes.disabled]: !enable
          })}
        >
          <ListItemIcon>
            <Box display='flex' alignItems='center' className={clsx({ [classes.sidebarIconFolded]: active && !open && !fixed })}>
              <Badge color='secondary' variant='dot' invisible={!badge}>
                <Icon size={22} className={clsx({ [classes.activeIcon]: active, 'material-icons-outlined': true })}>{icon}</Icon>
              </Badge>
            </Box>
          </ListItemIcon>
          <ListItemText primary={
            <Typography className={clsx({[classes.textWithBadge]: badge})}>
              { title }{' '}
              {badge && (
                <Chip
                  label={badge_text}
                  size='small'
                  color='secondary'
                />
              )}
            </Typography>} />
        </ListItem>
    </Link>
  )
}

const Sidebar = () => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [fixed, setFixed] = useState(true)

  const [routes, setRoutes] = useState([])

  useEffect(() => {
    firestore.collection('routes').orderBy('order', 'asc')
      .onSnapshot(snapshot => {
        const results = []
        snapshot.docs.forEach(item => {
          results.push({
            id: item.id,
            ...item.data()
          })
        })
        setRoutes(results)
      })
  }, [])

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
          {routes.map(route => (
            <SidebarLink
              key={route.id}
              href={route.uri}
              icon={route.icon}
              title={route.title}
              open={open}
              fixed={fixed}
              {...route}
            />
          ))}
        </List>
      </Box>
      <List>
        <SidebarLink
          href='/settings'
          icon='settings'
          title='Configuración'
          open={open}
          fixed={fixed}
          enable
        />
      </List>
    </Drawer>
  )
}

export default Sidebar