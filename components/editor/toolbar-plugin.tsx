"use client";

import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import {useCallback, useState, useRef, useEffect} from "react";
import {
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  UNDO_COMMAND,
  REDO_COMMAND,
  ElementFormatType,
  $createParagraphNode,
} from "lexical";
import {$createHeadingNode} from "@lexical/rich-text";
import {$isHeadingNode} from "@lexical/rich-text";
import {$createQuoteNode} from "@lexical/rich-text";
import {$setBlocksType} from "@lexical/selection";
import {INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND} from '@lexical/list';
import {$createLinkNode} from '@lexical/link';
import {Button} from "@/components/ui/button";
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Link,
  Image as ImageIcon,
  X,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {ChevronDown} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {INSERT_IMAGE_COMMAND} from "./plugins/ImagesPlugin";
import {cn} from "@/lib/utils";
import {UploadButton} from "@/utils/uploadthing";

export default function ToolbarPlugin() {
  const blogImageUrl = useRef<HTMLInputElement>(null);
  const [editor] = useLexicalComposerContext();
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageAlt, setImageAlt] = useState('');
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [urlImagePreview, setUrlImagePreview] = useState('');
  const [isValidUrl, setIsValidUrl] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [blockType, setBlockType] = useState<"paragraph" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6">("paragraph");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const handleHeadingChange = useCallback(
    (value: "paragraph" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6") => {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          if (value === "paragraph") {
            $setBlocksType(selection, () => $createParagraphNode());
          } else {
            $setBlocksType(selection, () => $createHeadingNode(value));
          }
        }
      });
      setBlockType(value);
    },
    [editor]
  );

  useEffect(() => {
    return editor.registerUpdateListener(({editorState}) => {
      editorState.read(() => {
        const selection = $getSelection();
        if (!$isRangeSelection(selection)) return;
        const anchorNode = selection.anchor.getNode();
        const element = anchorNode.getTopLevelElementOrThrow();
        const type = element.getType();
        if (type === "paragraph") {
          setBlockType("paragraph");
          return;
        }
        if ($isHeadingNode(element)) {
          // getTag returns 'h1' | 'h2' | ...
          // @ts-ignore - lexical typing for getTag is fine at runtime
          const tag = element.getTag();
          setBlockType(tag);
          return;
        }
        // For other blocks, keep current selection value as-is
      });
    });
  }, [editor]);

  const formatQuote = useCallback(() => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createQuoteNode());
      }
    });
  }, [editor]);
  
  const insertImage = () => {
    setIsImageDialogOpen(true);
  };

  const handleInsertImage = () => {
    const imageSource = uploadedImageUrl || imageUrl;
    if (!imageSource.trim()) return;
    
    editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
      src: imageSource,
      altText: imageAlt || "Image"
    });
    
    resetDialog();
    setIsImageDialogOpen(false);
  };

  const resetDialog = () => {
    setImageUrl('');
    setImageAlt('');
    setUploadedImageUrl('');
    setIsUploading(false);
    setUrlImagePreview('');
    setIsValidUrl(false);
  };

  // Function to validate and preview URL images
  const handleUrlChange = (url: string) => {
    setImageUrl(url);
    
    // Clear uploaded image when user starts typing URL
    if (url.trim() && uploadedImageUrl) {
      setUploadedImageUrl('');
    }
    
    if (!url.trim()) {
      setUrlImagePreview('');
      setIsValidUrl(false);
      return;
    }

    // Basic URL validation for images
    const imageUrlPattern = /\.(jpg|jpeg|png|gif|bmp|webp|svg)(\?.*)?$/i;
    const isImageUrl = imageUrlPattern.test(url) || url.includes('data:image/');
    
    if (isImageUrl) {
      setUrlImagePreview(url);
      setIsValidUrl(true);
    } else {
      // Try to load the URL anyway in case it's a valid image without extension
      const img = new Image();
      img.onload = () => {
        setUrlImagePreview(url);
        setIsValidUrl(true);
      };
      img.onerror = () => {
        setUrlImagePreview('');
        setIsValidUrl(false);
      };
      img.src = url;
    }
  };
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // In a real app, you would upload this file to a server/CDN
    // For now, we'll create an object URL for demo purposes
    const objectUrl = URL.createObjectURL(file);
    editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
      src: objectUrl,
      altText: file.name
    });
    setIsImageDialogOpen(false);
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };


  return (
    <div className="toolbar flex flex-wrap gap-1 p-2 border-b relative">
      <Button
        variant="ghost"
        size="icon"
        type="button"
        onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
        title="Undo"
      >
        <Undo className="h-4 w-4"/>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        type="button"
        onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
        title="Redo"
      >
        <Redo className="h-4 w-4"/>
      </Button>
      <div className="border-r mx-1 h-6"/>
      <Button
        variant="ghost"
        size="icon"
        type="button"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}
        title="Bold"
      >
        <Bold className="h-4 w-4"/>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        type="button"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}
        title="Italic"
      >
        <Italic className="h-4 w-4"/>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        type="button"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")}
        title="Underline"
      >
        <Underline className="h-4 w-4"/>
      </Button>
      <div className="border-r mx-1 h-6"/>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="h-8 px-3 w-auto min-w-[120px] justify-between"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span className="text-sm">
              {blockType === "paragraph" ? "Paragraph" :
                blockType === "h1" ? "Heading 1" :
                  blockType === "h2" ? "Heading 2" :
                    blockType === "h3" ? "Heading 3" :
                      blockType === "h4" ? "Heading 4" :
                        blockType === "h5" ? "Heading 5" :
                          blockType === "h6" ? "Heading 6" : "Paragraph"}
            </span>
            <ChevronDown className="h-4 w-4 ml-2"/>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className="w-48 z-50"
          sideOffset={4}
        >
          <DropdownMenuLabel>Text Style</DropdownMenuLabel>
          <DropdownMenuSeparator/>
          <DropdownMenuItem
            onClick={() => {
              handleHeadingChange("paragraph");
              setIsDropdownOpen(false);
            }}
            className="cursor-pointer"
          >
            <span className="text-sm">Paragraph</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              handleHeadingChange("h1");
              setIsDropdownOpen(false);
            }}
            className="cursor-pointer"
          >
            <span className="text-lg font-bold">Heading 1</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              handleHeadingChange("h2");
              setIsDropdownOpen(false);
            }}
            className="cursor-pointer"
          >
            <span className="text-base font-semibold">Heading 2</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              handleHeadingChange("h3");
              setIsDropdownOpen(false);
            }}
            className="cursor-pointer"
          >
            <span className="text-sm font-semibold">Heading 3</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              handleHeadingChange("h4");
              setIsDropdownOpen(false);
            }}
            className="cursor-pointer"
          >
            <span className="text-sm font-medium">Heading 4</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              handleHeadingChange("h5");
              setIsDropdownOpen(false);
            }}
            className="cursor-pointer"
          >
            <span className="text-xs font-medium">Heading 5</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              handleHeadingChange("h6");
              setIsDropdownOpen(false);
            }}
            className="cursor-pointer"
          >
            <span className="text-xs font-normal">Heading 6</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="border-r mx-1 h-6"/>
      <Button
        variant="ghost"
        size="icon"
        type="button"
        onClick={() => editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)}
        title="Bullet List"
      >
        <List className="h-4 w-4"/>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        type="button"
        onClick={() => editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)}
        title="Numbered List"
      >
        <ListOrdered className="h-4 w-4"/>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        type="button"
        onClick={formatQuote}
        title="Quote"
      >
        <Quote className="h-4 w-4"/>
      </Button>
      <div className="border-r mx-1 h-6"/>
      <Button
        variant="ghost"
        size="icon"
        type="button"
        onClick={insertImage}
        title="Insert Image"
      >
        <ImageIcon className="h-4 w-4"/>
      </Button>

      {/* Image Insert Dialog */}
      <Dialog open={isImageDialogOpen} onOpenChange={(open) => {
        setIsImageDialogOpen(open);
        if (!open) resetDialog();
      }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Insert Image</DialogTitle>
            <DialogDescription>
              Choose how you'd like to add an image to your content.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* URL Option */}
            <div className="space-y-2">
              <Button
                variant="outline"
                className={cn(
                  "w-full h-16 text-left justify-start hover:bg-muted/50",
                  uploadedImageUrl && "opacity-50 cursor-not-allowed"
                )}
                onClick={() => !uploadedImageUrl && document.getElementById('image-url-input')?.focus()}
                disabled={!!uploadedImageUrl}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                    <Link className="h-5 w-5 text-white"/>
                  </div>
                  <div>
                    <div className="font-medium">URL</div>
                    <div className="text-sm text-muted-foreground">
                      {uploadedImageUrl ? "Disabled (file uploaded)" : "Insert image from URL"}
                    </div>
                  </div>
                </div>
              </Button>

              <div className="space-y-2 pl-2">
                <Input
                  ref={blogImageUrl}
                  id="image-url-input"
                  placeholder={uploadedImageUrl ? "URL input disabled (file uploaded)" : "Enter image URL..."}
                  value={imageUrl}
                  onChange={(e) => handleUrlChange(e.target.value)}
                  className="text-sm"
                  disabled={!!uploadedImageUrl}
                />

                {/* URL Image Preview */}
                {urlImagePreview && isValidUrl && (
                  <div className="space-y-3 p-3 border rounded-lg bg-muted/20">
                    <div className="text-sm font-medium">Preview:</div>
                    <div className="relative">
                      <img 
                        src={urlImagePreview} 
                        alt="URL preview" 
                        className="w-full max-h-48 object-cover rounded-lg border"
                        onError={() => {
                          setUrlImagePreview('');
                          setIsValidUrl(false);
                        }}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Input
                        placeholder="Alt text (optional)"
                        value={imageAlt}
                        onChange={(e) => setImageAlt(e.target.value)}
                        className="text-sm"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* File Upload Option */}
            <div className="space-y-3">
              <div className={cn(
                "text-sm font-medium",
                urlImagePreview ? "text-muted-foreground/50" : "text-muted-foreground"
              )}>
                {urlImagePreview ? "Upload from Device (Disabled - URL entered)" : "Upload from Device"}
              </div>
              
              {!urlImagePreview ? (
                <UploadButton 
                  className={cn(
                    // Button styling to match your theme
                    "ut-button:w-full ut-button:h-12 ut-button:bg-primary ut-button:hover:bg-primary/90 " +
                    "ut-button:text-primary-foreground ut-button:border ut-button:border-input " +
                    "ut-button:rounded-md ut-button:px-4 ut-button:py-2 ut-button:text-sm " +
                    "ut-button:font-medium ut-button:transition-colors ut-button:duration-200 " +
                    "ut-button:focus-visible:outline-none ut-button:focus-visible:ring-2 " +
                    "ut-button:focus-visible:ring-ring ut-button:focus-visible:ring-offset-2 " +
                    "ut-button:disabled:pointer-events-none ut-button:disabled:opacity-50 " +
                    // Content styling
                    "ut-allowed-content:text-xs ut-allowed-content:text-muted-foreground " +
                    "ut-allowed-content:mt-1"
                  )}
                  endpoint="imageUploader"
                  onUploadBegin={() => {
                    setIsUploading(true);
                  }}
                  onClientUploadComplete={(res) => {
                    console.log("Files: ", res);
                    const uploadedUrl = res[0].url;
                    
                    // Clear URL preview when file is uploaded
                    setUrlImagePreview('');
                    setIsValidUrl(false);
                    
                    setUploadedImageUrl(uploadedUrl);
                    setImageUrl(uploadedUrl); // Set the URL input field
                    setIsUploading(false);
                    if (blogImageUrl.current) {
                      blogImageUrl.current.value = uploadedUrl;
                    }
                  }}
                  onUploadError={(error) => {
                    console.error("Upload error:", error);
                    setIsUploading(false);
                  }}
                />
              ) : (
                <div className="p-4 border-2 border-dashed border-muted-foreground/30 rounded-lg bg-muted/10 text-center">
                  <div className="text-sm text-muted-foreground">
                    Upload disabled - URL image is active
                  </div>
                </div>
              )}

              {/* Image Preview */}
              {uploadedImageUrl && (
                <div className="space-y-3 p-3 border rounded-lg bg-muted/20">
                  <div className="text-sm font-medium">Preview:</div>
                  <div className="relative">
                    <img 
                      src={uploadedImageUrl} 
                      alt="Uploaded preview" 
                      className="w-full max-h-48 object-cover rounded-lg border"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Input
                      placeholder="Alt text (optional)"
                      value={imageAlt}
                      onChange={(e) => setImageAlt(e.target.value)}
                      className="text-sm"
                    />
                    <Button 
                      onClick={() => setUploadedImageUrl('')}
                      variant="outline"
                      size="sm"
                      className="w-full"
                    >
                      Remove Image
                    </Button>
                  </div>
                </div>
              )}

              {isUploading && (
                <div className="flex items-center justify-center p-4 border rounded-lg bg-muted/20">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-sm text-muted-foreground">Uploading...</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button 
              onClick={handleInsertImage}
              disabled={!uploadedImageUrl && !urlImagePreview}
            >
              Insert Image
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}