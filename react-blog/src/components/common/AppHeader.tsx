import {Separator} from "@/components";
import {NavLink, useNavigate} from 'react-router'
import {useAuthStore} from '@/stores'

export function AppHeader() {

  const navigate = useNavigate();
  const {email, resetAuth} = useAuthStore()

  const handleLogout = () => { resetAuth() }

  return (
    <header className="fixed top-0 z-20 w-full flex items-center justify-center bg-stone-800">
      <div className="w-full max-w-[1328px] flex items-center justify-between px-6 py-3">
        {/*로고와 네비게이션 메뉴 UI*/}
        <div className="flex items-center gap-5">
          <div className="w-6 h-6">
            <img src="/duck_10983468.png" alt="@LOGO" className="object-cover cursor-pointer"
                 onClick={() => { navigate("/") }} />
          </div>
          <div className="flex items-center gap-5">
            <div className="font-semibold">토픽 인사이트</div>
            <Separator orientation="vertical" className="!h-4"/>
            <div className="font-semibold">포트폴리오</div>
          </div>
        </div>
        {/*로그인 UI*/}
        {email ? (
          <div className="flex items-center gap-5">
            <span>{email}</span>
            <Separator orientation="vertical" className="!h-4"/>
            <span className="cursor-pointer" onClick={handleLogout}>로그아웃</span>
          </div>
        ) : (
          <NavLink to={"/sign-in"}>로그인</NavLink>
        )}
      </div>
    </header>
  )
};