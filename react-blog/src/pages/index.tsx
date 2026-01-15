import {AppDraftsDialog, AppSidebar, Button, NewTopicCard, SkeletonHotTopic} from "@/components";
import {CircleSmall, NotebookPen, PencilLine} from "lucide-react";
import {useNavigate, useSearchParams} from 'react-router'
import {useAuthStore} from '@/stores'
import {toast} from 'sonner'
import supabase from '@/lib/supabase.ts'
import {useEffect, useState} from 'react'
import {type Topic, TOPIC_STATUS} from '@/types/topic.type.ts'

export default function Index() {

  const navigate = useNavigate();
  const {user} = useAuthStore()
  const [topics, setTopics] = useState<Topic[]>([])
  const [searchParams, setSearchParams] = useSearchParams()
  const category = searchParams.get('category') || ""

  useEffect(() => {
    const getTopics = async () => {
      try {
        const query = supabase
          .from("topics")
          .select("*, users (email)")
          .eq("status", TOPIC_STATUS.PUBLISH)

        if (category && category.trim() !== "") {
          query.eq("category", category)
        }
        const {data, error} = await query

        if (error) {
          toast.error(error.message)
          return;
        };

        if (data) {
          setTopics(data)
          console.log(data)
        }

      } catch (AppError) {
        console.log(AppError)
        throw AppError;
      }
    }

    getTopics()
  }, [category])

  const handleCategory = (newCategory : string) => {
    // 새로 선택한 범주가 기존과 같으면 아무것도 안함
    if (newCategory === category) return
    // searchParam에 넣고 -> 그게 위에 get으로 category에 들어가고 -> useEffect에서 다시 부르고...
    if (newCategory === "") {
      setSearchParams({})
    } else {
      setSearchParams({category: newCategory})
    }
  }

  const handleCreateTopic = async () => {
    if (!user || !user.email) {
      toast.error("토픽 작성은 로그인 후에 가능합니다.")
      return;
    }


    const { data, error } = await supabase
      .from('topics')
      .insert([
        { author: user.id },
      ])
      .select()

    if (error) {
      toast.error(error.message)
      return;
    }

    if (data) {
      toast.success("새 토픽을 생성했습니다.")
      navigate(`/topics/${data[0].id}/create`)
    }
  }

  return (
    <main className="w-full h-full min-h-[720px] flex p-6 gap-6">
      <div className="fixed right-1/2 translate-1/2 bottom-10 z-20 flex gap-3">
        <Button variant="destructive" className="!py-5 !px-6 rounded-full" onClick={handleCreateTopic}>
          <PencilLine/>
          나만의 토픽 작성
        </Button>
        <AppDraftsDialog>
          <div className="relative">
            <Button variant="outline" className="w-10 h-10 rounded-full">
              <NotebookPen/>
            </Button>
            <CircleSmall size={14} className="absolute top-0 right-0 text-red-500" fill="#EF4444"/>
          </div>
        </AppDraftsDialog>
      </div>
      {/*카테고리 사이드바*/}
      <div className="hidden lg:block">
        <AppSidebar category={category} setCategory={handleCategory} />
      </div>
      {/*토픽 콘텐츠*/}
      <section className="w-full lg:w-[calc(100%-264px)] flex flex-col gap-12">
        {/*핫 토픽*/}
        <div className="flex flex-col gap-6 w-full">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <img src="/roasted-turkey_13373187.png" alt="@IMG" className="w-7 h-7"/>
              <h4 className="md:text-base text-muted-foreground">
                지금 가장 관심받는 주제들을 살펴보고 다양한 관점의 인사이트를 얻어보세요.
              </h4>
            </div>
          </div>
          <div className="w-full flex items-center gap-6 overflow-auto">
            {/* 이게 대충 모양만 만들어서 번뜩거리는 모양이네... */}
            <SkeletonHotTopic/>
            <SkeletonHotTopic/>
            <SkeletonHotTopic/>
            <SkeletonHotTopic/>
          </div>
        </div>
        {/*뉴 토픽*/}
        <div className="flex flex-col gap-6 w-full">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <img src="/champagne_13374532.png" alt="@IMG" className="w-7 h-7"/>
              <h4 className="md:text-base text-muted-foreground">
                새로운 시선으로 새로운 이야기를 시작하세요.
              </h4>
            </div>
          </div>
          {/* 이게 대충 모양만 만들어서 번뜩거리는 모양이네... */}
          {topics.length > 0 ? (
            <div className="flex flex-col min-h-120 md:grid md:grid-cols-2 gap-6">
              {topics.map(topic  => {
                return (
                  <NewTopicCard key={topic.id} topic={topic} />
                )
              })}
            </div>
          ) : (
            <div className="min-h-[120px] flex items-center justify-center">
              <p className="text-muted-foreground">조회 가능한 토픽이 없습니다.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}