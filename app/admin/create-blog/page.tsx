"use client";

import { useState, useRef } from "react";
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
} from "lucide-react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function CreateBlogPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("content");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [previewMode, setPreviewMode] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    meta_description: "",
    meta_keywords: "",
    meta_title: "",
    author: "Rohit Pandit", // Default author
    category: "",
    featured_image_url: "",
    is_published: false,
    priority: 0,
    tags: [] as string[],
    published_at: new Date().toISOString().split("T")[0],
  });
  const [content, setContent] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, is_published: checked }));
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tagsArray = e.target.value.split(",").map((tag) => tag.trim());
    setFormData((prev) => ({ ...prev, tags: tagsArray }));
  };

  const handleSlugGenerate = () => {
    if (!formData.title) {
      toast.error("Please enter a title first");
      return;
    }

    const slug = formData.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "") // Remove special chars
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/-+/g, "-") // Remove consecutive hyphens
      .trim();

    setFormData((prev) => ({ ...prev, slug }));
    toast.success("Slug generated from title");
  };

  const handleMetaGenerate = () => {
    if (!formData.description) {
      toast.error("Please enter a description first");
      return;
    }

    // Use description for meta description (truncated if needed)
    const metaDescription =
      formData.description.length > 160
        ? formData.description.substring(0, 157) + "..."
        : formData.description;

    // Use title for meta title if empty
    const metaTitle = formData.meta_title || formData.title;

    setFormData((prev) => ({
      ...prev,
      meta_description: metaDescription,
      meta_title: metaTitle,
    }));

    toast.success("Meta data generated from content");
  };

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setImageUrl(url);
    setFormData((prev) => ({ ...prev, featured_image_url: url }));
    console.log(`handleImageUrlChange: url: ${url}`);
    // Only show preview if the URL isn't empty
    if (url) {
      setImagePreview(url);
    } else {
      setImagePreview(null);
    }
  };

  const handleImagePreviewError = () => {
    toast.error("Invalid image URL. Please check the URL and try again.");
    // You could set a placeholder image here if desired
    // setImagePreview("https://placehold.co/600x400?text=Invalid+Image+URL");
  };

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      const dateString = date.toISOString().split("T")[0];
      setFormData((prev) => ({ ...prev, published_at: dateString }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate the image URL if provided
      if (
        formData.featured_image_url &&
        !formData.featured_image_url.match(
          /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i
        )
      ) {
        toast.warning(
          "Image URL format may be invalid. Please check and try again."
        );
      }

      const blogData = {
        ...formData,
        content,
        published_at: formData.is_published ? formData.published_at : null, // Only set published date if publishing
      };

      const response = await fetch("/api/admin/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blogData),
      });

      if (!response.ok) {
        throw new Error("Failed to create blog post");
      }

      const action = formData.is_published ? "published" : "saved as draft";
      toast.success(`Blog post ${action} successfully!`);
      router.push("/admin");
    } catch (error) {
      console.error("Error creating blog post:", error);
      toast.error("Failed to create blog post. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="h-8 w-8"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Create New Blog Post</h1>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Label
              htmlFor="is_published"
              className={formData.is_published ? "text-green-500" : ""}
            >
              {formData.is_published ? "Publish" : "Draft"}
            </Label>
            <Switch
              id="is_published"
              checked={formData.is_published}
              onCheckedChange={handleSwitchChange}
            />
          </div>

          <Button
            type="submit"
            form="blog-form"
            disabled={isSubmitting}
            className="bg-glow-purple hover:bg-glow-purple/90"
          >
            {isSubmitting ? (
              <>Saving...</>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                {formData.is_published ? "Publish" : "Save Draft"}
              </>
            )}
          </Button>
        </div>
      </div>

      <Tabs
        defaultValue="content"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="content" className="flex items-center">
            <FileText className="mr-2 h-4 w-4" />
            Content
          </TabsTrigger>
          <TabsTrigger value="media" className="flex items-center">
            <ImagePlus className="mr-2 h-4 w-4" />
            Media & Tags
          </TabsTrigger>
          <TabsTrigger value="seo" className="flex items-center">
            <Search className="mr-2 h-4 w-4" />
            SEO
          </TabsTrigger>
        </TabsList>

        <form id="blog-form" onSubmit={handleSubmit}>
          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardContent className="pt-6 space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Post Title</Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your blog post title"
                      className="text-lg"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="slug">URL Slug</Label>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={handleSlugGenerate}
                        className="h-8 text-xs text-muted-foreground"
                      >
                        Generate from title
                      </Button>
                    </div>
                    <Input
                      id="slug"
                      name="slug"
                      value={formData.slug}
                      onChange={handleInputChange}
                      required
                      placeholder="your-post-slug"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Short Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      placeholder="A brief description of your blog post (used in previews)"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Content</Label>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">
                        Write your blog content using the editor below
                      </span>
                      <div className="flex items-center space-x-2">
                        <Label htmlFor="preview-mode" className="text-sm">
                          Preview
                        </Label>
                        <Switch
                          id="preview-mode"
                          checked={previewMode}
                          onCheckedChange={setPreviewMode}
                        />
                      </div>
                    </div>
                    <div
                      className={`border rounded-md min-h-[400px] ${previewMode ? "bg-card/50" : "bg-card"}`}
                    >
                      <BlogEditor
                        content={content}
                        onChange={setContent}
                        previewMode={previewMode}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="media" className="space-y-6">
            <Card>
              <CardContent className="pt-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <Label>Featured Image</Label>
                    <div className="space-y-4">
                      <div className="flex flex-col justify-center items-center space-y-2">
                        <Label htmlFor="image-url">Image URL</Label>
                        <Input
                          id="image-url"
                          placeholder="https://example.com/image.jpg"
                          value={imageUrl}
                          onChange={handleImageUrlChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Tag className="h-4 w-4" />
                        <Label htmlFor="tags">Tags (comma separated)</Label>
                      </div>
                      <Input
                        id="tags"
                        name="tags"
                        placeholder="nextjs, react, javascript"
                        onChange={handleTagsChange}
                      />
                      <p className="text-xs text-muted-foreground">
                        Add relevant tags to help readers find your content
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4" />
                        <Label htmlFor="category">Category</Label>
                      </div>
                      <Input
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g. Technology, Travel, Personal"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <Label htmlFor="published_at">Publish Date</Label>
                      </div>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !formData.published_at && "text-muted-foreground"
                            )}
                            disabled={!formData.is_published}
                          >
                            <Calendar className="mr-2 h-4 w-4" />
                            {formData.published_at ? (
                              format(new Date(formData.published_at), "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <CalendarComponent
                            mode="single"
                            selected={formData.published_at ? new Date(formData.published_at) : undefined}
                            onSelect={handleDateChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <p className="text-xs text-muted-foreground">
                        {formData.is_published
                          ? "Date when the post will be published"
                          : "Set 'Publish' to enable date selection"}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="seo" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>SEO Settings</CardTitle>
                <CardDescription>
                  Optimize your blog post for search engines
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="meta_title">SEO Title</Label>
                      <p className="text-xs text-muted-foreground">
                        {formData.meta_title?.length || 0}/60
                      </p>
                    </div>
                    <Input
                      id="meta_title"
                      name="meta_title"
                      value={formData.meta_title}
                      onChange={handleInputChange}
                      placeholder="SEO optimized title (defaults to post title)"
                      maxLength={60}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="meta_description">Meta Description</Label>
                      <p className="text-xs text-muted-foreground">
                        {formData.meta_description?.length || 0}/160
                      </p>
                    </div>
                    <Textarea
                      id="meta_description"
                      name="meta_description"
                      value={formData.meta_description}
                      onChange={handleInputChange}
                      placeholder="Brief description for search results (max 160 characters)"
                      rows={3}
                      maxLength={160}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="meta_keywords">Meta Keywords</Label>
                    <Input
                      id="meta_keywords"
                      name="meta_keywords"
                      value={formData.meta_keywords}
                      onChange={handleInputChange}
                      placeholder="keyword1, keyword2, keyword3"
                    />
                    <p className="text-xs text-muted-foreground">
                      Comma separated keywords (less important nowadays, but
                      still used by some search engines)
                    </p>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleMetaGenerate}
                    className="mt-2"
                  >
                    Generate Meta Data from Content
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>SEO Preview</CardTitle>
                <CardDescription>
                  How your post might appear in search results
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-4 border rounded-md">
                  <p className="text-blue-500 text-xl font-medium truncate">
                    {formData.meta_title || formData.title || "Blog Post Title"}
                  </p>
                  <p className="text-green-700 text-sm truncate">
                    www.yoursite.com/blog/{formData.slug || "post-slug"}
                  </p>
                  <p className="text-gray-700 text-sm mt-1 line-clamp-2">
                    {formData.meta_description ||
                      formData.description ||
                      "Your blog post description will appear here in search results. Make sure it's compelling and includes relevant keywords."}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </form>
      </Tabs>
    </div>
  );
}
