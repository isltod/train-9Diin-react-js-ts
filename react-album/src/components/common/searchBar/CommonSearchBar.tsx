import styles from './CommonSearchBar.module.scss'
import searchIcon from '@assets/icons/icon-search.svg'

function CommonSearchBar() {
  return (
    <div className={styles.searchBar}>
      <div className={styles.searchBar__search}>
        <input type="text" placeholder="찾으실 이미지를 검색하세요." className={styles.searchBar__search__input} />
        <img src={searchIcon} alt="search icon" />
      </div>
    </div>
  )
}

export default CommonSearchBar;