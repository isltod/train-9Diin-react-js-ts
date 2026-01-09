import styles from './CommonSearchBar.module.scss'
import searchIcon from '@assets/icons/icon-search.svg'
import useImgStore from "@store/imgStore.ts";
import * as React from "react";

function CommonSearchBar() {

  const {setPageNumber, setSearchString, getSearchImages} = useImgStore();
  const changeSearchText = (event : React.ChangeEvent<HTMLInputElement>) => {
    // 검색어는 여기서 변화에 맞춰 미리 넣어놓고
    setSearchString(event.target.value);
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      getSearch()
    }
  }

  const getSearch = () => {
    setPageNumber(1)
    getSearchImages()
  }

  return (
    <div className={styles.searchBar}>
      <div className={styles.searchBar__search}>
        <input type="text" placeholder="찾으실 이미지를 검색하세요." className={styles.searchBar__search__input}
               onChange={changeSearchText} onKeyDown={handleKeyDown} />
        <img src={searchIcon} alt="search icon" onClick={getSearch} />
      </div>
    </div>
  )
}

export default CommonSearchBar;