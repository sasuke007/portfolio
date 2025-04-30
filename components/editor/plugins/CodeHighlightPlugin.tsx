"use client";

import React, { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { $getNodeByKey } from "lexical";

export function CodeHighlightPlugin(): React.ReactNode {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    const removeListener = editor.registerMutationListener(
      CodeHighlightNode,
      (mutations) => {
        // Handle mutations if needed for any custom behavior
      }
    );

    return () => {
      removeListener();
    };
  }, [editor]);

  useEffect(() => {
    const removeListener = editor.registerMutationListener(
      CodeNode,
      (mutations) => {
        // Handle mutations if needed for highlighting
      }
    );
    
    return () => {
      removeListener();
    };
  }, [editor]);

  return null;
} 