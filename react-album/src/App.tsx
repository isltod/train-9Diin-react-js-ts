import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainPage from './pages/index'
import BookmarkPage from "./pages/bookmark";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/*이런 모양이 나은건가...*/}
        <Route index path={"/"} element=<MainPage/>/>
        <Route path={"search/:id"} element={<MainPage/>}/>
        <Route path={"/bookmark"} element={<BookmarkPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App