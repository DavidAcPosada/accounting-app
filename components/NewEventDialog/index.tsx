import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, PaperProps, Table, TableBody, TableCell, TableRow, TextField, Typography } from "@material-ui/core"
import { FieldArray, Formik } from "formik"
import Draggable from 'react-draggable'

import useStoreProducts from "../../utils/hooks/useStoreProdutcs"

import NumberFormatInput from "../NumberFormatInput"

import useStyles from './styles'

import { IInitialValues, INewEventDialog } from "./interface"

const PaperComponent = (props: PaperProps) => (
  <Draggable
    handle='#draggable-dialog-title'
    cancel='[class*="MuiDialogContent-root"]'
    bounds='parent'
  >
    <Paper {...props} />
  </Draggable>
)

const NewEventDialog = (props: INewEventDialog) => {
  const { open, onClose } = props
  const classes = useStyles()
  const { products = [] } = useStoreProducts(false)

  const onSubmit = (values: IInitialValues) => {
    console.log(values)
  }

  return (
    <Formik
      initialValues={{
        name: '',
        prices: products
      }}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({ values, touched, handleChange, handleBlur, handleSubmit, resetForm }) => (
        <Dialog
          id='new-event-backdrop'
          PaperComponent={PaperComponent}
          maxWidth='sm'
          open={open}
          fullWidth
        >
          <form onSubmit={handleSubmit}>
            <DialogTitle style={{ cursor: 'move' }} id='draggable-dialog-title'>
              Registrar un nuevo evento
            </DialogTitle>
            <DialogContent>
              <TextField
                value={values.name}
                label='Nombre del evento'
                variant='outlined'
                size='small'
                fullWidth
                name='name'
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Table size='small'>
                <TableBody>
                  <FieldArray name='prices'>
                    {() => values.prices.length && values.prices.map((item: any, index: number) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <Typography className={classes.productName}>{item.name}</Typography>
                        </TableCell>
                        <TableCell align='right'>
                          <TextField
                            name={`prices.${index}.price`}
                            size='small'
                            value={item.price}
                            variant='outlined'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            InputProps={{
                              inputComponent: NumberFormatInput,
                              inputProps: {
                                prefix: '$',
                              }
                            }}
                            />
                        </TableCell>
                      </TableRow>
                    ))}
                  </FieldArray>
                </TableBody>
              </Table>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => { onClose(); resetForm() }}>Cancelar</Button>
              <Button variant='contained' color='primary' type='submit'>Guardar</Button>
            </DialogActions>
          </form> 
        </Dialog>
      )}
    </Formik>
  )
}

export default NewEventDialog