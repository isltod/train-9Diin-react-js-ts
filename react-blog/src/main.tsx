import './index.css'

import {createRoot} from 'react-dom/client'
import {StrictMode} from 'react'
import {ThemeProvider} from "@/components/theme-provider.tsx";
import {BrowserRouter, Route, Routes} from "react-router";
import App from "./pages"
import SignIn from "./pages/sign-in";
import SignUp from "./pages/sign-up";
import RootLayout from "@/pages/layout.tsx";
import CreateTopic from '@/pages/topics/create.tsx'

// 여전히 index.html -> main.tsx가 실행되고, 여기서 createRoot가 App을 만들어 반환...
// 단지 전에는 단순하게 App만 반환했는데, 이제는 라우터가 반환되는 형식...
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          {/* 이렇게 Route로 한번 더 감싸고 element만 주면 Layout을 지정할 수 있고,
          거기에 Outlet 구멍에 밑에 것들을 다 끼워 넣어준다... */}
          <Route element={<RootLayout/>}>
            <Route index element={<App/>}/>
            <Route path="sign-in" element={<SignIn/>}/>
            <Route path="sign-up" element={<SignUp/>}/>
            <Route path="topics/create" element={<CreateTopic/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
