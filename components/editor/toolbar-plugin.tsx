"use client";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useCallback, useState, useRef } from "react";
import {
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  UNDO_COMMAND,
  REDO_COMMAND,
  ElementFormatType,
  $createParagraphNode,
} from "lexical";
import { $createHeadingNode } from "@lexical/rich-text";
import { $createQuoteNode } from "@lexical/rich-text";
import { $setBlocksType } from "@lexical/selection";
import { INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND } from '@lexical/list';
import { $createLinkNode } from '@lexical/link';
import { Button } from "@/components/ui/button";
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Quote,
  Heading1,
  Heading2,
  Heading3,
  Undo,
  Redo,
  Link,
  Image as ImageIcon,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { INSERT_IMAGE_COMMAND } from "./plugins/ImagesPlugin";

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageAlt, setImageAlt] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const formatHeading = useCallback(
    (headingSize: "h1" | "h2" | "h3") => {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $setBlocksType(selection, () => $createHeadingNode(headingSize));
        }
      });
    },
    [editor]
  );

  const formatQuote = useCallback(() => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createQuoteNode());
      }
    });
  }, [editor]);
  
  const insertLink = useCallback(() => {
    if (!linkUrl) return;
    
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        const linkNode = $createLinkNode(linkUrl);
        selection.insertNodes([linkNode]);
      }
    });
    setLinkUrl('');
    setIsLinkDialogOpen(false);
  }, [editor, linkUrl]);
  
  const insertImage = () => {
    if (!imageUrl) return;
    editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
      src: imageUrl,
      altText: imageAlt
    });
    setImageUrl('');
    setImageAlt('');
    setIsImageDialogOpen(false);
  };
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // In a real app, you would upload this file to a server/CDN
    // For now, we'll create an object URL for demo purposes
    const objectUrl = URL.createObjectURL(file);
    setImageUrl(objectUrl);
    setImageAlt(file.name);
  };

  return (
    <div className="toolbar flex flex-wrap gap-1 p-2 border-b">
      <Button
        variant="ghost"
        size="icon"
        type="button"
        onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
        title="Undo"
      >
        <Undo className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        type="button"
        onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
        title="Redo"
      >
        <Redo className="h-4 w-4" />
      </Button>
      <div className="border-r mx-1 h-6" />
      <Button
        variant="ghost"
        size="icon"
        type="button"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}
        title="Bold"
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        type="button"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}
        title="Italic"
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        type="button"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")}
        title="Underline"
      >
        <Underline className="h-4 w-4" />
      </Button>
      <div className="border-r mx-1 h-6" />
      <Button
        variant="ghost"
        size="icon"
        type="button"
        onClick={() => formatHeading("h1")}
        title="Heading 1"
      >
        <Heading1 className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        type="button"
        onClick={() => formatHeading("h2")}
        title="Heading 2"
      >
        <Heading2 className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        type="button"
        onClick={() => formatHeading("h3")}
        title="Heading 3"
      >
        <Heading3 className="h-4 w-4" />
      </Button>
      <div className="border-r mx-1 h-6" />
      <Button
        variant="ghost"
        size="icon"
        type="button"
        onClick={() => editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)}
        title="Bullet List"
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        type="button"
        onClick={() => editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)}
        title="Numbered List"
      >
        <ListOrdered className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        type="button"
        onClick={formatQuote}
        title="Quote"
      >
        <Quote className="h-4 w-4" />
      </Button>
      <div className="border-r mx-1 h-6" />
      {/* <Dialog open={isLinkDialogOpen} onOpenChange={setIsLinkDialogOpen}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            title="Insert Link"
          >
            <Link className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Insert Link</DialogTitle>
            <DialogDescription>
              Enter the URL of the link you want to insert.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="url" className="text-right">
              URL
            </Label>
            <Input 
              id="url" 
              value={linkUrl} 
              onChange={(e) => setLinkUrl(e.target.value)} 
              placeholder="https://example.com"
              className="mt-1"
            />
          </div>
          <div className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="button" onClick={insertLink} disabled={!linkUrl}>
              Insert
            </Button>
          </div>
        </DialogContent>
      </Dialog> */}
      
      {/* <Dialog open={isImageDialogOpen} onOpenChange={setIsImageDialogOpen}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            title="Insert Image"
          >
            <ImageIcon className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Insert Image</DialogTitle>
            <DialogDescription>
              Upload an image or enter an image URL.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="image-url">Image URL</Label>
              <Input 
                id="image-url" 
                value={imageUrl} 
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="image-alt">Alternative Text</Label>
              <Input 
                id="image-alt" 
                value={imageAlt} 
                onChange={(e) => setImageAlt(e.target.value)} 
                placeholder="Image description for accessibility"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Or upload an image</Label>
              <div 
                className="border-2 border-dashed rounded p-4 text-center cursor-pointer hover:border-primary transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <p className="text-sm text-muted-foreground mb-2">Click to browse or drag and drop</p>
                <Input 
                  ref={fileInputRef}
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleFileUpload}
                />
                {imageUrl && !imageUrl.startsWith('http') && (
                  <div className="mt-2">
                    <img 
                      src={imageUrl} 
                      alt={imageAlt} 
                      className="max-h-32 mx-auto object-contain" 
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button 
              type="button" 
              onClick={insertImage}
              disabled={!imageUrl}
              className="bg-glow-purple hover:bg-glow-purple/90"
            >
              Insert Image
            </Button>
          </div>
        </DialogContent>
      </Dialog> */}
    </div>
  );
}