import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { Cancel, HowToVote, Pause } from "@material-ui/icons"
import { Box, Grid, Typography } from "@material-ui/core"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useRouter } from "next/router"
import dayjs from 'dayjs'
import _ from 'lodash'

import { ISales, IStates } from "../../../models/sales"

import { firestore } from "../../../utils/firebase"

import useStyles, { CardState } from './styles'

const STATES: IStates = {
  FINISHED: <CheckCircleOutlineIcon className='icon-state' />,
  CANCELED: <Cancel className='icon-state' />,
  PAUSED: <Pause className='icon-state' />,
  PROCCESS: <HowToVote className='icon-state' />
}

const List = (props: any) => {
  const { setLoad } = props
  const classes = useStyles()
  const { query, ...router} = useRouter()
  const activeEstablishment = useSelector((state: any) => state.establishments.active)
  const [sales, setSales] = useState<Array<ISales>>([])
  const [salesOnProccess, setSalesOnProccess] = useState<Array<ISales>>([])

  const fetchData = async () => {
    if (activeEstablishment && activeEstablishment.id) {
      if (query.screen === 'new') router.push('/sales')
      const establishment = await firestore.collection('establishments').doc(activeEstablishment.id)

      firestore.collection('sales').where('establishment', '==', establishment)
        .onSnapshot(async snapshot => {
          const details: Array<ISales> = []
          const inProccess: Array<ISales> = []
          snapshot.docs.forEach(item => {
            const newElement = {
              id: item.id,
              date: new Date(item.data().date.seconds * 1000),
              sales: item.data().sales,
              state: item.data().state,
              total: item.data().total
            }
            if (item.data().state === 'PROCCESS') inProccess.push(newElement)
            details.push(newElement)
          })
          setSales(details)
          setSalesOnProccess(inProccess)
          setLoad(false)
        })
    }
  }

  useEffect(() => {
    if (activeEstablishment && activeEstablishment.id) fetchData()
  }, [activeEstablishment])

  const viewDetails = (id: string | undefined) => {
    router.push(`?screen=details&id=${id}`)
  }

  const state = (state: string | undefined) => {
    switch (state) {
      case 'PROCCESS':
        return 'En Proceso'
      case 'PAUSED':
        return 'En Pausa'
      case 'FINISHED':
        return 'Finalizado'
      case 'CANCELED':
        return 'Cancelado'
      default: return ''
    }
  }

  const InvoiceCard = (item: ISales) => (
    <CardState className={classes.itemCard} state={item.state} onClick={() => viewDetails(item.id)}>
      <Typography variant='caption'>{state(item.state)}</Typography>
      <Typography variant='subtitle2'>{_.startCase(dayjs(item.date).format('dddd'))}</Typography>
      <Typography variant='h5'>{dayjs(item.date).format('D MMMM, YYYY')}</Typography>
      <Box display='flex' justifyContent='space-between' alignItems='center' marginTop={4}>
        {STATES[item.state]}
        <Typography variant='h4'>$ {new Intl.NumberFormat('es-ES', { currency: 'COP', minimumFractionDigits: 0 }).format(item.total)}</Typography>
      </Box>
    </CardState>
  )

  return (
    <Box paddingTop={13}>
      {salesOnProccess.length > 0 && (
        <Grid container>
          <Grid item xs={12}>
            <Typography variant='h5' className={classes.inProccessTitle}>Facturación <span className='in'>en Proceso</span></Typography>
          </Grid>
          {sales.map((item: ISales) => (
            <Grid key={item.id} item xs={3}>
              <InvoiceCard key={item.id} {...item} />
            </Grid>
          ))}
        </Grid>
      )}
      <Grid container>
        {sales.map((item: ISales) => (
          <Grid key={item.id} item xs={3}>
            <InvoiceCard key={item.id} {...item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default List