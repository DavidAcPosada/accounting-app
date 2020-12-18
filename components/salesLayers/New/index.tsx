import { useEffect } from 'react'
import useStyles from './styles'

const NewInvoice = ({ setLoad }: { setLoad: (arg: boolean) => void }) => {
  const classes = useStyles()

  useEffect(() => {
    setLoad(false)
  }, [])

  return (
    <div>
      <div className={classes.top}>
        New
      </div>
    </div>
  )
}

export default NewInvoice