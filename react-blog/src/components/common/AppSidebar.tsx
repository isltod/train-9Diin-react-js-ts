import {ChevronDown} from "lucide-react";
import {CLASS_CATEGORIES} from "@/constants/category.constant.tsx";
import {Button} from "@/components";

interface Props {
  category: string;
  setCategory: (newCategory: string) => void;
}

export function AppSidebar({ category, setCategory }: Props) {
  return (
    <aside className="min-w-60 w-60 flex flex-col gap-6">
      <div className="flex items-center gap-2">
        {/*Shadcn UI의 Typography h4 컴포넌트 그대로 사용*/}
        {/*이렇게 설치 안하고 코드로 복사해서 사용해도 되는 모양...*/}
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">카테고리</h4>
        <ChevronDown className="mt-1"/>
      </div>
      <div className="w-full flex flex-col gap-2">
        {
          CLASS_CATEGORIES.map((menu) => {
            return (
              // pl: padding-left
              <Button
                key={menu.id}
                className={`justify-start text-muted-foreground hover:text-white hover:pl-6 transition-all duration-500 ${category === menu.category && "text-foreground !pl-6 bg-accent/50"} `}
                variant="ghost"
                onClick={() => {setCategory(menu.category)}}
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