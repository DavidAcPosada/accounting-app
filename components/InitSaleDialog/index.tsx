import { Button, Dialog, DialogActions, DialogTitle, IconButton, DialogContent, Stepper, Typography, Step, StepLabel } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import { useEffect, useState } from 'react'
import { firestore } from '../../utils/firebase'
import { ILabel, IProps, IStep } from './interface'

import useStyles from './styles'

function getSteps() {
  return ['Selección de productos', 'Configuración de precios', 'Iniciar facturación'];
}

const InitSaleDialog = ({ open, onClose }: IProps) => {
  const classes = useStyles()
  const [products, setProducts] = useState<Array<any>>([])
  const [activeStep, setActiveStep] = useState<number>(0)
  const [skipped, setSkipped] = useState<Set<unknown>>(new Set())
  const steps = getSteps()

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
    firestore.collection('products').where('status', '==', 1)
      .onSnapshot(snapshot => {
        const results: Array<any> = []
        snapshot.docs.forEach(item => {
          results.push({
            id: item.id,
            ...item.data(),
            checked: true
          })
        })
        setProducts(results)
      })
  }, [])

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth='sm'
      fullWidth
      scroll='paper'
    >
      <DialogTitle className={classes.title}>
        Iniciar nueva facturación
        <IconButton size='small' onClick={onClose} color='secondary'><Close /></IconButton>
      </DialogTitle>
      <div>
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
      </div>
      <DialogContent>
        lorem
      </DialogContent>
      <DialogActions>
        <Button size='small' onClick={() => onClose()}>Cancelar</Button>
        <Button 
          size='small'
          variant='contained'
          disabled={activeStep === 0}
          onClick={handleBack}
        >Atrás</Button>
        <Button
          size='small'
          color='primary'
          variant='contained'
          onClick={handleNext}
        >
          {activeStep === steps.length - 1 ? 'Continuar' : 'Siguiente'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default InitSaleDialog