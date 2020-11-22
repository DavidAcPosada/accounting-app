import { Box, Chip, MenuItem, TextField } from '@material-ui/core'

import TablePagination from '../TablePagination'

import useStyles from './styles'

const TableFooter = ({ paginationProps, ...props }) => {
  const classes = useStyles()
  return (
    <Box padding={1} paddingLeft={2} paddingTop={1.7} display='flex' justifyContent='space-between'>
      <Chip
        label={`${paginationProps.rowCount} resultados`}
        variant='outlined'
        color='secondary'
        size='small'
      />
      <Box display='flex' alignItems='center'>
        <TextField
          variant='outlined'
          size='small'
          color='primary'
          label='Filas por página'
          defaultValue={paginationProps.pageSize}
          onChange={(e) => paginationProps.setPageSize(e.target.value)}
          className={classes.pageSizingInput}
          InputProps={{
            classes: {
              marginDense: classes.dense
            }
          }}
          select
        >
          <MenuItem value={25}>25</MenuItem>
          <MenuItem value={50}>50</MenuItem>
          <MenuItem value={100}>100</MenuItem>
        </TextField>
        <TablePagination paginationProps={paginationProps} />
      </Box>
    </Box>
  )
}

export default TableFooter