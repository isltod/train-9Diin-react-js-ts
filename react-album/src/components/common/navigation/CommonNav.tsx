import styles from './CommonNav.module.scss'
import navJson from './nav.json'
import {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import useImgStore from "@store/imgStore.ts";

// 메인 메뉴를 JSON 배열로 만들어서 사용한다..TS interface로 형식 정하기...
interface Navigation {
  "index": number,
  "path": string,
  "label": string,
  "searchValue": string,
  "isActive": boolean
}

function CommonNav() {

  const [navigations] = useState<Navigation[]>(navJson);
  const location = useLocation();
  const {setPageNumber, setSearchString, getSearchImages} = useImgStore();

  // navigation 설정은 useEffect()로 그려준다...
  useEffect(() => {
    navigations.forEach((nav : Navigation ) => {
      nav.isActive = false;

      if (nav.path === location.pathname || location.pathname.includes(nav.path)) {
        nav.isActive = true;
        setPageNumber(1)
        setSearchString(nav.searchValue);
        getSearchImages()
      }
    })
    // setNavigations([...navigations]);
  }, [location.pathname]);

  // 이건 설정된 navigation 값들에 따라 그림만 그려주는 부분이고...
  const navLinks = navigations.map((nav: Navigation) => {
    return (
      <Link key={nav.index} to={nav.path}
            className={nav.isActive ?
              `${styles.navigation__menu} ${styles.active}` :
              `${styles.navigation__menu} ${styles.inactive}`
      }>
        <span className={styles.navigation__menu__lable}>{nav.label}</span>
      </Link>
    )
  });

  return (
    <nav className={styles.navigation}>{navLinks}</nav>
  )
}

export default CommonNav;