import {
  AppEditor,
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectGroup, SelectItem, SelectLabel,
  SelectTrigger,
  SelectValue,
  Skeleton
} from '@/components'
import {ArrowLeft, Asterisk, BookOpenCheck, ImageOff, Save} from 'lucide-react'
import {TOPIC_CATEGORIES} from '@/constants/category.constant.tsx'
import {useState} from 'react'
import {toast} from 'sonner'
import type {Block} from '@blocknote/core'
import supabase from '@/lib/supabase.ts'
import {useAuthStore} from '@/stores'
import {useParams} from 'react-router'

export default function CreateTopic() {

  const {user} = useAuthStore()
  const params = useParams()
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<Block[]>([])
  const [category, setCategory] = useState<string>('')
  const [thumbnail, setThumbnail] = useState<string>('')

  const handleSave = async () => {
    if (!title && !content && !category && !thumbnail) {
      toast.warning("토픽에 제목, 본문, 분류, 썸네일 등 아무것도 정하지 않았습니다.")
      return
    }

    // 뭔가 썸네일 처리해야 하고...
    setThumbnail("")

    const { data, error } = await supabase
      .from('topics')
      .update({ author: user?.id, title, content, thumbnail, category })
      .eq("id", params.id)
      .select()

    if (error) {
      toast.error(error.message)
      return
    }

    if (data) {
      toast.success("토픽을 저장했습니다.")
    }
  }

  return (
    <main className="w-full h-full min-h-[1024px] flex gap-6 p-6">
      <div className="fixed right-1/2 translate-x-1/2 bottom-10 z-20 flex  gap-2">
        <Button variant="outline" size="icon">
          <ArrowLeft/>
        </Button>
        <Button variant="outline" className="w-22 !bg-yellow-800/50" onClick={handleSave}>
          <Save/>저장
        </Button>
        <Button variant="outline" className="w-22 !bg-emerald-800/50">
          <BookOpenCheck/>발행
        </Button>
      </div>
      {/* 토픽 작성하기 */}
      <section className="w-3/4 flex flex-col gap-6">
        <div className="flex flex-col pb-6 border-b">
          <span className="text-[#F96859] font-semibold">스텝 01</span>
          <span className="text-base font-semibold">토픽 작성하기</span>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1">
            <Asterisk size={14} className="text-[#F96859]"/>
            <Label className="text-muted-foreground">제목</Label>
          </div>
          <Input placeholder="토픽 제목을 입력하세요." value={title}
                 onChange={(event) => { setTitle(event.target.value) }}
                 className="border-b-black h-16 pl-6 placeholder:text-lg placeholder:font-semibold"/>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1">
            <Asterisk size={14} className="text-[#F96859]"/>
            <Label className="text-muted-foreground">본문</Label>
          </div>
          {/* <Skeleton className="w-full h-100" /> */}
          {/* BlockNote Editor */}
          <AppEditor setContent={setContent}/>
        </div>
      </section>
      {/* 카테고리와 썸네일 등록 */}
      <section className="w-1/4 h-full flex-col flex gap-6">
        <div className="flex flex-col pb-6 border-b">
          <span className="text-[#F96859] font-semibold">스텝 02</span>
          <span className="text-base font-semibold">카테고리와 썸네일 등록</span>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1">
            <Asterisk size={14} className="text-[#F96859]"/>
            <Label className="text-muted-foreground">카테고리</Label>
          </div>
          <Select value={category} onValueChange={(value) => { setCategory(value) }}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="토픽 주제 선택"/>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>카테고리(주제)</SelectLabel>
                {TOPIC_CATEGORIES.map((item) => {
                  return (
                    <SelectItem key={item.id} value={item.category}>{item.label}</SelectItem>
                  )
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1">
            <Asterisk size={14} className="text-[#F96859]"/>
            <Label className="text-muted-foreground">썸네일</Label>
          </div>
          <Skeleton className="w-full aspect-video" />
          <Button variant="outline" className="border-0">
            <ImageOff/>썸네일 제거
          </Button>
        </div>
      </section>
    </main>
  )
}