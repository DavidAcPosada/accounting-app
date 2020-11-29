import { Grid, Box, Typography, IconButton, Avatar, Fab, TextField, InputAdornment, Snackbar } from '@material-ui/core'
import { Add, CloseOutlined, SearchOutlined } from '@material-ui/icons'
import { AnimatePresence, motion } from 'framer-motion'
import { DataGrid } from '@material-ui/data-grid'
import { useState, useEffect, useRef } from 'react'
import clsx from 'clsx'
import _ from 'lodash'

import GeneralLayout from '../../layouts/GeneralLayout'

import { firestore } from '../../utils/firebase'

import NewProductDialog from '../../components/NewProductDialog'
import TableOverlay from '../../components/TableOverlay'
import TableFooter from '../../components/TableFooter'

import useStyles, { ANIMATIONS } from './../../styles/pages/inventory'
import { useSelector } from 'react-redux'
import { Alert } from '@material-ui/lab'

const Inventory = ({ ...props }) => {
  const classes = useStyles()
  const tableRef = useRef()
  const activeEstablishment = useSelector(state => state.establishments.active)
  const [showDetails, setShowDetails] = useState({
    show: false,
    row: {}
  })
  const [openNewProduct, setOpenNewProduct] = useState(true)
  const [data, setData] = useState([])
  const [openAlert, setOpenAlert] = useState({
    open: true,
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
      valueFormatter: ({ value }) => `${ value } uni.`
    },
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
        })
    }
  }

  useEffect(() => {
    if (tableRef.current) {
      tableRef.current.parentElement.style.height = 'auto'
    }
  }, [tableRef.current])

  useEffect(() => {
    fetchData()
    setShowDetails({
      ...showDetails,
      show: false
    })
  }, [activeEstablishment])

  const handleSelectTable = (selection) => {
    const product = selection.rows[0]
    if (product && product.id) {
      setShowDetails({
        show: true,
        row: product
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

  return (
    <GeneralLayout contentPadding={4}>
    <Snackbar open={openAlert.open} autoHideDuration={6000} onClose={handleCloseAlert}>
      <Alert severity={openAlert.severity} onClose={handleCloseAlert}>{openAlert.message}</Alert>
    </Snackbar>
      <Grid container spacing={2}>
        <Grid item xs={12} className={classes.content}>
          <AnimatePresence>
            <motion.div
              key='1'
              className={clsx(classes.card, classes.items)}
              initial={{ width: '100%' }}
              animate={showDetails.show ? 'expanded' : 'collapsed'}
              variants={ANIMATIONS.tableVariants}
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
                ref={tableRef}
                rows={data}
                columns={columns}
                className={classes.dataTable}
                disableMultipleSelection
                onSelectionChange={handleSelectTable}
                autoHeight
                components={{
                  noRowsOverlay: TableOverlay,
                  footer: TableFooter
                }}
              />
            </motion.div>
            <motion.div
              key='2'
              className={clsx(classes.card, classes.details)}
              animate={showDetails.show ? 'expanded' : 'collapsed'}
              variants={ANIMATIONS.detailsVariants}
            >
              <Box display='flex' justifyContent='space-between' width='100%' marginBottom={2.5}>
                <Typography variant='h6'>Detalles del Producto</Typography>
                <IconButton color='secondary' size='small' onClick={() => setShowDetails({ show: false, row: showDetails.row })}>
                  <CloseOutlined />
                </IconButton>
              </Box>
              <Grid container>
                <Grid item lg={12} xl={4} container justify='center'>
                  <Avatar className={classes.detailAvatar}>{showDetails?.row?.name?.split(' ')?.map(frag => frag.substr(0, 1)).splice(0, 2).join('').toUpperCase()}</Avatar>
                </Grid>
                <Grid item container spacing={1} lg={12} xl={8} >
                  <Grid item xs={12}>
                    <Typography variant='subtitle2' className='bold'>Nombre</Typography>
                    <Typography variant='body2'>{ showDetails.row.name }</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant='subtitle2' className='bold'>Precio</Typography>
                    <Typography variant='body2'>{ new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(showDetails?.row?.price ?? 0) }</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant='subtitle2' className='bold'>Stock</Typography>
                    <Typography variant='body2'>{ showDetails.row.stock } unidades</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </motion.div>
          </AnimatePresence>
        </Grid>
      </Grid>
      <NewProductDialog open={openNewProduct} onClose={handleClose} />
    </GeneralLayout>
  )
}

export default Inventory