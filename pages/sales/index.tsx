import { Box, Button, Typography } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'

import SalesImage from './../../static/image/sales.svg'

import { firestore } from '../../utils/firebase'

import GeneralLayout from '../../layouts/GeneralLayout'

import useStyles, { NewInvoice } from '../../styles/pages/sales'
import { ISales } from '../../models/sales'
import SalesScreen from '../../components/salesLayers/SalesScreen'

const Sales = () => {
  const classes = useStyles()
  const activeEstablishment = useSelector((state: any) => state.establishments.active)
  const { query, ...router } = useRouter()

  const [load, setLoad] = useState<boolean>(true)
  const [sales, setSales] = useState<Array<ISales>>([])

  const fetchData = async () => {
    if (activeEstablishment && activeEstablishment.id) {
      if (query.screen === 'new') router.push('/sales')
      const establishment = await firestore.collection('establishments').doc(activeEstablishment.id)

      firestore.collection('sales').where('establishment', '==', establishment).get().then(async (res) => {
        const details: Array<ISales> = []
        res.forEach(item => {
          details.push({
            id: item.id,
            date: item.data().date,
            establishment: item.data().establishment,
            sales: item.data().sales,
            state: item.data().state,
            total: item.data().total
          })
        })
        setSales(details)
        setLoad(false)
      })
    }
  }

  useEffect(() => {
    fetchData()
  }, [activeEstablishment])

  const newInvoice = () => {
    router.push('?screen=new')
  }

  return (
    <GeneralLayout load={load}>
      <Box className={classes.hero}>
        {query.screen && <Button className={classes.backButton} onClick={() => router.back()}>Ir atrás</Button>}
        <SalesImage className={classes.heroImage} />
        <Box paddingX={2} color='#212121' height='100%' display='flex' flexDirection='column' justifyContent='center' alignItems='flex-start'>
          <Typography variant='h2'>Ventas {activeEstablishment.name}</Typography>
          <Typography color='textSecondary'>Detalle de facturación de ventas registradas en el sistema</Typography>
          {!query.screen && <NewInvoice variant='contained' onClick={() => newInvoice()}>Iniciar Facturación</NewInvoice>}
        </Box>
      </Box>
      <SalesScreen screen={query.screen} setLoad={setLoad} />
    </GeneralLayout>
  )
}

export default Sales