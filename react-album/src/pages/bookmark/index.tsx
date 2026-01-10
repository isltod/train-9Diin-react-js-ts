import styles from './styles/index.module.scss'
import {useEffect, useState} from "react";
import CommonHeader from "@components/common/header/CommonHeader.tsx";
import type {CardDTO} from "@pages/index/types/card.ts";
import Card from "@pages/bookmark/components/Card.tsx";

function index() {

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [bookmarks, setBookmarks] = useState([])
  const getBookmarks = () => {
    const data = JSON.parse(localStorage.getItem("bookmark"));
    if (data) {
      setBookmarks(data);
    } else {
      setBookmarks([]);
    }
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    getBookmarks();
  }, [])

  return (
    <div className={styles.page}>
      {/*공통 헤더 UI 부분*/}
      <CommonHeader />
      <main className={styles.page__contents}>
        {bookmarks.length > 0 ?
          bookmarks.map((imgData : CardDTO) => {return (<Card imgData={imgData} key={imgData.id} />)}) :
          <div className={styles.page__contents__noData}>북마크된 이미지가 없습니다.</div>
        }
      </main>
    </div>
  )
}

export default index;