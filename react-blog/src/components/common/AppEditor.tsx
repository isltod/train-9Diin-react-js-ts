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

interface Props {
  content?: Block[]
  setContent: (content: Block[]) => void
}

export function AppEditor({content, setContent}: Props) {
  const locale = ko;

  // Create a new editor instance
  const editor = useCreateBlockNote({
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
  return <BlockNoteView editor={editor} onChange={() => setContent(editor.document)} />;
}