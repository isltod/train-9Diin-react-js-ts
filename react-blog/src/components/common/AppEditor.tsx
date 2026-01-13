import { useCreateBlockNote } from "@blocknote/react";
// Or, you can use ariakit, shadcn, etc.
import { BlockNoteView } from "@blocknote/mantine";
// Default styles for the mantine editor
import "@blocknote/mantine/style.css";
// Include the included Inter font
import "@blocknote/core/fonts/inter.css";
import {ko} from '@blocknote/core/locales'

export function AppEditor() {
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
  // Render the editor
  return <BlockNoteView editor={editor} />;
}