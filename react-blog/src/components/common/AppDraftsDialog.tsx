import {
  Badge,
  Button, Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger, Separator
} from '@/components'
import {useAuthStore} from '@/stores'
import {useNavigate} from 'react-router'
import {type Topic, TOPIC_STATUS} from '@/types/topic.type.ts'
import {useEffect, useState} from 'react'
import supabase from '@/lib/supabase.ts'
import {toast} from 'sonner'
import dayjs from 'dayjs'

interface Props {
  children: React.ReactNode
}

export function AppDraftsDialog({ children }: Props) {

  const {user} = useAuthStore()
  const navigate = useNavigate()
  const [topics, setTopics] = useState<Topic[]>([])


  useEffect(() => {
    const getDrafts = async () => {
      if (!user) return

      try {
        const { data: drafts, error } = await supabase
          .from("topics")
          .select("*")
          .eq("author", user.id).eq("status", TOPIC_STATUS.TEMP)

        if (error) {
          toast.error(error.message)
          return
        }

        if (drafts) setTopics(drafts)
      } catch (error) {
        toast.error("알 수 없는 오류가 발생했습니다.")
        console.log(error)
        navigate("/")
      }
    }

    getDrafts()
  }, [])

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>임시 저장된 토픽</DialogTitle>
          <DialogDescription>
            임시 저정된 토픽입니다. 이어서 작성하거나 삭제할 수 있습니다.
          </DialogDescription>
        </DialogHeader>
        {/* 이건 내용 담는 별도 태그는 없는 모양이네... */}
        <div className="grid gap-3 py-4">
          <div className="flex items-center gap-2">
            <p>임시저장</p>
            <p className="text-base text-green-600 -mr-[6px]">{topics.length}</p>
            <p>건</p>
          </div>
          <Separator/>
          {topics.length > 0 ? (
            <div className="h-80 overflow-y-scroll flex flex-col gap-3">
              {topics.map((topic : Topic, index: number) => {
                return (
                  <div className="flex justify-between items-center cursor-pointer py-2 px-4 rounded-md bg-card/50"
                       onClick={() => { navigate(`/topics/${topic.id}/create`) }}>
                    <div className="flex gap-2 py-2">
                      <Badge className="w-5 h-5 mt-1.5 rounded-sm aspect-square text-foreground bg-[#E26F24]">
                        {index + 1}
                      </Badge>
                      <div>
                        <p>{topic.title}</p>
                        <p className="text-xs text-muted-foreground">
                          작성일: {dayjs(topic.created_at).format("YYYY. MM. DD.")}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline">작성중</Badge>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="bg-blue-500 h-60 flex justify-center">
              <p className="bg-emerald-500">조회 가능한 정보가 없습니다.</p>
            </div>
          )}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline" className="border-0">
              닫기
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}