import { Box, Chip, MenuItem, TextField } from '@material-ui/core'

import TablePagination from '../TablePagination'

import useStyles from './styles'

const TableFooter = ({ paginationProps, ...props }) => {
  const classes = useStyles()
  return (
    <Box padding={1} paddingLeft={2} display='flex' justifyContent='space-between'>
      <Box display='flex' alignItems='center'>
        <Chip
          label={`${paginationProps.rowCount} resultados`}
          variant='outlined'
          color='secondary'
          size='small'
        />
        <TextField
          variant='outlined'
          size='small'
          color='primary'
          label='Filas por página'
          defaultValue={paginationProps.pageSize}
          onChange={(e) => paginationProps.setPageSize(e.target.value)}
          className={classes.pageSizingInput}
          select
        >
          <MenuItem value={25}>25</MenuItem>
          <MenuItem value={50}>50</MenuItem>
          <MenuItem value={100}>100</MenuItem>
        </TextField>
      </Box>
      <TablePagination paginationProps={paginationProps} />
    </Box>
  )
}

export default TableFooter