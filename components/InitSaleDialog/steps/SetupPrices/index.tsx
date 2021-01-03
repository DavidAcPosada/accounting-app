import { FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, Typography, Box, IconButton, Button, TextField, InputAdornment } from "@material-ui/core"
import { Close } from "@material-ui/icons"
import { Formik } from "formik"
import { useSnackbar } from "notistack"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import * as yup from 'yup'

import { IStore } from "../../../../redux/interface"
import { STATUS_BUTTONS_INIT_SALE } from "../../../../redux/types/ui"

import { firestore } from "../../../../utils/firebase"
import NewEventDialog from "../../../NewEventDialog"
import NoResultsScreen from "../../../NoResultsScreen"
import NumberFormatInput from "../../../NumberFormatInput"
import PricesSnackbar from "../../../PricesSnackbar"
import { IDiscount, IDiscountComponent, IEventList, ISetupPrices } from "./interface"

import useStyles from './styles'

const HeaderSetupPrice = ({ close, title }: { close: any, title: string }) => (
  <Box display='flex' justifyContent='space-between' alignItems='center'>
    <Typography variant='h5'>{title}</Typography>
    <IconButton size='small' onClick={() => close()}>
      <Close />
    </IconButton>
  </Box>
)

const SetupPriceContainer = ({ children }: { children: any }) => (
  <Box padding={1.5} paddingBottom={2}>
    {children}
  </Box>
)

const EventList = ({ events, close, eventSelected, handleChangeEventSeleted, handleDisabledButton }: IEventList) => {
  const [openNewEvent, setOpenNewEvent] = useState<boolean>(false)
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const disableControls = useSelector((state: IStore) => state.ui.initSale.disableControls)

  const handleChangeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value
    handleDisabledButton(true)
    Promise.resolve()
      .then(() => firestore.collection('events').doc(value))
      .then(doc => doc.get())
      .then(data => ({ id: data.id, ...data.data() }))
      .then(async (doc: any) => {
        const prices = await Promise.all(doc.prices.map(async (price: any) => {
          let data = {}
          await price.product.get().then((value: any) => data = value.data())
          return data
        }))
        return { ...doc, prices }
      }).then((info: any) => {
        enqueueSnackbar(<Typography>Precios del evento: <b>{info.name}</b></Typography>, {
          persist: true,
          preventDuplicate: true,
          anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
          content: (key, message) => (
            <PricesSnackbar
              id={key}
              message={message}
              data={info.prices}
              onClick={() => handleChangeEventSeleted(value)}
              onClose={() => {
                handleDisabledButton(false)
                closeSnackbar(key)
              }}
            />
          )
        })
      }).catch((err) => enqueueSnackbar(err.toString(), { variant: 'error', autoHideDuration: 3000 }))
  }

  return (
    <SetupPriceContainer>
      <HeaderSetupPrice title='Precios de evento' close={close} />
      <RadioGroup value={eventSelected} onChange={handleChangeEvent}>
        {events.map(event => (
          <FormControlLabel
            key={event.id}
            checked={eventSelected === event.id}
            value={event.id}
            control={<Radio />}
            label={event.name}
            disabled={disableControls}
          />
        ))}
        {!events.length && (
          <NoResultsScreen
            variant='Secondary'
            text='Este establecimiento no tiene ningún evento registrado'
            actionButton={<Button variant='contained'  size='small' onClick={() => setOpenNewEvent(true)}>Registrar nuevo evento</Button>}
          />
        )}
      </RadioGroup>
      {events.length && (
        <Box paddingTop={2}>
          <Button variant='outlined' size='small' onClick={() => setOpenNewEvent(true)}>Nuevo evento</Button>
        </Box>
      )}
      <NewEventDialog
        open={openNewEvent}
        onClose={() => setOpenNewEvent(false)}
      />
    </SetupPriceContainer>
  )
}

const Discount = ({ discount, setDiscount, close }: IDiscountComponent) => {
  
  const VALIDATION_SCHEMA = yup.object().shape({
    discount: yup.number()
      .typeError('Sólo se permiten números')
      .required('Campo requerido')
      .max(100, 'Máximo 100%')
      .min(0, 'Minímo 0%')
  })

  const handleChangeAll = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setDiscount((prev: IDiscount) => {
      prev.all.value = Number(e.target.value)
      return prev
    })
  }

  return (
    <SetupPriceContainer>
      <HeaderSetupPrice title={`Aplicar descuento ${discount.all.is ? 'general' : 'por producto'}`} close={close} />
      {discount.all.is && (
        <>
            <Formik onSubmit={() => {}} initialValues={{ discount: discount.all.value }} validationSchema={VALIDATION_SCHEMA}>
              {({ values, errors, touched, handleBlur, handleChange, isValid }) => (
                <Box paddingY={1.5}>
                  <TextField
                    name='discount'
                    variant='outlined'
                    size='small'
                    value={values.discount}
                    onChange={(e) => { handleChangeAll(e); handleChange(e) }}
                    onBlur={handleBlur}
                    error={!!(errors.discount && touched.discount)}
                    helperText={errors.discount}
                    InputProps={{
                      inputComponent: NumberFormatInput,
                      inputProps: { max: 100 },
                      endAdornment: <InputAdornment position='end'>%</InputAdornment>
                    }}
                    fullWidth
                  />
                  {isValid && (
                    <Typography variant='subtitle1'>
                      Ejemplo: Si el producto cuesta <u>$ 5.000</u>, su valor será <b>$ {(1 - (values.discount / 100)) * 5000 }</b>
                    </Typography>
                  )}
                </Box>
              )}
            </Formik>
          <Typography variant='caption'>
            * El valor se aplicará a todos los productos seleccionados
          </Typography>
        </>
      )}
    </SetupPriceContainer>
  )
}

const SetupPrices = ({ events, eventSelected, handleChangeEventSeleted, selection, setSelection, discount, setDiscount }: ISetupPrices) => {
  const dispatch = useDispatch()
  
  const options = [
    { value: 0, title: 'Precios normales' },
    { value: 1, title: 'Precios de evento' },
    { value: 2, title: 'Aplicar descuento general' },
    { value: 3, title: 'Aplicar descuento por producto' },
  ]

  const handleDisableButtons = (payload: boolean) => {
    dispatch({
      type: STATUS_BUTTONS_INIT_SALE,
      payload
    })
  }

  const handleChangeOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number((e.target as HTMLInputElement).value)
    if (value === 2 || 3) {
      setDiscount((prev: IDiscount) => {
        if (value === 2) {
          prev.all.is = true; prev.some.is = false
          prev.some.values = []
        } else if (value === 3) {
          prev.all.is = false; prev.some.is = true
          prev.all.value = 0
        }
        return prev
      })
    }
    setSelection(value)
  }

  const closeOption = () => {
    setSelection(0)
    handleChangeEventSeleted(null)
    handleDisableButtons(false)
  }

  const changeEvent = (value: any) => {
    handleChangeEventSeleted(value)
    handleDisableButtons(false)
  }

  const getView = () => {
    switch (selection) {
      case 1: return (
        <EventList
          events={events}
          close={closeOption}
          eventSelected={eventSelected}
          handleChangeEventSeleted={changeEvent}
          handleDisabledButton={handleDisableButtons}
        />)
      case 2:
      case 3:
        return (
        <Discount
          discount={discount}
          setDiscount={setDiscount}
          close={closeOption}
        />
      )
      case 0: default: return;
    }
  }

  return (
    <Grid container>
      {(selection === -1 || selection === 0) && (
        <Grid item xs={12}>
          <FormControl component='fieldset'>
            <FormLabel component='legend'>Selecciona una opción</FormLabel>
            <RadioGroup name='option' value={selection} onChange={handleChangeOption}>
              {options.map(option => (
                <FormControlLabel key={option.value} checked={selection === option.value} value={option.value} control={<Radio />} label={option.title} />
              ))}
            </RadioGroup>
          </FormControl>
        </Grid>
      )}
      <Grid item xs={12}>
        {getView()}
      </Grid>
    </Grid>
  )
}

export default SetupPrices