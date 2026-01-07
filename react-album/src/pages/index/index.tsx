import {useEffect, useState} from "react";
import CommonHeader from '@components/common/header/CommonHeader';
import CommonSearchBar from "@components/common/searchBar/CommonSearchBar.tsx";
import CommonNav from "@components/common/navigation/CommonNav.tsx";
import CommonFooter from "@components/common/footer/CommonFooter.tsx";
import Card from "@pages/index/components/Cardtsx.tsx";
import type {CardDTO} from "@pages/index/types/card.ts";
import axios from "axios";
import styles from './styles/index.module.scss'

function index() {
  // 1. 이미지 데이터를 미리 설정하고
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [imgData, setImgData] = useState([]);

  const getData = async () => {
    const API_URL = "https://api.unsplash.com/search/photos"
    const API_KEY = "98IZBgfB7oilX6BeswvQeMOQs4YMYbkjgGyOZuHh5ig"
    const PER_PAGE = 30
    const SEARCH_STR = "korea"
    const PAGE = 100
    try {
      // 2. 여기서 받는 함수를 설정하고
      const response =
        await axios.get(`${API_URL}?query=${SEARCH_STR}&client_id=${API_KEY}&per_page=${PER_PAGE}&page=${PAGE}`)
      console.log(response)
      // 2-1. 받으면 이미지 데이터에 넣는 것까지 설정...
      if (response.status === 200) {
        setImgData(response.data.results)
      }
    } catch (error) {
      console.log(error)
    }
  }

  // 3. 실제로 받으라고 명령하고...
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    getData();
  }, []);

  const CARD_LIST = imgData.map((item: CardDTO) => {
    return <Card data={item} key={item.id}/>
  })

  return (
    <div className={styles.page}>
      {/*공통 헤더 UI 부분*/}
      <CommonHeader/>
      {/*공통 네비게이션 UI 부분*/}
      <CommonNav/>
      <div className={styles.page__contents}>
        <div className={styles.page__contents__introBox}>
          <div className={styles.wrapper}>
            <span className={styles.wrapper__title}>
              PhotoSplash
            </span>
            <span className={styles.wrapper__desc}>
              인터넷 시각 자료 출처입니다.<br/>
              모든 지역에 있는 크리에이터들의 지원을 받습니다.
            </span>
            {/*검색창 UI 부분*/}
            <CommonSearchBar/>
          </div>
        </div>
        <div className={styles.page__contents__imageBox}>
          {CARD_LIST}
        </div>
      </div>
      {/*공통 푸터 UI 부분*/}
      <CommonFooter/>
    </div>
  )
}

export default index