import { Box, Button, Card, CardActions, CardContent, IconButton, SnackbarContent, Table, TableBody, TableCell, TableRow, Typography } from "@material-ui/core"
import { Close } from "@material-ui/icons"
import { useSnackbar } from "notistack"
import { forwardRef, ReactNode } from "react"

import useStyles from './styles'

interface IPriceSnack {
  id: string | number;
  message: ReactNode;
  data: any[];
  onClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClose: (event: React.ChangeEvent<any>) => void;
}

const PricesSnackbar = forwardRef(({ id, message, data, onClick, onClose }: IPriceSnack, ref: any) => {
  const classes = useStyles()
  const { closeSnackbar } = useSnackbar()

  const handleAccept = (e: any) => {
    closeSnackbar(id)
    onClick(e)
  }

  return (
    <SnackbarContent
      ref={ref}
      classes={{
        root: classes.root,
        message: classes.rootMessage
      }}
      message={
        <Card className={classes.content} variant='outlined' color='primary'>
          <CardActions classes={{ root: classes.actionRoot }}>
            {message}
            <div>
              <Button variant='outlined' onClick={handleAccept}>Aceptar</Button>
              <IconButton size='small' onClick={(e: React.ChangeEvent<any>) => onClose(e)}><Close /></IconButton>
            </div>
          </CardActions>
          <Box padding={2} paddingTop={0}>
            <Typography variant='caption'>
              Este es listado de precios registrados correspondiente a este evento, en caso de que no se encuentre un producto puede ser debido a que
              no se registro su precio al agregar el evento a la base de datos
            </Typography>
          </Box>
          <CardContent className={classes.list}>
            <Table size='small'>
              <TableBody>
                {data.map((item, i) => (
                  <TableRow key={i}>
                    <TableCell className={classes.cell}>{item.name}</TableCell>
                    <TableCell className={classes.cell} align='right'>
                      <b>{new Intl.NumberFormat('en-US', { minimumFractionDigits: 0 }).format(item.price)} $</b>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      }
    />
  )
})

export default PricesSnackbar