import {Skeleton} from "@/components";

export function SkeletonHotTopic() {
  return (
    <div className="w-full min-w-58 flex flex-col gap-2">
      <Skeleton className="h-70 w-full"/>
      <div className="flex items-center gap-2">
        <Skeleton className="h-10 w-10 rounded-full"/>
        <div className="flex flex-col gap-2">
          <Skeleton className="w-32 h-3"/>
          <Skeleton className="w-20 h-[14px]"/>
        </div>
      </div>
    </div>
  )
}