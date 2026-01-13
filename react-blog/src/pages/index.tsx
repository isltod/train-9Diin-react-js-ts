import {AppDraftsDialog, AppSidebar, Button, SkeletonHotTopic, SkeletonNewTopic} from "@/components";
import {CircleSmall, NotebookPen, PencilLine} from "lucide-react";
import {useNavigate} from 'react-router'
import {useAuthStore} from '@/stores'
import {toast} from 'sonner'
import supabase from '@/lib/supabase.ts'

export default function Index() {

  const navigate = useNavigate();
  const {user} = useAuthStore()

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
      <AppSidebar />
      {/*토픽 콘텐츠*/}
      <section className="flex-1 flex flex-col gap-12">
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
          <div className="grid grid-cols-4 gap-6">
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
          <div className="grid grid-cols-2 gap-6">
            {/* 이게 대충 모양만 만들어서 번뜩거리는 모양이네... */}
            <SkeletonNewTopic/>
            <SkeletonNewTopic/>
            <SkeletonNewTopic/>
            <SkeletonNewTopic/>
          </div>
        </div>
      </section>
    </main>
  )
}