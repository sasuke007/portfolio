"use client";

import { useState, useEffect, useRef } from "react";
import { SerializedEditorState } from "lexical";
import { Editor } from "@/components/blocks/editor-x/editor";

interface BlogEditorProps {
  initialContent?: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

// Default empty editor state
const defaultEditorState = {
  root: {
    children: [
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text: "",
            type: "text",
            version: 1,
          },
        ],
        direction: "ltr",
        format: "",
        indent: 0,
        type: "paragraph",
        version: 1,
      },
    ],
    direction: "ltr",
    format: "",
    indent: 0,
    type: "root",
    version: 1,
  },
} as unknown as SerializedEditorState;

export function BlogEditor({ initialContent, onChange, placeholder }: BlogEditorProps) {
  const [editorState, setEditorState] = useState<SerializedEditorState>(defaultEditorState);
  const [isInitialized, setIsInitialized] = useState(false);
  const [lastInitialContent, setLastInitialContent] = useState<string>("");

  // Initialize editor and handle content updates
  useEffect(() => {
    console.log('Editor effect - initialContent:', initialContent, 'lastInitialContent:', lastInitialContent);
    
    // Only reinitialize if content has actually changed and we have content
    if (initialContent !== lastInitialContent && initialContent && initialContent.trim()) {
      console.log('Reinitializing editor with updated content:', initialContent);
      
      // For now, we'll create a simple text representation
      // In a full implementation, you'd want to properly parse HTML to Lexical state
      const textContent = initialContent.replace(/<[^>]*>/g, ""); // Strip HTML tags for now
      
      if (textContent.trim()) {
        const newState = {
          root: {
            children: [
              {
                children: [
                  {
                    detail: 0,
                    format: 0,
                    mode: "normal",
                    style: "",
                    text: textContent,
                    type: "text",
                    version: 1,
                  },
                ],
                direction: "ltr",
                format: "",
                indent: 0,
                type: "paragraph",
                version: 1,
              },
            ],
            direction: "ltr",
            format: "",
            indent: 0,
            type: "root",
            version: 1,
          },
        };
        setEditorState(newState as unknown as SerializedEditorState);
      }
      
      setLastInitialContent(initialContent);
    }
    
    if (!isInitialized) {
      setIsInitialized(true);
    }
  }, [initialContent, lastInitialContent, isInitialized]);

  const handleEditorChange = (serializedState: SerializedEditorState) => {
    console.log('Editor state changed:', serializedState);
    setEditorState(serializedState);
    
    // Convert the serialized state to HTML
    const extractTextFromState = (state: any): string => {
      if (!state || !state.root || !state.root.children) {
        return "";
      }

      const extractTextFromChildren = (children: any[]): string => {
        return children
          .map((child) => {
            if (child.type === "text") {
              return child.text || "";
            } else if (child.type === "image") {
              // Handle image nodes properly
              return `<img src="${child.src}" alt="${child.altText || ''}" />`;
            } else if (child.children) {
              const text = extractTextFromChildren(child.children);
              switch (child.type) {
                case "paragraph":
                  return text ? `<p>${text}</p>` : "";
                case "heading":
                  const level = child.tag || "h1";
                  return text ? `<${level}>${text}</${level}>` : "";
                case "list":
                  const listTag = child.listType === "number" ? "ol" : "ul";
                  return text ? `<${listTag}>${text}</${listTag}>` : "";
                case "listitem":
                  return text ? `<li>${text}</li>` : "";
                case "quote":
                  return text ? `<blockquote>${text}</blockquote>` : "";
                case "code":
                  return text ? `<pre><code>${text}</code></pre>` : "";
                default:
                  return text;
              }
            }
            return "";
          })
          .join("");
      };

      const htmlContent = extractTextFromChildren(state.root.children);
      console.log('Extracted HTML content:', htmlContent);
      return htmlContent;
    };

    const newHtmlContent = extractTextFromState(serializedState);
    onChange(newHtmlContent);
  };

  if (!isInitialized) {
    return (
      <div className="h-full w-full border rounded-md p-4 flex items-center justify-center bg-gray-50">
        <div className="text-gray-500">Loading editor...</div>
      </div>
    );
  }

  return (
    <div className="h-full w-full blog-editor-container">
      <Editor
        editorSerializedState={editorState}
        onSerializedChange={handleEditorChange}
      />
    </div>
  );
}
