import { Box, Checkbox, Snackbar, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import { useState } from "react"

import NewProductDialog from './../../../NewProductDialog'

import useStyles from './styles'

const SelectProducts = ({ products, handleChangeProducts }: { products: Array<any>, handleChangeProducts: any }) => {
  const classes = useStyles()
  const [newProduct, setNewProduct] = useState(false)
  const [newProductAlert, setNewProductAlert] = useState(false)
  const isSelected = (id: string): boolean => products.find(x => x.id === id && x.checked)

  const handleClick = (id: string) => {
    const isSelect = products.find(x => x.id === id && x.checked)
    const newSelection = products
    let index = -1
    if (isSelect) {
      index = products.indexOf(isSelect)
      newSelection[index].checked = false
    } else {
      const notSelected = products.find(x => x.id === id)
      index = products.indexOf(notSelected)
      newSelection[index].checked = true
    }
    handleChangeProducts(() => newSelection.map(item => item))
  }

  const handleSuccess = () => {
    setNewProductAlert(true)
    setNewProduct(false)
  }

  const handleCheckAll = (e: any) => {
    const newSelection = products
    handleChangeProducts(newSelection.map(item => ({ ...item, checked: e.target.checked })))
  }

  return (
    <>
      <Box textAlign='center' paddingBottom={2} fontSize={11}>
        <Typography>
          A continuación selecciona que productos tienes actualmente disponibles en tu inventario, omite este paso en caso de que todos los productos esten disponibles
        </Typography>
      </Box>
      <TableContainer className={classes.tableContainer}>
        <Box className={classes.tableHeader}>
          <Typography>
            {products.reduce((a, b) => b.checked ? a + 1 : a, 0)} seleccionados
          </Typography>
          <Checkbox
            indeterminate={products.reduce((a, b) => b.checked ? a + 1 : a, 0) < products.length}
            checked={products.reduce((a, b) => b.checked ? a + 1 : a, 0) === products.length}
            onChange={handleCheckAll}
          />
        </Box>
        <Table size='small'>
          <TableBody>
            {products.map(item => {
              const isItemSelected = isSelected(item.id)
              return (
                <TableRow
                  key={item.id}
                  selected={isItemSelected}
                  onClick={() => handleClick(item.id)}
                  hover
                  classes={{
                    root: classes.rowProducts
                  }}
                >
                  <TableCell>
                    <Typography>{item.name}</Typography>
                  </TableCell>
                  <TableCell align='right'>
                    <Checkbox
                      checked={item.checked}
                    />
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
        <Box padding={0.5} textAlign='right'>
          <Typography variant='caption'>
            ¿No está algún producto? <a href='#' onClick={() => setNewProduct(true)}>Registralo</a>
          </Typography>
        </Box>
      </TableContainer>
      <Box paddingY={1} textAlign='center'>
        <Typography variant='caption' color='textSecondary'>
          (Únicamente el ADMINISTRADOR del sistema podra agregar productos que no hayan sido seleccionados cuando se inicie la facturación)
        </Typography>
      </Box>
      <NewProductDialog open={newProduct} onClose={handleSuccess} />
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={newProductAlert}
        autoHideDuration={3000}
        onClose={() => setNewProductAlert(false)}
      >
        <Alert
          variant='filled'
          severity='success'
          onClose={() => setNewProductAlert(false)}>Se guardo correctamente un nuevo producto</Alert>
      </Snackbar>
    </>
  )
}

export default SelectProducts