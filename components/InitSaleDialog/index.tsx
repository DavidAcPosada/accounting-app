import { Button, Dialog, DialogActions, DialogTitle, IconButton, DialogContent, Stepper, Step, StepLabel } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IStore } from '../../redux/interface'
import { firestore } from '../../utils/firebase'
import { ILabel, IProps, IStep } from './interface'
import SelectProducts from './steps/SelectProducts'
import SetupPrices from './steps/SetupPrices'

import useStyles from './styles'

function getSteps() {
  return ['Selección de productos', 'Configuración de precios', 'Iniciar facturación'];
}

const InitSaleDialog = ({ open, onClose }: IProps) => {
  const classes = useStyles()
  const activeEstablishment = useSelector((state: IStore) => state.establishments.active)
  const [activeStep, setActiveStep] = useState<number>(0)
  const [skipped, setSkipped] = useState<Set<unknown>>(new Set())

  const steps = getSteps()
  
  const [products, setProducts] = useState<Array<any>>([])
  const [productPrices, setProductPrices] = useState<Array<any>>([])
  const [events, setEvents] = useState<Array<any>>([])
  const [eventSelected, setEventSelected] = useState<Array<any>>()

  const isStepSkipped = (step: Set<unknown> | number) => {
    return skipped.has(step)
  }

  const handleNext = () => {
    let newSkipped = skipped
    if(isStepSkipped(newSkipped)) {
      newSkipped = new Set(skipped.values())
      newSkipped.delete(activeStep)
    }
    setActiveStep(prev => prev + 1)
    setSkipped(newSkipped)
  }

  const handleBack = () => {
    setActiveStep(prev => prev - 1)
  }

  useEffect(() => {
    if (activeEstablishment.id && open) {
      const establishment = firestore.collection('establishments').doc(activeEstablishment.id)
      firestore.collection('products')
        .where('status', '==', 1)
        .where('establishment', '==', establishment)
        .onSnapshot(snapshot => {
          const results: Array<any> = []
          snapshot.docs.forEach(item => {
            results.push({
              id: item.id,
              ...item.data(),
              checked: true,
              ref: item.ref
            })
          })
          setProducts(results)
          setProductPrices(results)
        })
      firestore.collection('events')
        .where('status', '==', true)
        .where('establishment', '==', establishment)
        .onSnapshot(snapshot => {
          const results: Array<any> = []
          snapshot.docs.forEach(item => {
            console.log(item.data())
            results.push({
              id: item.id,
              ...item.data()
            })
          })
          setEvents(results)
        })
    }
    if (!open) {
      setActiveStep(0)
    }
  }, [open])

  const getStepContent = (stepIndex: number): React.ReactElement | string => {
    switch (stepIndex) {
      case 0: return <SelectProducts products={products} handleChangeProducts={setProducts} />
      case 1: return (
        <SetupPrices
          events={events}
          eventSelected={eventSelected}
          handleChangeEventSeleted={setEventSelected}
          productPrices={productPrices}
          handleChangeProductPrices={setProductPrices}
        />
      )
      default: return 'Unknown Step'
    }
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth='sm'
      fullWidth
      scroll='paper'
      disableBackdropClick
      disableEscapeKeyDown
    >
      <DialogTitle className={classes.title}>
        Iniciar nueva facturación
        <IconButton size='small' onClick={onClose} color='secondary'><Close /></IconButton>
      </DialogTitle>
      <Stepper alternativeLabel activeStep={activeStep} classes={{ root: classes.stepperRoot }}>
        {steps.map((label: string, index: number) => {
          const stepProps: IStep = {}
          const labelProps: ILabel = {}
          if (isStepSkipped(index)) stepProps.completed = false
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          )
        })}
      </Stepper>
      <DialogContent>
        {getStepContent(activeStep)}
      </DialogContent>
      <DialogActions>
        <Button size='small' onClick={() => onClose()}>Cancelar</Button>
        <Button 
          size='small'
          variant='contained'
          disabled={activeStep === 0}
          onClick={handleBack}
        >Atrás</Button>
        <Button size='small' color='primary' variant='contained' onClick={handleNext}>
          {activeStep === steps.length - 1 ? 'Continuar' : 'Siguiente'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default InitSaleDialog