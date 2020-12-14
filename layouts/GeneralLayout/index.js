import { useCollectionData,  } from 'react-firebase-hooks/firestore'
import { Avatar, Box, ButtonBase, Tooltip } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import AddIcon from '@material-ui/icons/Add'
import { useEffect } from 'react'
import useStyles from './styles'
import clsx from 'clsx'
import _ from 'lodash'

import { firestore } from './../../utils/firebase'

import { SET_ESTABLISHMENTS, SET_ACTIVE_ESTABLISHMENT } from '../../redux/types/establishments'

import Sidebar from '../../components/Sidebar'
import { Skeleton } from '@material-ui/lab'
import Loader from '../../components/Loader'

function GeneralLayout({ children, load = false, contentPadding = 2 }) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const establishmentsCollection = firestore.collection('establishments')
  const establishment = useSelector(state => state.establishments.establishments)
  const [establishments, loading, error] = useCollectionData(establishmentsCollection)

  useEffect(() => {
    if (!loading && !error) {
      const finded = establishments.find(element => element.active)
      if (finded) {
        dispatch({
          type: SET_ACTIVE_ESTABLISHMENT,
          payload: finded
        })
      }
      dispatch({ 
        type: SET_ESTABLISHMENTS,
        payload: establishments
      })
    }
  }, [establishments])

  const handleChangeEstablishment = async (id) => {
    await establishmentsCollection.where('active', '==', true)
      .get().then(async res => {
        const ids = []
        await res.forEach(item => {
          ids.push({
            id: item.id,
            data: item.data()
          })
        })
        return ids
      }).then(docs => {
        docs.forEach(doc => {
          establishmentsCollection.doc(doc.id).update({
            ...doc.data,
            active: false
          })
        })
      })
    await establishmentsCollection.doc(id)
      .get().then(res => {
        if (res.exists) {
          dispatch({
            type: SET_ACTIVE_ESTABLISHMENT,
            payload: {
              ...res.data(),
              id: res.id
            }
          })
          establishmentsCollection.doc(res.id).update({
            ...res.data(),
            active: true
          })
        }
      })
  }

  return (
    <div className={classes.root}>
      <div className={classes.establishmentsContainer}>
        <Box display='flex' justifyContent='center' marginY={2} marginBottom={4}>
          {[1, 2, 3].map((_, i) => <div key={i} className={classes.dot} />)}
        </Box>
        {!loading && establishment.map(item => (
          <Box
            key={item.id}
            marginBottom={2}
            className={clsx({ [classes.active]: item.active, [classes.inactive]: !item.active })}
            onClick={() => handleChangeEstablishment(item.id)}
          >
            <Tooltip title={_.startCase(item.name)} placement='right'>
              <ButtonBase>
                <Avatar className={clsx({
                  [classes.establishmentsAvatar]: true,
                  [classes.establishmentsAvatarActive]: item.active
                })}>
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
        {loading && [1, 2, 3].map(item => (<Skeleton key={item} classes={{ root: classes.loaderEstablishments }} variant='circle' width={56} height={56} />))}
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
      <Box padding={contentPadding} className={classes.content}>
        <Loader open={load} />
        {children}
      </Box>
    </div>
  )
}

export default GeneralLayout