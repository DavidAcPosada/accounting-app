import { FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, Typography, Box, IconButton, Tooltip, Button } from "@material-ui/core"
import { Close, Visibility } from "@material-ui/icons"
import { useState } from "react"
import NewEventDialog from "../../../NewEventDialog"
import NoResultsScreen from "../../../NoResultsScreen"

import useStyles from './styles'

interface ISetupPrices {
  events: Array<any>;
  eventSelected: any;
  handleChangeEventSeleted: (values: any) => void;
  productPrices: Array<any>;
  handleChangeProductPrices: (values: any) => void;
}

interface IEventList {
  events: Array<any>;
  close: () => void;
  eventSelected: any;
  handleChangeEventSeleted: (values: any) => void;
}

const HeaderEvent = ({ close, title }: { close: any, title: string }) => (
  <Box display='flex' justifyContent='space-between' alignItems='center'>
    <Typography variant='h5'>{title}</Typography>
    <IconButton size='small' onClick={() => close()}>
      <Close />
    </IconButton>
  </Box>
)

const EventListContainer = ({ children }: { children: any }) => (
  <Box padding={1.5} paddingBottom={2}>
    {children}
  </Box>
)

const EventList = ({ events, close, eventSelected, handleChangeEventSeleted }: IEventList) => {
  const classes = useStyles()
  const [openNewEvent, setOpenNewEvent] = useState<boolean>(false)

  const handleChangeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChangeEventSeleted((e.target as HTMLInputElement).value)
  }

  return (
    <EventListContainer>
      <HeaderEvent title='Precios de evento' close={close} />
      <RadioGroup value={eventSelected} onChange={handleChangeEvent}>
        {events.map(event => (
          <FormControlLabel key={event.id} value={event.id} control={<Radio />} label={
            <Typography className={classes.listEvent}>{event.name}
              <Tooltip title='Ver precios' placement='top'>
                <IconButton className={classes.listEventBtn} size='small'><Visibility /></IconButton>
              </Tooltip>
            </Typography>
          } />
        ))}
        {!events.length && (
          <NoResultsScreen
            variant='Secondary'
            text='Este establecimiento no tiene ningún evento registrado'
            actionButton={
              <Button
                variant='contained' 
                size='small'
                onClick={() => setOpenNewEvent(true)}
              >Registrar nuevo evento</Button>}
          />
        )}
      </RadioGroup>
      <NewEventDialog
        open={openNewEvent}
        onClose={() => setOpenNewEvent(false)}
      />
    </EventListContainer>
  )
}

const SetupPrices = ({ events, eventSelected, handleChangeEventSeleted, productPrices, handleChangeProductPrices }: ISetupPrices) => {
  const [selection, setSelection] = useState<number>(-1)
  
  const options = [
    { value: 0, title: 'Precios normales' },
    { value: 1, title: 'Precios de evento' },
    { value: 2, title: 'Aplicar descuento general' },
    { value: 3, title: 'Aplicar descuento por producto' },
  ]

  const handleChangeOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelection(Number((e.target as HTMLInputElement).value))
  }

  const closeOption = () => {
    setSelection(0)
    handleChangeEventSeleted(null)
  }

  const getView = () => {
    switch (selection) {
      case 1: return (
        <EventList
          events={events}
          close={closeOption}
          eventSelected={eventSelected}
          handleChangeEventSeleted={handleChangeEventSeleted}
        />)
      case 2: return 
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
                <FormControlLabel key={option.value} value={option.value} control={<Radio />} label={option.title} />
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