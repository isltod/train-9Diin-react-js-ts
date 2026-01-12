import {Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input} from '@/components'
import {z} from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'
import {NavLink, useNavigate} from 'react-router'
import supabase from '@/lib/supabase.ts'
import {toast} from 'sonner'

const formSchema = z.object({
  email: z.email({
    error: "올바른 형식의 이메일 주소를 입력해 주세요.",
  }),
  password: z.string().min(8, {
    error: "비밀 번호는 최소 8자 이상이어야 합니다.",
  }),
})

export default function SignIn() {

  const navigate = useNavigate()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (formData : z.infer<typeof formSchema>) => {
    console.log("로그인 버튼 클릭...")

    try {
      // 로그인 시도
      const { data: {user, session}, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      })

      // 여기 error는 supabase에서 생긴 오류
      if (error) {
        toast.error(error.message)
        return
      }

      // 여기 왔다는 것은 일단 사용자 등록에 성공해서 data를 받았다는 얘기...근데 여기서 data를 또 확인해야 하나?
      if (user && session) {
        // user와 session을 이용해서 로그인 후 처리 필요...
        toast.success("로그인에 성공했습니다.")
        navigate("/")
      }

      // 여기 appError는 이 앱 실행 중 생긴 오류...
    } catch (appError) {
      console.log(appError)
      throw new Error(`${appError}`)
    }

  }

  return (
    <main className="h-full min-h-[720px] flex justify-center items-center">
      <div className="w-100 flex flex-col gap-6 p-6">
        <div>
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">로그인</h4>
          <p className="text-muted-foreground">로그인을 위한 정보를 입력해주세요.</p>
        </div>
        <div className="grid gap-3">
          {/* 소셜 로그인 */}
          <Button variant="secondary">
            <img src="/login_12795960.png" alt="@LOGIN" className="w-[18px] h-[18px] mr-1"/>
            구글 로그인
          </Button>
          {/* 경계선 */}
          <div className="relative">
            <div className="relative">
              <span className="px-2 text-muted-foreground">OR CONTINUE WITH</span>
            </div>
          </div>
          {/* 로그인 폼 */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>이메일</FormLabel>
                    <FormControl>
                      <Input placeholder="이메일을 입력하세요." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>비밀번호</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="비밀번호를 입력하세요." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col gap-3">
                <Button type="submit">로그인</Button>
                <div className="flex justify-between">
                  계정이 없으신가요?
                  <NavLink to={"/sign-up"} className="underline ml-3.5">회원 가입</NavLink>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </main>
  )
};