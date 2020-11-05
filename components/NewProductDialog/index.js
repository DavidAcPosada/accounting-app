const { Dialog } = require("@material-ui/core")

const NewProductDialog = ({ open, onClose }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      Content
    </Dialog>
  )
}

export default NewProductDialog