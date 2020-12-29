import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Icon, Paper, PaperProps, Table, TableBody, TableCell, TableRow, TextField, Typography } from "@material-ui/core"
import { FieldArray, Formik } from "formik"
import Draggable from 'react-draggable'
import clsx from "clsx"
import _ from 'lodash'

import NEW_EVENT_DIALOG_VALIDATIONS from "../../utils/validations/NewEventDialogValidations"
import useStoreProducts from "../../utils/hooks/useStoreProdutcs"
import formatNumber from "../../utils/helpers/formatNumber"

import NumberFormatInput from "../NumberFormatInput"

import { IInitialValues, INewEventDialog } from "./interface"
import useStyles from './styles'
import { firestore } from "../../utils/firebase"
import { useSelector } from "react-redux"
import { IStore } from "../../redux/interface"
import { useState } from "react"
import { useSnackbar } from "notistack"
import Loader from "../Loader"

const PaperComponent = (props: PaperProps) => (
  <Draggable
    handle='#draggable-dialog-title'
    cancel='[class*="MuiDialogContent-root"]'
    bounds='parent'
  >
    <Paper {...props} />
  </Draggable>
)

const NewEventDialog = ({ open, onClose }: INewEventDialog) => {
  const classes = useStyles()
  const activeEstablishment = useSelector((state: IStore) => state.establishments.active)
  const { products = [] } = useStoreProducts(false)
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const [snackAppear, setSnackAppear] = useState<boolean>(false)
  const [saved, setSaved] = useState<boolean>(false)

  const saveEvent = (values: IInitialValues) => {
    const establishment = firestore.collection('establishments').doc(activeEstablishment.id)
    const prices = values.prices.map((item: any) => {
      const ref = firestore.collection('products').doc(item.id)
      return {
        product: ref,
        price: Number(item.price)
      }
    })
    const data = {
      _id: values.name.split(' ').map(item => item.substr(0, 1)).join('').toUpperCase(),
      establishment,
      name: values.name,
      prices,
      status: true
    }
    firestore.collection('events').add(data)
      .then((res) => {
        if (res.id) {
          setSaved(true)
          setTimeout(() => {
            onClose()
          }, 2000)
        }
      }).catch(err => {
        enqueueSnackbar(err.toString(), {
          variant: 'error',
          autoHideDuration: 6000,
          anchorOrigin: { vertical: 'top', horizontal: 'right' }
        })
      })
  }

  const onSubmit = async (values: IInitialValues) => {
    if (_.isEqual(values.prices, products)) {
      setSnackAppear(true)
      enqueueSnackbar('No han habido cambios en ningun producto, deseas continuar?', {
        anchorOrigin: { vertical: 'top', horizontal: 'right'},
        variant: 'warning',
        persist: true,
        preventDuplicate: true,
        action: (key) => (
          <>
            <Button
              className={classes.snackBtn}
              onClick={() => {
              closeSnackbar(key)
              setSnackAppear(false)
            }}>Cancelar</Button>
            <Button className={classes.snackBtn} variant='outlined' onClick={() => saveEvent(values)}>Continuar</Button>
          </>
        )
      })
    } else {
      saveEvent(values)
    }
  }

  const upOrDown = (item: any) => {
    const finded = products.find(x => x.id === item.id)
    const percentage = ((item.price / finded.price) * 100) - 100
    const direction = Number(percentage) > 0 ? 'up' : Number(percentage) < 0 ? 'down' : 'null'
    return (
      <Typography
        className={clsx({
          [classes.typo]: true,
          [classes.up]: Number(percentage) > 0,
          [classes.down]: Number(percentage) < 0,
        })}
      ><Icon>arrow_drop_{direction}</Icon> {formatNumber(percentage)} %</Typography>
    )
  }

  return (
    <Formik
      initialValues={{
        name: '',
        prices: products
      }}
      validationSchema={NEW_EVENT_DIALOG_VALIDATIONS}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({ values, touched, errors, isValid, handleChange, handleBlur, handleSubmit, resetForm }) => (
        <Dialog
          id='new-event-backdrop'
          PaperComponent={PaperComponent}
          maxWidth='sm'
          open={open}
          fullWidth
        >
          <Loader open={saved} type='READY'>Se ha guardado</Loader>
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
                name='name'
                fullWidth
                error={!!(touched.name && errors.name)}
                helperText={errors.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Typography variant='caption' component={Box} paddingY={1}>
                * Debes registrar el precio de cada uno de los productos, verifica que sean los correctos y dale a <em>Guardar</em>{' '}
                cuando hayas finalizado
              </Typography>
              <Table size='small'>
                <TableBody>
                  <FieldArray name='prices'>
                    {() => values.prices.length && values.prices.map((item: any, index: number) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <Typography className={classes.productName}>{item.name}</Typography>
                        </TableCell>
                        <TableCell align='center'>
                          {upOrDown(item)}
                        </TableCell>
                        <TableCell align='right' style={{ paddingLeft: 0 }}>
                          <TextField
                            name={`prices.${index}.price`}
                            size='small'
                            value={item.price}
                            variant='outlined'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={Boolean((errors.prices && touched.prices) && !!(touched.prices[index] && errors.prices[index]))}
                            helperText={!!errors.prices && errors.prices[index] && 'Campo requerido'}
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
              <Button disabled={snackAppear} onClick={() => { onClose(); resetForm() }}>Cancelar</Button>
              <Button
                variant='contained'
                color='primary'
                type='submit'
                disabled={!isValid || snackAppear}
              >Guardar</Button>
            </DialogActions>
          </form> 
        </Dialog>
      )}
    </Formik>
  )
}

export default NewEventDialog