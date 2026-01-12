import {AppSidebar, Button, SkeletonHotTopic, SkeletonNewTopic} from "@/components";
import {PencilLine} from "lucide-react";
import {useNavigate} from 'react-router'

export default function Index() {

  const navigate = useNavigate();

  return (
    <main className="w-full h-full min-h-[720px] flex p-6 gap-6">
      <div className="fixed right-1/2 translate-1/2 bottom-10 z-20">
        <Button variant="destructive" className="!py-5 !px-6 rounded-full"
                onClick={() => { navigate("/topics/create") }}>
          <PencilLine/>
          나만의 토픽 작성
        </Button>
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