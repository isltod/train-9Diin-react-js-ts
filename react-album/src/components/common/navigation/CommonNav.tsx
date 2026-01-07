import styles from './CommonNav.module.scss'
import navJson from './nav.json'
import {useState} from "react";
import {Link} from "react-router-dom";

// 메인 메뉴를 JSON 배열로 만들어서 사용한다..TS interface로 형식 정하기...
interface Navigation {
  "index": number,
  "path": string,
  "label": string,
  "searchValue": string,
  "isActive": boolean
}

function CommonNav() {

  const [navigation, setNavigation] = useState<Navigation[]>(navJson);

  const navLinks = navigation.map((item: Navigation) => {
    return (
      <Link key={item.index} to={item.path} className={styles.navigation__menu}>
        <span className={styles.navigation__menu__lable}>{item.label}</span>
      </Link>
    )
  });

  return (
    <div className={styles.navigation}>{navLinks}</div>
  )
}

export default CommonNav;