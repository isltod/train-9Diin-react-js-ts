import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input} from '@/components'
import {NavLink} from 'react-router'
import {z} from 'zod'

const formSchema = z.object({
  email: z.email({
    error: "올바른 형식의 이메일 주소를 입력해 주세요.",
  }),
  password: z.string().min(8, {
    error: "비밀 번호는 최소 8자 이상이어야 합니다.",
  }),
})

export default function SignUp() {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = () => {
    console.log("로그인 버튼 클릭...")
  }

  return (
    <main className="bg-gray-300">
      <div className="bg-blue-300">
        <div className="bg-emerald-300">
          <h4>회원가입</h4>
          <p>로그인을 위한 정보를 입력해주세요.</p>
        </div>
        <div className="bg-purple-300">
          {/* 소셜 로그인 */}
          <div className="bg-rose-300">
            <Button className="bg-amber-300">
              <img src="/login_12795960.png" alt="@LOGIN"/>
              구글 로그인
            </Button>
          </div>
          {/* 경계선 */}
          <div className="bg-green-300">
            <div className="bg-gray-300">
              <span className="bg-rose-300"></span>
            </div>
            <div className="bg-blue-300">
              <span className="bg-gray-400">OR CONTINUE WITH</span>
            </div>
          </div>
          {/* 로그인 폼 */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="bg-orange-300 space-y-8">
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
                      <Input placeholder="비밀번호를 입력하세요." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="bg-blue-300">
                <Button type="submit">Submit</Button>
                <div className="bg-purple-300">
                  계정이 없으신가요?
                  <NavLink to={"sign-up"} className="bg-rose-300">회원 가입</NavLink>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </main>
  )
};