import {ChevronDown} from "lucide-react";
import {CLASS_CATEGORIES} from "@/constants/category.constant.tsx";
import {Button} from "@/components";

export function AppSidebar() {
  return (
    <aside className="min-w-60 w-60 flex flex-col gap-6">
      <div className="flex items-center gap-2">
        {/*Shadcn UI의 Typography h4 컴포넌트 그대로 사용*/}
        {/*이렇게 설치 안하고 코드로 복사해서 사용해도 되는 모양...*/}
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">카테고리</h4>
        <ChevronDown className="mt-1"/>
      </div>
      <div className="flex flex-col gap-2 w-full">
        {
          CLASS_CATEGORIES.map((menu) => {
            return (
              // pl: padding-left
              <Button
                key={menu.id}
                className="justify-start text-muted-foreground hover:pl-6 transition-all duration-500"
                variant="ghost"
              >
                {menu.icon}
                {menu.label}
              </Button>
            )
          })
        }
      </div>
    </aside>
  )
}