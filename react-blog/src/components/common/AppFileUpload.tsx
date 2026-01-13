import {Button, Input} from '@/components'
import {useRef} from 'react'
import {Image} from 'lucide-react'

interface Props {
  thumbnail: File | string | null
  setThumbnail: (thumbnail: File | string | null) => void
}

export function AppFileUpload({ thumbnail, setThumbnail }: Props) {

  const imgSelector = useRef<HTMLInputElement | null>(null);

  const handleChangeImg = () => {
    // e.target.files보다는 ref도 사용했으니 요소 값을 이용하는 것 나을 듯...
    if (imgSelector.current && imgSelector.current.files) {
      setThumbnail(imgSelector.current.files[0] ?? null);
      // 이걸 안하면 같은 파일을 지웠다 선택하면 onChange가 다시 호출되질 않는다...
      imgSelector.current.value = "";
    }
  }

  const previewThumbnail = () => {
    const imgClass = "w-full aspect-video rounded-lg object-cover border"
    // 기본형: 저장소 경로를 문자열로 표시
    if (typeof thumbnail === "string") {
      return (
        <img src={thumbnail} alt="@THUMBNAIL" className={imgClass} />
      )
    }

    // 저장 전 파일 Input 태그에서 파일을 선택한 경우
    if (thumbnail instanceof File) {
      return (
        <img src={URL.createObjectURL(thumbnail)} alt="@THUMBNAIL" className={imgClass} />
      )
    }

    // 처음, 그리고 썸네일 없는 경우 기본 이미지 아이콘 표시
    return (
      <div className="w-full aspect-video rounded-lg bg-card flex justify-center items-center"
           onClick={() => imgSelector.current?.click()}>
        <Button size="icon" variant="ghost" >
          <Image/>
        </Button>
      </div>
    )
  }

  return (
    <>
    {/* 아래 Fragment 태그 축약형으로 위와 마지막 태그 사용 - 여러 태그를 묶어주고 자신은 DOM에 등록되지 않는다고... */}
    {/* <Fragment> */}
      {previewThumbnail()}
      <Input type="file" accept="image/*" ref={imgSelector} onChange={handleChangeImg} className="hidden"/>
    {/* </Fragment> */}
    </>
  )
}