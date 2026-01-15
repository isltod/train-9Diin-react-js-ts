import type {Topic} from '@/types/topic.type.ts'
import {Card, Separator} from '@/components'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import "dayjs/locale/ko"
import {CaseSensitive} from 'lucide-react'
import {useNavigate} from 'react-router'

dayjs.locale('ko')
dayjs.extend(relativeTime)

interface Props {
  topic: Topic;
}

function getSampleText(text: string, maxChars = 200): string {

  try {
    // 받은 text가 문자열이면 parse해서 배열로, 아니면 배열일 것이다?
    const parsed = JSON.parse(text)

    // 그런데도 안되면 뭔가 문제가 있고...
    if (!Array.isArray(parsed)) {
      console.error("본문 형식에 문제가 있습니다.")
      return ""
    }

    // 배열이 된다면 맞다고 보고 각 요소에서 기본 텍스트만 추출
    let sampleText = ''
    for (const block of parsed) {
      if (Array.isArray(block.content)) {
        for (const line of block.content) {
          if (line.text) {
            sampleText += line.text + " "

            // 최대 글자수 넘어가면 처리하고 끝
            if (sampleText.length > maxChars) {
              return sampleText.slice(0, maxChars) + "..."
            }
          }
        }
      }
    }
    return sampleText.trim()

  } catch (error) {
    console.error("본문 해석 실패: ", error)
    return ""
  }
}

export function NewTopicCard({ topic }: Props) {

  const navigate = useNavigate()

  return (
    <Card className="h-fit p-4 cursor-pointer" onClick={() => { navigate(`/topics/${topic.id}/detail`) }}>
      <div className="flex justify-between gap-6">
        <div className="flex flex-col gap-4">
          <h3 className="h-16 text-base font-semibold tracking-tight line-clamp-2">
            <CaseSensitive size={16} className="text-muted-foreground"/>
            {topic.title}
          </h3>
          <p className="line-clamp-3 text-muted-foreground">{getSampleText(topic.content)}</p>
        </div>
        <img src={topic.thumbnail} alt="@THUNBNAIL" className="w-[140px] h-[140px] object-cover rounded-lg" />
      </div>
      <Separator/>
      <div className="flex justify-between">
        <p>{topic.users.email.split("@")[0]}</p>
        {/* <p>{dayjs(topic.created_at).format("YYYY. MM. DD.")}</p> */}
        <p>{dayjs(topic.created_at).fromNow()}</p>
      </div>
    </Card>
  )
}