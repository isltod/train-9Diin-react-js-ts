import {AppFooter, AppHeader} from "@/components";

export default function App() {

  return (
    <div className="page">
      <AppHeader />
      <div className="container">
        <p style={{display: 'inline-block', width: '1200', background: "red"}}>여기가 내용이고, flex colum 방향으로 가운데 정렬, 최대 넓이는 1328px</p>
      </div>
      <AppFooter />
    </div>
  )
}