"use client";

import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { ListItemNode, ListNode } from "@lexical/list";
import { TRANSFORMERS } from "@lexical/markdown";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { EditorState } from "lexical";
import ToolbarPlugin from "./editor/toolbar-plugin";

interface BlogEditorProps {
  content: string;
  setContent: (content: string) => void;
}

function Placeholder() {
  return <div className="absolute top-[1.125rem] left-[1.125rem] text-gray-400">Start writing your blog post...</div>;
}

export function BlogEditor({ content, setContent }: BlogEditorProps) {
  const initialConfig = {
    namespace: "BlogEditor",
    theme: {
      ltr: "ltr",
      rtl: "rtl",
      paragraph: "mb-2",
      quote: "border-l-4 border-gray-500 pl-4 italic my-4",
      heading: {
        h1: "text-3xl font-bold my-4",
        h2: "text-2xl font-bold my-3",
        h3: "text-xl font-bold my-2",
        h4: "text-lg font-bold my-2",
        h5: "text-base font-bold my-1",
      },
      list: {
        ol: "list-decimal pl-5 my-2",
        ul: "list-disc pl-5 my-2",
        listitem: "my-1",
      },
      image: "my-4 max-w-full h-auto",
      link: "text-blue-500 underline",
      text: {
        bold: "font-bold",
        italic: "italic",
        underline: "underline",
        code: "bg-gray-100 p-1 rounded font-mono text-sm",
      },
    },
    onError(error: Error) {
      console.error(error);
    },
    nodes: [
      HeadingNode,
      ListNode,
      ListItemNode,
      QuoteNode,
      CodeNode,
      CodeHighlightNode,
      TableNode,
      TableCellNode,
      TableRowNode,
      AutoLinkNode,
      LinkNode
    ],
  };

  const onChange = (editorState: EditorState) => {
      setContent(JSON.stringify(editorState.toJSON()));
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="editor-container">
        <ToolbarPlugin />
        <div className="editor-inner relative">
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input min-h-[300px] p-4 focus:outline-none" />}
            placeholder={<Placeholder />}
            ErrorBoundary={() => <></>}
          />
          <HistoryPlugin />
          <AutoFocusPlugin />
          <ListPlugin />
          <LinkPlugin />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
          <OnChangePlugin onChange={onChange} />
        </div>
      </div>
    </LexicalComposer>
  );
}