"use client";

import {CodeHighlightNode, CodeNode} from "@lexical/code";
import {AutoLinkNode, LinkNode} from "@lexical/link";
import {ListItemNode, ListNode} from "@lexical/list";
import {TRANSFORMERS} from "@lexical/markdown";
import {AutoFocusPlugin} from "@lexical/react/LexicalAutoFocusPlugin";
import {LexicalComposer} from "@lexical/react/LexicalComposer";
import {ContentEditable} from "@lexical/react/LexicalContentEditable";
import {HistoryPlugin} from "@lexical/react/LexicalHistoryPlugin";
import {LinkPlugin} from "@lexical/react/LexicalLinkPlugin";
import {ListPlugin} from "@lexical/react/LexicalListPlugin";
import {MarkdownShortcutPlugin} from "@lexical/react/LexicalMarkdownShortcutPlugin";
import {OnChangePlugin} from "@lexical/react/LexicalOnChangePlugin";
import {RichTextPlugin} from "@lexical/react/LexicalRichTextPlugin";
import {HeadingNode, QuoteNode} from "@lexical/rich-text";
import {TableCellNode, TableNode, TableRowNode} from "@lexical/table";
import {TablePlugin} from "@lexical/react/LexicalTablePlugin";
import {CheckListPlugin} from "@lexical/react/LexicalCheckListPlugin";
import {HorizontalRuleNode} from "@lexical/react/LexicalHorizontalRuleNode";
import {HorizontalRulePlugin} from "@lexical/react/LexicalHorizontalRulePlugin";
import {ClickableLinkPlugin} from "@lexical/react/LexicalClickableLinkPlugin";
import {TabIndentationPlugin} from "@lexical/react/LexicalTabIndentationPlugin";
import {CharacterLimitPlugin} from "@lexical/react/LexicalCharacterLimitPlugin";
import {OverflowNode} from "@lexical/overflow";
import {CodeHighlightPlugin} from "./editor/plugins/CodeHighlightPlugin";
import {ImagesPlugin, ImageNode} from "./editor/plugins/ImagesPlugin";
import {EditorState} from "lexical";
import ToolbarPlugin from "./editor/toolbar-plugin";
import {useState} from "react";


export interface BlogEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  maxLength?: number;
  previewMode?: boolean;
}

function Placeholder({text}: { text: string }) {
  return <div className="absolute top-[1.125rem] left-[1.125rem] text-gray-400">{text}</div>;
}

export function BlogEditor({
                             content,
                             onChange,
                             placeholder = "Start writing your blog post...",
                             maxLength,
                             previewMode = false
                           }: BlogEditorProps) {
  const [floatingAnchorElem, setFloatingAnchorElem] = useState<HTMLDivElement | null>(null);

  // Initialize with content if it exists and is valid JSON
  const getInitialContent = () => {
    if (!content) return undefined;
    try {
      // Will throw if content is not valid JSON
      JSON.parse(content);
      return content;
    } catch (e) {
      console.warn("Invalid editor state JSON, starting with empty editor", e);
      return undefined;
    }
  };

  const initialConfig = {
    namespace: "BlogEditor",
    editable: !previewMode,
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
        nested: {
          listitem: "ml-5",
        },
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
        strikethrough: "line-through",
        underlineStrikethrough: "underline line-through",
        code: "bg-gray-100 dark:bg-gray-800 p-1 rounded font-mono text-sm",
      },
      code: "block bg-gray-100 dark:bg-gray-800 p-4 rounded my-4 font-mono text-sm overflow-x-auto",
      table: "border-collapse w-full my-4",
      tableCell: "border border-gray-300 dark:border-gray-700 p-2",
      tableRow: "",
      tableCellHeader: "bg-gray-100 dark:bg-gray-800 font-bold",
    },
    onError(error: Error) {
      console.error(error);
    },
    editorState: getInitialContent(),
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
      LinkNode,
      HorizontalRuleNode,
      OverflowNode,
      ImageNode
    ],
  };

  const handleChange = (editorState: EditorState) => {
    onChange(JSON.stringify(editorState.toJSON()));
  };

  const onRef = (ref: HTMLDivElement) => {
    if (ref !== null) {
      setFloatingAnchorElem(ref);
    }
  };

  // Function to render the remaining characters count
  const renderCharacterLimit = maxLength ? ({remainingCharacters}: { remainingCharacters: number }) => (
    <div className="absolute bottom-2 right-2 text-xs text-muted-foreground px-2 py-1 bg-background/80 rounded">
      {remainingCharacters} characters remaining
    </div>
  ) : undefined;

  return (
      <LexicalComposer initialConfig={initialConfig}>
        <div className="editor-container rounded-md border">
          {!previewMode && <ToolbarPlugin/>}
          <div className="editor-inner relative">
            <RichTextPlugin
              contentEditable={
                <div className="editor-scroller">
                  <div className="editor" ref={onRef}>
                    <ContentEditable
                      className={`editor-input ${previewMode ? 'prose prose-sm max-w-none p-6' : 'min-h-[300px] p-4 focus:outline-none prose prose-sm max-w-none'} ${previewMode ? 'bg-gray-50 dark:bg-gray-900/50' : ''}`}
                    />
                  </div>
                </div>
              }
              placeholder={!previewMode ? <Placeholder text={placeholder}/> : null}
              ErrorBoundary={() => <div>Something went wrong with the editor</div>}
            />
            <HistoryPlugin/>
            {!previewMode && <AutoFocusPlugin/>}
            <ListPlugin/>
            <LinkPlugin/>
            <TablePlugin/>
            <CodeHighlightPlugin/>
            <CheckListPlugin/>
            <HorizontalRulePlugin/>
            <TabIndentationPlugin/>
            <ClickableLinkPlugin/>
            {maxLength && !previewMode && (
              <CharacterLimitPlugin
                charset="UTF-8"
                maxLength={maxLength}
                renderer={renderCharacterLimit}
              />
            )}
            <MarkdownShortcutPlugin transformers={TRANSFORMERS}/>
            <OnChangePlugin onChange={handleChange}/>
          </div>
        </div>
      </LexicalComposer>
  );
}