import styles from "./CommonFooter.module.scss";
import arrowLeft from "@assets/icons/icon-arrowLeft.svg"
import arrowRight from "@assets/icons/icon-arrowRight.svg"
import useImgStore from "@store/imgStore.ts";
import {useState} from "react";
import FooterNav from "@components/common/footer/FooterNav.tsx";

function CommonFooter() {

  const {totalPages, setPageNumber, getSearchImages} = useImgStore();
  const [step, setStep] = useState(0);

  const moveToPage = (selected: number) => {
    setPageNumber(selected)
    getSearchImages()
  }

  const moveToNext = () => {
    if (step < pages.length - 1) {
      const newStep = step + 1
      setStep(newStep)
      setPageNumber(pages[newStep][0])
      getSearchImages()
    }
  }

  const moveToPrev = () => {
    if (step > 0) {
      const newStep = step - 1
      setStep(newStep)
      setPageNumber(pages[newStep][9])
      getSearchImages()
      console.log(newStep, pages[newStep][9])
    }
  }

  const tmpArr = Array.from({length: totalPages}, (_, i) => i + 1);
  const pages = []
  while (tmpArr.length > 0) {
    pages.push(tmpArr.splice(0, 10));
  }


  return (
    <footer className={styles.footer}>
      <div className={styles.pagination}>
        <button className={styles.pagination__button} onClick={moveToPrev}>
          <img src={arrowLeft} alt="arrow left"/>
        </button>
        <FooterNav pages={pages[step]} step={step} handlePageNavigate={moveToPage} />
        <button className={styles.pagination__button} onClick={moveToNext}>
          <img src={arrowRight} alt="arrow right"/>
        </button>
      </div>
    </footer>
  )
}

export default CommonFooter;