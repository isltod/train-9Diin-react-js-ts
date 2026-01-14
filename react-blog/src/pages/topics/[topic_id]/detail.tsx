import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AppEditor,
  Button,
  Separator
} from '@/components'
import {ArrowLeft, Trash} from 'lucide-react'
import {useNavigate, useParams} from 'react-router'
import {useEffect, useState} from 'react'
import supabase from '@/lib/supabase.ts'
import {toast} from 'sonner'
import type {Block} from '@blocknote/core'
import {useAuthStore} from '@/stores'
import dayjs from 'dayjs'

export function TopicDetail() {

  const navigate = useNavigate();
  const params = useParams()
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<Block[]>([])
  const [category, setCategory] = useState<string>('')
  const [thumbnail, setThumbnail] = useState<string | null>(null)
  const [created_at, setCreated_at] = useState<string>('')
  const [author, setAuthor] = useState<string>('')
  const {user} = useAuthStore()

  useEffect(() => {
    const getTopic = async () => {
      try {
        const {data, error} = await supabase.from('topics').select("*").eq("id", params.id)

        if (error) {
          toast.error(error.message)
          return
        }

        // 데이터 받았으면...
        if (data) {
          const topic = data[0]
          setTitle(topic.title)
          setContent(JSON.parse(topic.content))
          setCategory(topic.category)
          setThumbnail(topic.thumbnail)
          setCreated_at(dayjs(topic.created_at).format("YYYY. MM. DD."))
          setAuthor(topic.author)
        }
      } catch (error) {
        console.log(error)
        throw error
      }
    }

    getTopic()
  }, [])

  const handleDelete = async () => {
    try {
      const {error} = await supabase.from('topics').delete().eq("id", params.id)

      if (error) {
        toast.error(error.message)
        return
      }

      // 여기 왔다는 건 삭제 성공이라...
      toast.success('글이 완전히 삭제되었습니다.')
      navigate("/")

    } catch (AppError) {
      console.log(AppError)
    }
  }

  return (
    <main className="min-h-[720px]">
      <section className="relative h-60 md:h-100 bg-cover bg-accent bg-[50%_35%]" style={{ backgroundImage: `url(${thumbnail})` }}>
        <div className="absolute top-6 z-10 left-6 flex gap-2">
          <Button variant="outline" size="icon" onClick={() => navigate("/") }>
            <ArrowLeft/>
          </Button>
          {/* 작성자한테만 보이도록 */}
          {author === user?.id && (
            <AlertDialog>
              <AlertDialogTrigger>
                <Button variant="outline" size="icon" className="bg-red-500/50">
                  <Trash/>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>이 글을 정말 삭제하시겠습니까?</AlertDialogTitle>
                  <AlertDialogDescription>
                    '삭제'를 선택하면 이 글의 모든 내용이 완전히 삭제되어 다시는 복구할 수 없게 됩니다.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>닫기</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-red-700/50 text-foreground hover:bg-red-600"
                    onClick={() => handleDelete()}>
                    삭제
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
        {/* 좌 우 하단 그라데이션 */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-l from-[#0a0a0a] via-transparent to-transparent"></div>
      </section>
      <section className="relative flex flex-col items-center -mt-40">
        <span className="mb-4"># {category}</span>
        <h1 className="scroll-m-20 text-center font-extrabold tracking-tight text-xl sm:text-2xl md:text-4xl">
          {title}
        </h1>
        <Separator className="!w-6 my-6 bg-foreground"/>
        <span>{created_at}</span>
      </section>
      <section className="pt-12 pb-6">
        {content && <AppEditor content={content} readonly={true} />}
      </section>
    </main>
  )
}