import { Grid, Box, Fab, TextField, InputAdornment, Snackbar, Tooltip, Typography } from '@material-ui/core'
import { Add, Delete, Details, Edit, SearchOutlined } from '@material-ui/icons'
import { DataGrid } from '@material-ui/data-grid'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Alert } from '@material-ui/lab'
import clsx from 'clsx'
import _ from 'lodash'

import GeneralLayout from '../../layouts/GeneralLayout'

import { firestore } from '../../utils/firebase'

import DetailsProductDialog from '../../components/DetailsProductDialog'
import NewProductDialog from '../../components/NewProductDialog'
import TableOverlay from '../../components/TableOverlay'
import TableFooter from '../../components/TableFooter'

import InventoryImage from '../../static/image/inventory.svg'

import useStyles from './../../styles/pages/inventory'

const Inventory = ({ ...props }) => {
  const classes = useStyles()
  const activeEstablishment = useSelector(state => state.establishments.active)
  const [details, setDetails] = useState({ open: false, product: {} })
  const [openNewProduct, setOpenNewProduct] = useState(false)
  const [data, setData] = useState([])
  const [load, setLoad] = useState(true)
  const [openAlert, setOpenAlert] = useState({
    open: false,
    message: null,
    severity: 'success'
  })

  const handleCloseAlert = () => setOpenAlert({ ...openAlert, open: false})

  const columns = [
    { field: 'name', headerName: 'Nombre', width: 300 },
    { field: 'price', headerName: 'Precio', headerAlign: 'center', width: 150, type: 'number', 
      valueFormatter: ({ value }) =>
        new Intl.NumberFormat('es-ES', {
          style: 'currency',
          currency: 'COP',
          minimumFractionDigits: 0
        }).format(value)
    },
    { field: 'stock', headerName: 'Stock', headerAlign: 'center', type: 'number',
      renderCell: ({ value }) => (
        <Box width='100%' textAlign='center'>{value} uni.</Box>
      )
    },
    {
      field: 'action', headerName: ' ', width: 180, align: 'center', renderCell: ({ data }) => (
        <div className={classes.btnGroup}>
          <Tooltip title='Detalles' placement='top'>
            <Fab size='small' onClick={() => setDetails({ open: true, product: data })}><Details /></Fab>
          </Tooltip>
          <Tooltip title='Editar' placement='top'>
            <Fab size='small'><Edit /></Fab>
          </Tooltip>
          <Tooltip title='Borrar' placement='top'>
            <Fab size='small'><Delete /></Fab>
          </Tooltip>
        </div>
      )
    }
  ]
  
  async function fetchData() {
    if (activeEstablishment && activeEstablishment.id) {
      const establishment = await firestore.collection('establishments').doc(activeEstablishment.id)
      await firestore.collection('products').where('establishment', '==', establishment)
        .onSnapshot(async snapshot => {
          const products = []
          await snapshot.docs.forEach(element => 
            products.push({
              id: element.id,
              ...element.data()
            }))
          setData(products)
          setLoad(false)
        })
    }
  }

  const handleClose = (success = null) => {
    if (success) {
      setOpenAlert({
        open: true,
        severity: 'success', 
        message: `${success?.name} guardado con exito!`
      })
    }
    setOpenNewProduct(false)
  }

  useEffect(() => {
    fetchData()
  }, [activeEstablishment])

  return (
    <GeneralLayout contentPadding={4} load={load}>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={openAlert.open}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert variant='filled' severity={openAlert.severity} onClose={handleCloseAlert}>{openAlert.message}</Alert>
      </Snackbar>
      <Box className={classes.hero}>
        <InventoryImage className={classes.heroImage} />
        <Box paddingY={2} color='#212121' height='100%' display='flex' flexDirection='column' justifyContent='center' alignItems='flex-start'>
          <Typography variant='h2'>Inventario {activeEstablishment.name}</Typography>
          <Typography color='textSecondary'>Inventario y registro de los productos del establecimiento seleccionado</Typography>
        </Box> 
      </Box>
      <Grid container spacing={2} className={classes.container}>
        <Grid item xs={12} className={classes.content}>
          <Box
            width='100%'
            className={clsx(classes.card, classes.items)}
          >
            <Box display='flex' justifyContent='flex-end' paddingBottom={1}>
              <TextField
                label='Buscar'
                variant='outlined'
                size='small'
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <SearchOutlined />
                    </InputAdornment>
                  )
                }}
              />
              <Fab
                color='primary'
                size='small'
                className={classes.dataTableControls}
                onClick={() => setOpenNewProduct(!openNewProduct)}
              >
                <Add />
              </Fab>
            </Box>
            <DataGrid
              ref={(ref) => ref ? ref.parentElement.style.height = 'unset' : ref }
              rows={data}
              columns={columns}
              className={classes.dataTable}
              autoHeight
              hideFooter={!data.length}
              components={{
                noRowsOverlay: TableOverlay,
                footer: TableFooter
              }}
            />
          </Box>
        </Grid>
      </Grid>
      <NewProductDialog open={openNewProduct} onClose={handleClose} />
      <DetailsProductDialog {...details} onClose={() => setDetails({ ...details, open: false })} />
    </GeneralLayout>
  )
}

export default Inventory