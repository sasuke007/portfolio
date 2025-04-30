"use client";

import React, { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $insertNodeToNearestRoot } from "@lexical/utils";
import { 
  COMMAND_PRIORITY_EDITOR, 
  createCommand, 
  LexicalCommand, 
  $getSelection, 
  $isRangeSelection,
  NodeKey,
  SerializedLexicalNode,
  Spread,
  EditorConfig,
  LexicalEditor,
  DecoratorNode
} from "lexical";

// Type definitions for ImageNode
export type SerializedImageNode = Spread<{
  src: string;
  altText: string;
}, SerializedLexicalNode> & {
  type: 'image';
  version: 1;
};

// Create an ImageNode for handling images in the editor
export class ImageNode extends DecoratorNode<React.ReactElement> {
  __src: string;
  __altText: string;

  static getType(): string {
    return 'image';
  }

  static clone(node: ImageNode): ImageNode {
    return new ImageNode(node.__src, node.__altText, node.__key);
  }

  constructor(src: string, altText: string, key?: NodeKey) {
    super(key);
    this.__src = src;
    this.__altText = altText;
  }

  getSrc(): string {
    return this.__src;
  }

  getAltText(): string {
    return this.__altText;
  }

  createDOM(config: EditorConfig): HTMLElement {
    const span = document.createElement('span');
    span.className = 'editor-image-wrapper';
    return span;
  }

  updateDOM(): boolean {
    return false;
  }

  static importJSON(serializedNode: SerializedImageNode): ImageNode {
    const { src, altText } = serializedNode;
    const node = $createImageNode(src, altText);
    return node;
  }

  exportJSON(): SerializedImageNode {
    return {
      ...super.exportJSON(),
      src: this.__src,
      altText: this.__altText,
      type: 'image',
      version: 1,
    };
  }

  decorate(): React.ReactElement {
    return (
      <img 
        src={this.__src} 
        alt={this.__altText} 
        className="editor-image"
      />
    );
  }
}

export function $createImageNode(src: string, altText: string): ImageNode {
  return new ImageNode(src, altText);
}

export function $isImageNode(node: any): node is ImageNode {
  return node instanceof ImageNode;
}

// Define a command for image insertion
export const INSERT_IMAGE_COMMAND: LexicalCommand<{
  src: string;
  altText: string;
}> = createCommand('INSERT_IMAGE_COMMAND');

export function ImagesPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    // Register the custom node
    if (!editor.hasNodes([ImageNode])) {
      throw new Error('ImagesPlugin: ImageNode not registered on editor');
    }
    
    console.log(`ImagesPlugin: ImageNode registered on editor`);
    // Register the command
    return editor.registerCommand(
      INSERT_IMAGE_COMMAND,
      (payload) => {
        console.log(`ImagesPlugin: Inside INSERT_IMAGE_COMMAND`);
        editor.update(() => {
          debugger
          console.log(`ImagesPlugin: updating editor`);
          const selection = $getSelection();
          const imageNode = $createImageNode(payload.src, payload.altText);
          
          if ($isRangeSelection(selection)) {
            selection.insertNodes([imageNode]);
          } else {
            $insertNodeToNearestRoot(imageNode);
          }
        });
        return true;
      },
      COMMAND_PRIORITY_EDITOR
    );
  }, [editor]);
} 