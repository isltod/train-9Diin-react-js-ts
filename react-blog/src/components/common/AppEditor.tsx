import { useCreateBlockNote } from "@blocknote/react";
// Or, you can use ariakit, shadcn, etc.
import { BlockNoteView } from "@blocknote/mantine";
// Default styles for the mantine editor
import "@blocknote/mantine/style.css";
// Include the included Inter font
import "@blocknote/core/fonts/inter.css";
import {ko} from '@blocknote/core/locales'
import type {Block} from '@blocknote/core'
import {useEffect} from 'react'
import {nanoid} from 'nanoid'

interface Props {
  content?: Block[]
  setContent?: (content: Block[]) => void
  readonly?: boolean
}

export function AppEditor({content, setContent, readonly}: Props) {
  const locale = ko;

  // Create a new editor instance
  const editor = useCreateBlockNote({
    // 뭔가 값을 받으면 그걸 초기값으로 만들어주나? 아니면 빈 문서 만들고?
    initialContent: content && content.length > 0 ? (
      content
    ) : [
      {
        id: nanoid(),
        type: 'paragraph',
        props: {
          textAlignment: 'left',
          textColor: 'default',
          backgroundColor: 'default',
        },
        content: [
          {type: "text", text: "", styles: {}}
        ],
        children: [],
      },
    ],

    dictionary: {
      ...locale,
      placeholders: {
        ...locale.placeholders,
        // 빈문서 placeholder 메시지 오버라이딩
        emptyDocument: "내용을 입력하세요. 또는 '/' 키를 입력하면 메뉴가 표시됩니다.",
      },
    },
  });

  useEffect(() => {
    if (content && content.length > 0) {
      const current = JSON.stringify(editor.document);
      const next = JSON.stringify(content);

      // current 값과 next 값이 같으면 교체를 안함 => 무한 루프를 방지하기 위함
      if (current !== next) {
        editor.replaceBlocks(editor.document, content);
      }
    }
  }, [content, editor]);


  // Render the editor
  return (
    <BlockNoteView
      editor={editor}
      editable={!readonly}
      onChange={() => {
        if (!readonly) {
          // 이게 뭐지? 옵셔널 함수?에 뭘 넣으려면 점을 찍어줘야 하나?
          setContent?.(editor.document)
        }
      }}
    />
  );
}