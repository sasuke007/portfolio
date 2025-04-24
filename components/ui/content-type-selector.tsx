"use client"

import { useRouter } from "next/navigation"
import { 
  FileText, 
  BookOpen, 
  Image as ImageIcon, 
  Video, 
  ChevronDown 
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

// Define content types
export const contentTypes = [
  {
    id: "blog",
    name: "Blog Post",
    path: "create-blog",
    icon: FileText,
    description: "Write an article or blog post"
  },
  {
    id: "poem",
    name: "Poem",
    path: "create-poem",
    icon: BookOpen,
    description: "Create a new poem"
  },
  {
    id: "photo",
    name: "Photo",
    path: "create-photo",
    icon: ImageIcon,
    description: "Upload and manage photos"
  },
  {
    id: "vlog",
    name: "Vlog",
    path: "create-vlog",
    icon: Video,
    description: "Upload or embed a video"
  }
]

interface ContentTypeSelectorProps {
  variant?: "default" | "outline" | "secondary"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
}

export function ContentTypeSelector({ 
  variant = "outline", 
  size = "sm",
  className = ""
}: ContentTypeSelectorProps) {
  const router = useRouter()

  const handleContentTypeSelect = (path: string) => {
    router.push(`/admin/${path}`)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant={variant} 
          size={size} 
          className={`flex items-center gap-1 ${className}`}
        >
          Create Content
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {contentTypes.map((type) => (
          <DropdownMenuItem 
            key={type.id}
            onClick={() => handleContentTypeSelect(type.path)}
            className="flex items-center cursor-pointer py-2"
          >
            <div className="flex items-center gap-2">
              <type.icon className="h-4 w-4 text-muted-foreground" />
              <div className="flex flex-col">
                <span>{type.name}</span>
                <span className="text-xs text-muted-foreground">{type.description}</span>
              </div>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 