import styles from './CommonFooter.module.scss'
import useImgStore from "@store/imgStore.ts";

interface Props {
  pages: number[];
  step: number;
  handlePageNavigate: (page: number) => void;
}

function FooterNav({pages, step, handlePageNavigate}: Props) {
  const {pageNumber} = useImgStore();

  const moveToPage = (page : number) => {
    handlePageNavigate(page);
  }

  const pageButtons = pages && pages.map((page: number, i: number) => {
    const thisPage = step * 10 + page
    return (
      <button key={i}
              className={thisPage === pageNumber ?
                `${styles.pagination__button} ${styles.active}` :
                `${styles.pagination__button} ${styles.inactive}`}
              onClick={() => { moveToPage(thisPage) }}>
        {page}
      </button>
    )
  })

  return (
    pageButtons
  )
}

export default FooterNav