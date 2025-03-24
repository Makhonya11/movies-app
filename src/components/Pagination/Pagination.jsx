import { Pagination } from "antd";

const PagesPagination = ({filmsData: {totalPages, currentQuery, totalResults, isLoading, isRatedPage,  totalRatedPages},  getFilmsList, getRatedList, }) => {
    if ((totalPages !== null || totalRatedPages!== null )&& totalResults>0 && !isLoading) {
        return (
           
            <Pagination total={isRatedPage? totalRatedPages*10: totalPages*10} showSizeChanger={false}
            onChange={(page) =>{
            isRatedPage 
            ? getRatedList(page)
            :getFilmsList(currentQuery, page)}
            } />
        )
    } else return
}
export default PagesPagination