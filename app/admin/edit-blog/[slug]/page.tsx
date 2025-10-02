"use client";

import { useState, useEffect, useRef, use } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
// import { ShadcnBlogEditor } from "@/components/shadcn-blog-editor"; // Removed for testing
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
  PenTool,
} from "lucide-react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import BlogShimmer from "../blog-shimmer";
import Image from "next/image";
import { BlogEditor } from "@/components/blog-editor";

export default function EditBlogPage() {
  const router = useRouter();
  const params = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("content");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");

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

  const slug = params.slug;
  useEffect(() => {
    const fetchBlog = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/admin/blog/${slug}`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch blog");
        }
        
        const data = await response.json();
        const blog = data.blog;
        
        if (!blog) {
          toast.error("Blog not found");
          router.push("/admin/manage-content");
          return;
        }

        // Format the tags as an array of strings (tag IDs)
        const tagIds = blog.tags.map((tagRelation: any) => tagRelation.tag.id.toString());
        
        // Set form data with the fetched blog details
        setFormData({
          title: blog.title,
          slug: blog.slug,
          description: blog.description || "",
          meta_description: blog.meta_description || "",
          meta_keywords: blog.meta_keywords || "",
          meta_title: blog.meta_title || "",
          author: blog.author,
          category: blog.category || "",
          featured_image_url: blog.featured_image_url || "",
          is_published: blog.is_published,
          priority: blog.priority || 0,
          tags: tagIds,
          published_at: blog.published_at 
            ? new Date(blog.published_at).toISOString().split("T")[0] 
            : new Date().toISOString().split("T")[0],
        });
        
        // Set content for the editor
        setContent(blog.content);
        
        // Set image preview if there's a featured image
        if (blog.featured_image_url) {
          setImageUrl(blog.featured_image_url);
          setImagePreview(blog.featured_image_url);
        }
        
      } catch (error) {
        console.error("Error fetching blog:", error);
        toast.error("Failed to load blog. Please try again.");
        router.push("/admin/manage-content");
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchBlog();
    }
  }, [slug, router]);

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
    
    // Only show preview if the URL isn't empty
    if (url) {
      setImagePreview(url);
      //setFormData((prev) => ({ ...prev, featured_image_url: url }));
    } else {
      setImagePreview(null);
    }
  };

  const handleImagePreviewError = () => {
    toast.error("Invalid image URL. Please check the URL and try again.");
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
      console.log(`${JSON.stringify(formData)}`);
      console.log(`${JSON.stringify(formData.featured_image_url)}`);
      // Validate the image URL if provided
      if (
        !formData.featured_image_url
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

      // Send an update request to the API
      const response = await fetch(`/api/admin/blog/${slug}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blogData),
      });

      if (!response.ok) {
        throw new Error("Failed to update blog post");
      }

      const action = formData.is_published ? "published" : "saved as draft";
      toast.success(`Blog post ${action} successfully!`);
      router.push("/admin/manage-content");
    } catch (error) {
      console.error("Error updating blog post:", error);
      toast.error("Failed to update blog post. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <BlogShimmer/>
  }

  return (
    <div className="space-y-4">
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
          <h1 className="text-2xl font-bold">Edit Blog Post</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Label
              htmlFor="is_published"
              className={formData.is_published ? "text-green-500" : ""}
            >
              {formData.is_published ? "Published" : "Draft"}
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
                {formData.is_published ? "Update & Publish" : "Update Draft"}
              </>
            )}
          </Button>
        </div>
      </div>

      <form id="blog-form" onSubmit={handleSubmit} className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="content" className="flex items-center">
              <FileText className="mr-2 h-4 w-4" />
              Details
            </TabsTrigger>
            <TabsTrigger value="write" className="flex items-center">
              <PenTool className="mr-2 h-4 w-4" />
              Write
            </TabsTrigger>
            <TabsTrigger value="media" className="flex items-center">
              <ImagePlus className="mr-2 h-4 w-4" />
              Media
            </TabsTrigger>
            <TabsTrigger value="seo" className="flex items-center">
              <Search className="mr-2 h-4 w-4" />
              SEO
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="content" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Blog Details</CardTitle>
                <CardDescription>
                  Set up the basic information for your blog post
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Post Title</Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Enter your blog post title"
                      className="text-lg"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Short Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="A brief description of your blog post (used in previews)"
                      rows={3}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Input
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        placeholder="e.g. Technology, Travel, Personal"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="author">Author</Label>
                      <Input
                        id="author"
                        name="author"
                        value={formData.author}
                        onChange={handleInputChange}
                        placeholder="Author name"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="write" className="space-y-2">
            {/* Minimal header with essential controls */}
            <div className="flex items-center justify-between py-1 px-1">
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span>
                  {content ? `${content.replace(/<[^>]*>/g, '').length} characters` : '0 characters'}
                </span>
                <span>•</span>
                <span>
                  {content ? `~${Math.ceil(content.replace(/<[^>]*>/g, '').split(' ').length / 200)} min read` : '0 min read'}
                </span>
              </div>
            </div>
            
            {/* Full-height editor without card wrapper */}
            <div className="h-[calc(100vh-180px)] min-h-[600px]">
              <div className="h-full border rounded-lg overflow-hidden">
                <BlogEditor
                  key="persistent-editor"
                  initialContent={content}
                  onChange={(newContent) => {
                    console.log('Content updated:', newContent);
                    setContent(newContent);
                  }}
                  placeholder="Start writing your blog post..."
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="media" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Featured Image & Publishing</CardTitle>
                <CardDescription>
                  Add a featured image and set publishing options for your blog post
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="image-url">Featured Image URL</Label>
                      <Input
                        id="image-url"
                        placeholder="https://example.com/image.jpg"
                        value={formData.featured_image_url || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, featured_image_url: e.target.value }))}
                      />
                      <p className="text-xs text-muted-foreground">
                        Add a compelling featured image for your blog post
                      </p>
                    </div>
                    
                    {formData.featured_image_url && (
                      <div className="mt-4">
                        <div className="rounded-md overflow-hidden border border-border">
                          <img
                            src={formData.featured_image_url}
                            alt="Featured image preview"
                            className="w-full h-auto max-h-[200px] object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">
                          Featured image preview
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="slug">
                        URL Slug <span className="text-sm text-muted-foreground">(URL path)</span>
                      </Label>
                      <div className="flex space-x-2">
                        <Input
                          id="slug"
                          name="slug"
                          value={formData.slug}
                          onChange={handleInputChange}
                          placeholder="blog-post-url"
                          required
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={handleSlugGenerate}
                          className="shrink-0"
                        >
                          <FileText className="h-4 w-4 mr-2" />
                          Generate
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="priority">Priority (0-10)</Label>
                      <Input
                        id="priority"
                        name="priority"
                        type="number"
                        min="0"
                        max="10"
                        value={formData.priority}
                        onChange={handleInputChange}
                        placeholder="0"
                      />
                      <p className="text-xs text-muted-foreground">
                        Higher priority posts appear first in listings
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="tags">
                    Tags <span className="text-sm text-muted-foreground">(comma separated)</span>
                  </Label>
                  <Input
                    id="tags"
                    name="tags"
                    value={formData.tags.join(", ")}
                    onChange={handleTagsChange}
                    placeholder="tech, programming, web, etc."
                  />
                </div>
                
                <div className="space-y-4 pt-4">
                  <div className="flex items-center justify-between">
                    <Label>SEO Details</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleMetaGenerate}
                    >
                      <Search className="h-4 w-4 mr-2" />
                      Generate SEO Meta
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="meta_title">Meta Title</Label>
                    <Input
                      id="meta_title"
                      name="meta_title"
                      value={formData.meta_title}
                      onChange={handleInputChange}
                      placeholder="SEO title (defaults to post title)"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="meta_description">Meta Description</Label>
                    <Textarea
                      id="meta_description"
                      name="meta_description"
                      value={formData.meta_description}
                      onChange={handleInputChange}
                      placeholder="Brief description for search engines"
                      rows={2}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="meta_keywords">Meta Keywords</Label>
                    <Input
                      id="meta_keywords"
                      name="meta_keywords"
                      value={formData.meta_keywords}
                      onChange={handleInputChange}
                      placeholder="Comma-separated keywords"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="media" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Featured Image</CardTitle>
                <CardDescription>
                  Add a featured image for your blog post.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="featured_image_url">Image URL</Label>
                  <Input
                    id="featured_image_url"
                    name="featured_image_url"
                    value={imageUrl}
                    onChange={handleImageUrlChange}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                
                {imagePreview && (
                  <div className="mt-4 relative">
                    <div className="rounded-md overflow-hidden border border-border">
                      <Image
                        src={imagePreview}
                        width={300}
                        height={300}
                        alt="Featured image preview"
                        className="w-full h-auto max-h-[300px] object-cover"
                        onError={handleImagePreviewError}
                      />
                    </div>
                    <div className="text-sm text-muted-foreground mt-2">
                      Featured image preview
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="publishing" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Publishing Options</CardTitle>
                <CardDescription>
                  Configure how and when your blog post will be published.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="author">Author</Label>
                    <Input
                      id="author"
                      name="author"
                      value={formData.author}
                      onChange={handleInputChange}
                      placeholder="Author name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="priority">
                      Priority <span className="text-sm text-muted-foreground">(0-10)</span>
                    </Label>
                    <Input
                      id="priority"
                      name="priority"
                      type="number"
                      min="0"
                      max="10"
                      value={formData.priority}
                      onChange={handleInputChange}
                      placeholder="0"
                    />
                  </div>
                </div>
                
                <div className="space-y-2 pt-2">
                  <Label htmlFor="published_date">Publication Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
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
                    <PopoverContent className="w-auto p-0">
                      <CalendarComponent
                        mode="single"
                        selected={formData.published_at ? new Date(formData.published_at) : undefined}
                        onSelect={handleDateChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="flex items-center space-x-2 pt-2">
                  <Switch 
                    id="is_published" 
                    checked={formData.is_published} 
                    onCheckedChange={handleSwitchChange} 
                  />
                  <Label htmlFor="is_published" className="cursor-pointer">
                    {formData.is_published ? "Published" : "Draft"}
                  </Label>
                </div>
                
                <div className="text-sm text-muted-foreground">
                  {formData.is_published
                    ? `This blog post will be visible to the public.`
                    : `This blog post will be saved as a draft and won't be visible to the public.`}
                </div>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button
                  type="submit"
                  className="w-full bg-glow-purple hover:bg-glow-purple/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span>Saving...</span>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      {formData.is_published ? "Update & Publish" : "Update Draft"}
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </form>
    </div>
  );
} 