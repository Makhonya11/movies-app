import { Pagination } from 'antd'

const PagesPagination = ({
  filmsData: { totalPages, currentQuery, totalResults, isLoading, isRatedPage, totalRatedPages },
  getFilmsList,
  getRatedList,
}) => {
  if ((totalPages !== null || totalRatedPages !== null) && totalResults > 0 && !isLoading) {
    console.log(totalRatedPages)
    return (
      <Pagination
        total={isRatedPage ? totalRatedPages * 10 || 1 : totalPages * 10}
        showSizeChanger={false}
        onChange={(page) => {
          window.scrollTo(0, 0)
          isRatedPage ? getRatedList(page) : getFilmsList(currentQuery, page)
        }}
      />
    )
  } else return
}
export default PagesPagination
