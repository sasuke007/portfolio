"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { BlogEditor } from "@/components/blog-editor";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ImagePlus,
  Tag,
  FileText,
  Search,
  Calendar,
  Save,
  ArrowLeft,
  Upload,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarUI } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useBlogForm } from "@/lib/hooks/useBlogForm";

// Define the params type to satisfy TypeScript
type EditBlogParams = {
  slug: string;
};

export default function EditBlogPage({ params }: { params: EditBlogParams | Promise<EditBlogParams> }) {
  const router = useRouter();
  const resolvedParams = React.use(params as Promise<EditBlogParams>);
  const { slug } = resolvedParams;
  const [isLoading, setIsLoading] = useState(true);
  const [blogData, setBlogData] = useState<any>(null);
  const [initialContent, setInitialContent] = useState("");
  console.log(`slug ${slug}`);
  // Fetch the blog post data
  useEffect(() => {
    const fetchBlog = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/admin/blog/${slug}`);
        if (!response.ok) {
          throw new Error("Failed to fetch blog post");
        }
        
        const data = await response.json();
        
        // Handle tags (transform from tag objects to tag IDs)
        const transformedData = {
          ...data,
          tags: data.tags?.map((tagRel: any) => tagRel.tag.id) || []
        };
        
        setBlogData(transformedData);
        if (data.content) {
          setInitialContent(data.content);
        }
      } catch (error) {
        console.error("Error fetching blog post:", error);
        toast.error("Failed to load blog post. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    
    if (slug) {
      fetchBlog();
    }
  }, [slug, router]);
  
  const formHook = useBlogForm({
    // Initialize with blog data once it's loaded
    initialValues: blogData || {},
    // Set initial content
    initialContent,
    onSubmit: async (formData, content) => {
      try {
        // Prepare data for submission
        const dataToSubmit = {
          ...formData,
          // If in draft mode, set published_at to null
          published_at: formData.is_published ? formData.published_at : null
        };
        
        const response = await fetch(`/api/blogs/${slug}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSubmit),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || "Failed to update blog post");
        }

        toast.success("Blog post updated successfully!");
        router.push("/admin");
      } catch (error) {
        console.error("Error updating blog post:", error);
        toast.error("Failed to update blog post. Please try again.");
      }
    }
  });
  
  // Destructure all the values from our form hook
  const {
    formData,
    content,
    setContent,
    formErrors,
    isSubmitting,
    activeTab,
    setActiveTab,
    imagePreview,
    imageUrl,
    datePickerOpen,
    setDatePickerOpen,
    handleInputChange,
    handleSwitchChange,
    handleTagsChange,
    handleSlugGenerate,
    handleMetaGenerate,
    handleImageUrlChange,
    handleImagePreviewError,
    handleDateChange,
    handleContentChange,
    handleSubmit,
    hasError
  } = formHook;

  return (
    <div className="space-y-4 py-4 lg:py-8">
      <div className="flex items-center justify-between p-2">
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => router.push("/admin/blogs")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blogs
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="container p-0" noValidate>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="content">
              <FileText className="mr-2 h-4 w-4" />
              Content
            </TabsTrigger>
            <TabsTrigger value="media">
              <ImagePlus className="mr-2 h-4 w-4" />
              Media & Tags
            </TabsTrigger>
            <TabsTrigger value="seo">
              <Search className="mr-2 h-4 w-4" />
              SEO
            </TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Blog Content</CardTitle>
                <CardDescription>The core content of your blog post.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="space-y-2">
                  <div className="space-y-2">
                    <Label
                      htmlFor="title"
                      className={cn(hasError("title") && "text-red-500")}
                    >
                      Title
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="title"
                      name="title"
                      placeholder="My Awesome Blog Post"
                      value={formData.title}
                      onChange={handleInputChange}
                      className={cn(
                        hasError("title") && "border-red-500 focus-visible:ring-red-500"
                      )}
                    />
                    {hasError("title") && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.title}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label 
                        htmlFor="slug"
                        className={cn(hasError("slug") && "text-red-500")}
                      >
                        URL Slug
                        <span className="text-red-500">*</span>
                      </Label>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={handleSlugGenerate}
                      >
                        Generate from title
                      </Button>
                    </div>
                    <Input
                      id="slug"
                      name="slug"
                      placeholder="my-awesome-blog-post"
                      value={formData.slug}
                      onChange={handleInputChange}
                      className={cn(
                        hasError("slug") && "border-red-500 focus-visible:ring-red-500"
                      )}
                    />
                    {hasError("slug") && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.slug}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label 
                      htmlFor="description"
                      className={cn(hasError("description") && "text-red-500")}
                    >
                      Description
                      <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="A brief description of your blog post..."
                      value={formData.description}
                      onChange={handleInputChange}
                      className={cn(
                        hasError("description") && "border-red-500 focus-visible:ring-red-500"
                      )}
                    />
                    {hasError("description") && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.description}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label 
                      htmlFor="content"
                      className={cn(hasError("content") && "text-red-500")}
                    >
                      Content
                      <span className="text-red-500">*</span>
                    </Label>
                    <BlogEditor
                      content={content}
                      onChange={handleContentChange}
                      placeholder="Start writing your blog post..."
                    />
                    {hasError("content") && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.content}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="media" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Media & Tags</CardTitle>
                <CardDescription>
                  Upload media and assign tags to your blog post
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="grid lg:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="space-y-2">
                      <Label 
                        htmlFor="category"
                        className={cn(hasError("category") && "text-red-500")}
                      >
                        Category
                        <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="category"
                        name="category"
                        placeholder="E.g., Technology, Health, Finance"
                        value={formData.category}
                        onChange={handleInputChange}
                        className={cn(
                          hasError("category") && "border-red-500 focus-visible:ring-red-500"
                        )}
                      />
                      {hasError("category") && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.category}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tags">
                        <div className="flex items-center gap-2">
                          <Tag className="h-4 w-4" />
                          Tags (comma separated)
                        </div>
                      </Label>
                      <Input
                        id="tags"
                        placeholder="web, development, coding"
                        value={formData.tags.join(", ")}
                        onChange={handleTagsChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label 
                        htmlFor="author"
                        className={cn(hasError("author") && "text-red-500")}
                      >
                        Author Name
                      </Label>
                      <Input
                        id="author"
                        name="author"
                        placeholder="Your Name"
                        value={formData.author}
                        onChange={handleInputChange}
                        className={cn(
                          hasError("author") && "border-red-500 focus-visible:ring-red-500"
                        )}
                      />
                      {hasError("author") && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.author}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="priority">Priority (0-10)</Label>
                      <Input
                        id="priority"
                        name="priority"
                        type="number"
                        min={0}
                        max={10}
                        value={formData.priority}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="flex flex-col gap-2 mt-4">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="is_published"
                          checked={formData.is_published}
                          onCheckedChange={handleSwitchChange}
                        />
                        <Label htmlFor="is_published">Published</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {formData.is_published
                          ? "This blog post will be visible to the public"
                          : "This blog post will be saved as a draft"}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <Label htmlFor="published_at">Publish Date</Label>
                      </div>
                      <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !formData.published_at && "text-muted-foreground"
                            )}
                            disabled={!formData.is_published}
                          >
                            {formData.published_at ? (
                              format(new Date(formData.published_at), "PPP")
                            ) : (
                              "Pick a date"
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <CalendarUI
                            mode="single"
                            selected={
                              formData.published_at ? new Date(formData.published_at) : undefined
                            }
                            onSelect={handleDateChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label 
                        htmlFor="image-url"
                        className={cn(hasError("featured_image_url") && "text-red-500")}
                      >
                        Image URL
                      </Label>
                      <Input
                        id="image-url"
                        placeholder="https://example.com/image.jpg"
                        value={imageUrl}
                        onChange={handleImageUrlChange}
                        className={cn(
                          hasError("featured_image_url") && "border-red-500 focus-visible:ring-red-500"
                        )}
                      />
                      {hasError("featured_image_url") && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.featured_image_url}</p>
                      )}
                    </div>

                    {imagePreview && (
                      <div className="relative aspect-video rounded-md overflow-hidden border">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="object-cover w-full h-full"
                          onError={handleImagePreviewError}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="seo" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>SEO Settings</CardTitle>
                <CardDescription>
                  Optimize your blog post for search engines
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="flex justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleMetaGenerate}
                  >
                    Generate from content
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label 
                    htmlFor="meta_title"
                    className={cn(hasError("meta_title") && "text-red-500")}
                  >
                    Meta Title
                  </Label>
                  <Input
                    id="meta_title"
                    name="meta_title"
                    placeholder="SEO Title (Default: Post Title)"
                    value={formData.meta_title}
                    onChange={handleInputChange}
                    className={cn(
                      hasError("meta_title") && "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  {hasError("meta_title") && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.meta_title}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label 
                    htmlFor="meta_description"
                    className={cn(hasError("meta_description") && "text-red-500")}
                  >
                    Meta Description
                  </Label>
                  <Textarea
                    id="meta_description"
                    name="meta_description"
                    placeholder="SEO Description (Default: Post Description)"
                    value={formData.meta_description}
                    onChange={handleInputChange}
                    className={cn(
                      hasError("meta_description") && "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  {hasError("meta_description") && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.meta_description}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label 
                    htmlFor="meta_keywords"
                    className={cn(hasError("meta_keywords") && "text-red-500")}
                  >
                    Meta Keywords
                  </Label>
                  <Input
                    id="meta_keywords"
                    name="meta_keywords"
                    placeholder="SEO Keywords (comma separated)"
                    value={formData.meta_keywords}
                    onChange={handleInputChange}
                    className={cn(
                      hasError("meta_keywords") && "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  {hasError("meta_keywords") && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.meta_keywords}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-4 flex justify-end">
          <Button disabled={isSubmitting} type="submit">
            {isSubmitting && (
              <Upload className="mr-2 h-4 w-4 animate-spin" />
            )}
            {isSubmitting ? "Updating..." : "Update Blog Post"}
          </Button>
        </div>
      </form>
    </div>
  );
} 