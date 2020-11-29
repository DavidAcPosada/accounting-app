import { Formik } from "formik"
import NumberFormat from "react-number-format"
import * as yup from 'yup'

import { Dialog, DialogTitle, DialogActions, Button, DialogContent, Grid, TextField, InputAdornment, Checkbox, FormControlLabel, Box } from "@material-ui/core"

import * as MESSAGES from './../../utils/errorMessages'

const VALIDATIONS = yup.object().shape({
  name: yup.string().required(MESSAGES.IS_REQUIRED),
  price: yup.number()
    .typeError(MESSAGES.ONLY_NUMBERS)
    .required(MESSAGES.IS_REQUIRED),
  stock: yup.number()
    .typeError(MESSAGES.ONLY_NUMBERS)
})

const NumberFormatInput = ({ inputRef, onChange, onBlur, name, suffix, prefix, ...other }) => {
  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name,
            value: values.value
          }
        })
        onBlur({
          target: {
            name,
            value: values.value
          }
        })
      }}
      thousandSeparator='.'
      decimalSeparator=','
      isNumericString
      prefix={prefix}
      suffix={suffix}
    />
  )
}

const NewProductDialog = ({ open, onClose }) => {

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <Formik
      onSubmit={onSubmit}
      validationSchema={VALIDATIONS}
      initialValues={{
        name: '',
        price: '',
        stock: '',
        unique: true
      }}
    >
      {({ values, errors, touched, handleChange, handleBlur, handleSubmit, resetForm }) => (
        <Dialog
          open={open}
          onClose={onClose}
          scroll='paper'
          disableBackdropClick
          disableEscapeKeyDown
          PaperProps={{
            component: 'form',
            onSubmit: handleSubmit,
            noValidate: true
          }}
        >
          <DialogTitle>Nuevo Producto</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label='Nombre del producto'
                  variant='outlined'
                  size='small'
                  fullWidth
                  name='name'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  defaultValue={values.name}
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label='Precio'
                  variant='outlined'
                  size='small'
                  name='price'
                  error={touched.price && Boolean(errors.price)}
                  helperText={touched.price && errors.price}
                  fullWidth
                  required
                  InputProps={{
                    inputComponent: NumberFormatInput,
                    inputProps: {
                      prefix: '$',
                      onChange: handleChange,
                      onBlur: handleBlur
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label='Cantidad en Stock'
                  variant='outlined'
                  size='small'
                  name='stock'
                  fullWidth
                  defaultValue={0}
                  InputProps={{
                    inputComponent: NumberFormatInput,
                    inputProps: {
                      suffix: ' uni.',
                      onChange: handleChange
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Box paddingX={2}>
                  <FormControlLabel
                    label='Única presentación'
                    control={
                      <Checkbox
                        checked
                        color='primary'
                        name='unique'
                        onChange={handleChange}
                        checked={values.unique}
                      />
                    }
                  />
                </Box>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button size='small' onClick={(e) => {
              onClose(e)
              resetForm()
            }}>Cancelar</Button>
            <Button size='small' color='primary' type='submit'>Guardar</Button>
          </DialogActions>
        </Dialog>
      )}
    </Formik>
  )
}

export default NewProductDialog