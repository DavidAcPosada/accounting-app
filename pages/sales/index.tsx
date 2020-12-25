import { Box, Button, Typography } from '@material-ui/core'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'

import SalesImage from './../../static/image/sales.svg'

import GeneralLayout from '../../layouts/GeneralLayout'

import useStyles, { NewInvoice } from '../../styles/pages/sales'
import SalesScreen from '../../components/salesLayers/SalesScreen'
import InitSaleDialog from '../../components/InitSaleDialog'

const Sales = () => {
  const classes = useStyles()
  const activeEstablishment = useSelector((state: any) => state.establishments.active)
  const { query, ...router } = useRouter()

  const [load, setLoad] = useState<boolean>(true)
  const [newSale, setNewSale] = useState<boolean>(false)

  return (
    <GeneralLayout load={load}>
      <Box className={classes.hero}>
        {query.screen && <Button className={classes.backButton} onClick={() => router.back()}>Ir atrás</Button>}
        <SalesImage className={classes.heroImage} />
        <Box paddingX={2} color='#212121' height='100%' display='flex' flexDirection='column' justifyContent='center' alignItems='flex-start'>
          <Typography variant='h2'>Ventas {activeEstablishment.name}</Typography>
          <Typography color='textSecondary'>Detalle de facturación de ventas registradas en el sistema</Typography>
          {!query.screen && <NewInvoice variant='contained' onClick={() => setNewSale(true)}>Iniciar Facturación</NewInvoice>}
        </Box>
      </Box>
      <SalesScreen screen={query.screen} setLoad={setLoad} newSale={() => setNewSale(true)} />
      <InitSaleDialog open={newSale} onClose={() => setNewSale(false)} />
    </GeneralLayout>
  )
}

export default Sales