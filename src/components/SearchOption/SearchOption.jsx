import { Button } from "antd";
import {Tabs} from "antd";
import "./SearchOption.css"
const SearchOption = ({getRatedList, toSearchPage, isRatedPage}) => {

    const items = [
        {
            key: '1',
            label: 'Search'
          },
          {
            key: '2',
            label: 'Rated'
          }
    ]

    return (
        <div className="buttons">
        <Tabs centered={true} items={items} onChange={() => {
           if (isRatedPage) return toSearchPage()
            return getRatedList()
        } } />
       
        </div>
    )
}
export default SearchOption