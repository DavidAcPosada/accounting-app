import { Avatar, Box, ButtonBase, Grid, Tooltip } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useStyles from './styles'
import Axios from 'axios'
import clsx from 'clsx'
import _ from 'lodash'

import { SET_ESTABLISHMENTS } from '../../redux/types/establishments'

import Sidebar from '../../components/Sidebar'

function GeneralLayout({ children, contentPadding = 2 }) {
  const dispatch = useDispatch()
  const establishment = useSelector(state => state.establishments)
  const classes = useStyles()

  useEffect(() => {
    Axios.get('/api/establishments')
      .then(res =>
        dispatch({
          type: SET_ESTABLISHMENTS,
          payload: res.data.data
        })
      ).catch(err => console.error(err.toString()))
  }, [])

  const handleChangeEstablishment = (id) => {
    Axios.post(`/api/establishments/change/${id}`)
      .then(res => console.log(res))
  }

  return (
    <div className={classes.root}>
      <div className={classes.establishmentsContainer}>
        <Box display='flex' justifyContent='center' marginY={2} marginBottom={4}>
          {[1, 2, 3].map((_, i) => <div key={i} className={classes.dot} />)}
        </Box>
        {establishment.map(item => (
          <Box
            key={item._id}
            marginBottom={2}
            className={clsx({ [classes.active]: item.active, [classes.inactive]: !item.active })}
            onClick={() => handleChangeEstablishment(item._id)}
          >
            <Tooltip title={_.startCase(item.name)} placement='right'>
              <ButtonBase>
                <Avatar className={classes.establishmentsAvatar}>
                  {
                    item.name
                    .split(' ')
                    .map(frag => frag.substr(0, 1).toUpperCase())
                    .slice(0, 2).join('')
                  }
                </Avatar>
              </ButtonBase>
            </Tooltip>
          </Box>
        ))}
        <Box marginBottom={2}>
          <Tooltip title='Nuevo establecimiento' placement='right'>
            <ButtonBase>
              <Avatar className={clsx(classes.establishmentsAvatar, classes.addAvatar)}>
                <AddIcon />
              </Avatar>
            </ButtonBase>
          </Tooltip>
        </Box>
      </div>
      <div style={{ position: 'relative' }}>
        <Sidebar />
      </div>
      <Box padding={contentPadding} bgcolor='#FAFAFA' width='100%' height='100vh' maxHeight='100vh'>
        {children}
      </Box>
    </div>
  )
}

export default GeneralLayout