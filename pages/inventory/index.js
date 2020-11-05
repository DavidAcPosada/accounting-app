import { Grid, Box, Typography, IconButton, Avatar, Fab, TextField, InputAdornment } from '@material-ui/core'
import { Add, CloseOutlined, SearchOutlined } from '@material-ui/icons'
import { AnimatePresence, motion } from 'framer-motion'
import { DataGrid } from '@material-ui/data-grid'
import { useState, useEffect } from 'react'
import Axios from 'axios'
import clsx from 'clsx'
import _ from 'lodash'

import GeneralLayout from '../../layouts/GeneralLayout'

import NewProductDialog from '../../components/NewProductDialog'
import TableOverlay from '../../components/TableOverlay'
import TableFooter from '../../components/TableFooter'

import useStyles, { ANIMATIONS } from './styles'

const Inventory = ({ establishments, ...props }) => {
  const classes = useStyles()
  const [showDetails, setShowDetails] = useState({
    show: false,
    row: {}
  })
  const [openNewProduct, setOpenNewProduct] = useState(false)
  const [data, setData] = useState([])

  const columns = [
    { field: 'name', headerName: 'Nombre', width: 200 },
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

  useEffect(() => {
    if (Array.isArray(establishments)) setData(establishments.map(item => ({ id: item._id, ...item })))
  }, [])

  const handleSelectTable = (selection) => {
    const product = selection.rows[0]
    if (product && product._id) {
      setShowDetails({
        show: true,
        row: product
      })
    }
  }

  return (
    <GeneralLayout contentPadding={4}>
      <Grid container spacing={2}>
        <Grid item xs={12} classes={{ root: classes.searchbar }}>
          <Box className={clsx(classes.card, classes.cardSearch)} width='100%' overflow='hidden'>
            <TextField
              placeholder='Buscar'
              InputProps={{
                classes: {
                  input: classes.inputBase
                },
                startAdornment: (
                  <InputAdornment classes={{ root: classes.inputAdornedStart }}>
                    <SearchOutlined />
                  </InputAdornment>
                )
              }}
              fullWidth
            />
          </Box>
          <Fab color='primary' size='small' onClick={() => setOpenNewProduct(!openNewProduct)}>
            <Add />
          </Fab>
        </Grid>
        <Grid item xs={12} className={classes.content}>
          <AnimatePresence>
            <motion.div
              key='1'
              className={clsx(classes.card, classes.items)}
              initial={{ width: '100%' }}
              animate={showDetails.show ? 'expanded' : 'collapsed'}
              variants={ANIMATIONS.tableVariants}
            >
              <DataGrid
                rows={data}
                columns={columns}
                disableMultipleSelection
                onSelectionChange={handleSelectTable}
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
      <NewProductDialog open={openNewProduct} onClose={() => setOpenNewProduct(false)} />
    </GeneralLayout>
  )
}

Inventory.getInitialProps = async (ctx) => {
  const response = { establishments: [] }
  const axioscfg = ctx.req ? {baseURL:'http://localhost:3000'} : {}
  const results = await Axios.get('/api/products', axioscfg)
    .then(res => res.data)
    .catch(err => console.log(err.toString()))
  if (results && results.success) {
    response.establishments = results.data
    return response
  } else {
    return response
  }
}

export default Inventory