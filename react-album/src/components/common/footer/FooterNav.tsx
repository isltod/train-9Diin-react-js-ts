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

  // 하위 컴포넌트에서 알아서 페이지를 만들어 사용하니 step 이 바뀌면 적용이 안된다...
  // FooterNav를 CommonFooter로 합치고,
  // CommonFooter는 Props로 페이지 변수를 받고,
  // 페이지 이동은 다시 index로? 아마도 해야 할 듯...
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