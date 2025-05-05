"use client";

import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  ArrowLeft,
  Calendar,
  FileText,
  Save,
  Search
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function EditPoemPage({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("content");

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    description: "",
    meta_description: "",
    meta_keywords: "",
    meta_title: "",
    author: "Rohit Pandit", // Default author
    category: "",
    is_published: false,
    priority: 0,
    tags: [] as string[],
    published_at: new Date().toISOString().split("T")[0],
  });

  const { slug } = params;

  useEffect(() => {
    const fetchPoem = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/admin/poem/${slug}`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch poem");
        }
        
        const data = await response.json();
        const poem = data.poem;
        
        if (!poem) {
          toast.error("Poem not found");
          router.push("/admin/manage-content");
          return;
        }
        
        // Set form data with the fetched poem details
        setFormData({
          title: poem.title,
          slug: poem.slug,
          content: poem.content,
          description: poem.description || "",
          meta_description: poem.meta_description || "",
          meta_keywords: poem.meta_keywords || "",
          meta_title: poem.meta_title || "",
          author: poem.author,
          category: poem.category || "",
          is_published: poem.is_published,
          priority: poem.priority || 0,
          tags: poem.tags || [],
          published_at: poem.published_at 
            ? new Date(poem.published_at).toISOString().split("T")[0] 
            : new Date().toISOString().split("T")[0],
        });
        
      } catch (error) {
        console.error("Error fetching poem:", error);
        toast.error("Failed to load poem. Please try again.");
        router.push("/admin/manage-content");
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchPoem();
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

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      const dateString = date.toISOString().split("T")[0];
      setFormData((prev) => ({ ...prev, published_at: dateString }));
    }
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!formData.title || !formData.content) {
        toast.error("Please provide both a title and content for your poem");
        setIsSubmitting(false);
        return;
      }

      const poemData = {
        ...formData,
        published_at: formData.is_published ? formData.published_at : null, // Only set published date if publishing
      };
      
      // Send an update request to the API
      const response = await fetch(`/api/admin/poem/${slug}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(poemData),
      });

      if (!response.ok) {
        throw new Error("Failed to update poem");
      }

      const action = formData.is_published ? "published" : "saved as draft";
      toast.success(`Poem ${action} successfully!`);
      router.push("/admin/manage-content");
    } catch (error) {
      console.error("Error updating poem:", error);
      toast.error("Failed to update poem. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg">Loading poem content...</p>
        </div>
      </div>
    );
  }

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
          <h1 className="text-2xl font-bold">Edit Poem</h1>
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
            form="poem-form"
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

      <form id="poem-form" onSubmit={handleSubmit} className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="metadata">Metadata & Publishing</TabsTrigger>
          </TabsList>
          
          <TabsContent value="content" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Poem Content</CardTitle>
                <CardDescription>
                  Edit your poem content below.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter poem title"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    placeholder="Enter your poem here..."
                    rows={15}
                    className="font-serif"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Brief description of your poem (optional)"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="metadata" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Metadata & Publishing</CardTitle>
                <CardDescription>
                  Configure metadata and publishing options for your poem.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="slug">
                      Slug <span className="text-sm text-muted-foreground">(URL path)</span>
                    </Label>
                    <div className="flex space-x-2">
                      <Input
                        id="slug"
                        name="slug"
                        value={formData.slug}
                        onChange={handleInputChange}
                        placeholder="poem-url"
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
                
                <div className="space-y-2 pt-2">
                  <Label htmlFor="tags">
                    Tags <span className="text-sm text-muted-foreground">(comma separated)</span>
                  </Label>
                  <Input
                    id="tags"
                    name="tags"
                    value={formData.tags.join(", ")}
                    onChange={handleTagsChange}
                    placeholder="love, nature, reflection, etc."
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
                      placeholder="e.g. Sonnet, Free Verse"
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
                
                <div className="space-y-4 pt-2">
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
                      placeholder="SEO title (defaults to poem title)"
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
                
                <div className="space-y-2 pt-4">
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
                
                <div className="flex items-center space-x-2 pt-4">
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
                    ? `This poem will be visible to the public.`
                    : `This poem will be saved as a draft and won't be visible to the public.`}
                </div>
                
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
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </form>
    </div>
  );
} 