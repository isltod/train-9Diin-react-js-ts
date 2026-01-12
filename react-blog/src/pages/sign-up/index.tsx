import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {
  Button,
  Checkbox,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Label,
  Separator
} from '@/components'
import {NavLink} from 'react-router'
import {z} from 'zod'
import {useState} from 'react'
import {ArrowLeft, Asterisk, ChevronRight} from 'lucide-react'

const formSchema = z.object({
  email: z.email({
    error: "올바른 형식의 이메일 주소를 입력해 주세요.",
  }),
  password: z.string().min(8, {
    error: "비밀 번호는 최소 8자 이상이어야 합니다.",
  }),
  confirmPassword: z.string().min(8, {
    error: "비밀 번호 확인을 입력해 주세요.",
  }),
}).superRefine(
  ({password, confirmPassword}, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "비밀 번호가 일치하지 않습니다.",
        path: ["confirmPassword"],
      })
    }
  })

export default function SignUp() {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const [serviceAgreed, setServiceAgreed] = useState<boolean>(false)
  const [privacyAgreed, setPrivacyAgreed] = useState<boolean>(false)
  const [marketingAgreed, setMarketingAgreed] = useState<boolean>(false)

  const handleCheckService = () => setServiceAgreed(!serviceAgreed)
  const handleCheckPrivacy = () => setPrivacyAgreed(!privacyAgreed)
  const handleCheckMarketing = () => setMarketingAgreed(!marketingAgreed)

  const onSubmit = () => {
    console.log("로그인 버튼 클릭...")
  }

  return (
    <main className="w-full h-full min-h-[720px] flex flex-col items-center justify-center">
      <div className="w-100 flex flex-col gap-6 p-6">
        <div>
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">회원가입</h4>
          <p className="text-muted-foreground">회원가입을 위한 정보를 입력해주세요.</p>
        </div>
        <div>
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
                      <Input placeholder="비밀번호를 입력하세요." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>비밀번호 확인</FormLabel>
                    <FormControl>
                      <Input placeholder="비밀번호 확인을 입력하세요." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid gap-2">
                <div className="grid gap-2">
                  <div className="flex gap-1 items-center">
                    <Asterisk size={14} className="text-[#F96859]"/>
                    <Label>필수 동의 항목</Label>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        <Checkbox checked={serviceAgreed} onCheckedChange={handleCheckService}
                                  className="w-[18px] h-[18px] border border-stone-600" />
                        서비스 이용 약관 동의
                      </div>
                      <Button variant="link" className="!p-0 gap-1">
                        <p className="text-xs">자세히 보기</p>
                        <ChevronRight className="mt-[2px]"/>
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        <Checkbox checked={privacyAgreed} onCheckedChange={handleCheckPrivacy}
                                  className="w-[18px] h-[18px] border border-stone-600" />
                        개인정보 수집 및 이용 동의
                      </div>
                      <Button variant="link" className="!p-0 gap-1">
                        <p className="text-xs">자세히 보기</p>
                        <ChevronRight className="mt-[2px]"/>
                      </Button>
                    </div>
                  </div>
                </div>
                <Separator/>
                <div className="grid gap-2">
                  <Label>선택 동의 항목</Label>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <Checkbox checked={marketingAgreed} onCheckedChange={handleCheckMarketing}
                                className="w-[18px] h-[18px] border border-stone-600" />
                      마케팅 및 광고 수신 동의
                    </div>
                    <Button variant="link" className="!p-0 gap-1">
                      <p className="text-xs">자세히 보기</p>
                      <ChevronRight className="mt-[2px]"/>
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <Button type="button" variant="outline" size="icon">
                    <ArrowLeft/>
                  </Button>
                  <Button type="submit" variant="outline" className="flex-1 !bg-sky-800/50">
                    회원가입
                  </Button>
                </div>
                <div className="flex justify-between">
                  이미 계정이 있으신가요?
                  <NavLink to={"/sign-in"} className="underline">
                    로그인
                  </NavLink>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </main>
  )
};