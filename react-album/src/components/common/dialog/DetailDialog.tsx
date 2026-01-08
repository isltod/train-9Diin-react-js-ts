import styles from './DetailDialog.module.scss'

function DetailDialog() {
  return (
    <div className={styles.container}>
      <div className={styles.container__dialog}>
        <header className={styles.container__dialog__header}>
          <div className={styles.close}>
            <button className={styles.close__button}>{/*구글 아이콘 사용*/}</button>
            <img src="#" alt="작가 프로필 사진" className={styles.close__authorImage}/>
            <span className={styles.close__authorName}>wolf</span>
          </div>
          <div className={styles.bookmark}>
            <button className={styles.bookmark__button}>{/*구글 아이콘 사용*/}북마크</button>
            <button className={styles.bookmark__button}>다운로드</button>
          </div>
        </header>
        <main className={styles.container__dialog__body}>
          <img src="#" alt="상세 이미지" className={styles.image}/>
        </main>
        <footer className={styles.container__dialog__footer}>
          <div className={styles.infoBox}>
            <div className={styles.infoBox__item}>
              <div className={styles.infoBox__item__label}>이미지 크기</div>
              <div className={styles.infoBox__item__value}>상세 데이터 조회</div>
            </div>
            <div className={styles.infoBox__item}>
              <div className={styles.infoBox__item__label}>이미지 크기</div>
              <div className={styles.infoBox__item__value}>상세 데이터 조회</div>
            </div>
            <div className={styles.infoBox__item}>
              <div className={styles.infoBox__item__label}>이미지 크기</div>
              <div className={styles.infoBox__item__value}>상세 데이터 조회</div>
            </div>
            <div className={styles.infoBox__item}>
              <div className={styles.infoBox__item__label}>이미지 크기</div>
              <div className={styles.infoBox__item__value}>상세 데이터 조회</div>
            </div>
          </div>
          <div className={styles.tagBox}>
            <div className={styles.tagBox__tag}>태크 데이터</div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default DetailDialog