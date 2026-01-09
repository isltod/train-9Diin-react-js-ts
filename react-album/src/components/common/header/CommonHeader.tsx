import styles from './CommonHeader.module.scss'
import mainLogo from '@assets/images/image-logo.png'
import {useNavigate} from "react-router-dom";

function CommonHeader() {

  const navigate = useNavigate()
  const goToPage = (page : string) => {
    navigate(page)
  }

  return (
    <header className={styles.header}>
      <div className={styles.header__logoBox} onClick={() => { navigate('/') }}>
        {/*이미지 파일이 src 경로에 있을 때 img 태그에 넣으려면 이렇게 import 해서 넣어야 된다는데...*/}
        <img src={mainLogo} alt="logo image" className={styles.header__logoBox__logo}/>
        <span className={styles.header__logoBox__title}>Photo Splash</span>
      </div>
      <div className={styles.header__profileBox}>
        <button className={styles.header__profileBox__button}>사진제출</button>
        <button className={styles.header__profileBox__button} onClick={() => { goToPage('/bookmark') }}>
          북마크
        </button>
        <span className={styles.header__profileBox__userName}>wolf | wolf@teoal.net</span>
      </div>
    </header>
  )
}

export default CommonHeader;