import styles from "./CommonFooter.module.scss";
import arrowLeft from "@assets/icons/icon-arrowLeft.svg"
import arrowRight from "@assets/icons/icon-arrowRight.svg"

function CommonFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.pagination}>
        <button className={styles.pagination__button}>
          <img src={arrowLeft} alt="arrow left" />
        </button>
        <span>1</span>
        <button className={styles.pagination__button}>
          <img src={arrowRight} alt="arrow right" />
        </button>
      </div>
    </footer>
  )
}

export default CommonFooter;