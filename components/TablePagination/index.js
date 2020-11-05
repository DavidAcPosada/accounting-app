import Pagination from '@material-ui/lab/Pagination'

import useStyles from './styles'

const TablePagination = ({ paginationProps }) => {
  const classes = useStyles()
  return (
    <Pagination
      className={classes.root}
      variant='outlined'
      color='primary'
      page={paginationProps.page}
      count={paginationProps.pageCount}
      showFirstButton={paginationProps.pageCount > 5}
      showLastButton={paginationProps.pageCount> 5}
      onChange={(_, value) => paginationProps.setPage(value)}
    />
  )
}

export default TablePagination