import {useNavigate} from 'react-router'
import {toast} from 'sonner'
import {useEffect} from 'react'
import supabase from '@/lib/supabase.ts'
import {useAuthStore} from '@/stores'

export function AuthCallback() {

  const navigate = useNavigate();
  const {setUser} = useAuthStore()

  useEffect(() => {
    const handleAuthCallback = async () => {
      // 세션을 확인해서 문제있으면 로그인 페이지로 보낸다...
      // 근데 이걸 왜 supabase에 또 묻지? 이미 로컬 스토리지에 토큰으로 와 있는데?
      const {data: {session}, error: sessionError} = await supabase.auth.getSession()

      if (!session || !session.user || sessionError) {
        console.error("세션 처리 오류, 로그인에 문제가 있습니다.", sessionError)
        toast.error("로그인에 문제가 있습니다.")

        navigate('/sign-in')
        return
      }

      // 문제가 없는 경우는 메인 페이지로...
      setUser({
        id: session.user.id,
        // 그냥 하면 빨간줄... as string으로 타입 줘야 사라진다...
        email: session.user.email as string,
        role: session.user.role as string,
      })
      toast.success(`${session.user.app_metadata.provider} 로그인에 성공했습니다.`)
      navigate('/');
    }

    handleAuthCallback();
  }, [navigate]);

  return (
    <main className="w-full h-full min-h-[720px] flex items-center justify-center">
      <p>로그인을 진행 중입니다. 잠시만 기다려 주세요.</p>
      {/* 로딩 스피너 등을 추가할 수 있다... */}
    </main>
  )
}