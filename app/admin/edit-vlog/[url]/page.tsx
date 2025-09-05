"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
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
  Video,
  Clock,
} from "lucide-react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { createVlogSchema } from "@/types/vlog";
import { z } from "zod";

export default function EditVlogPage() {
  const router = useRouter();
  const params = useParams();
  const encodedVideoUrl = params.url as string;
  const videoUrl = decodeURIComponent(encodedVideoUrl);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("content");
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState<string>("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    video_url: "",
    thumbnail_url: "",
    duration: "",
    content: "",
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

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Fetch vlog data when component mounts
  useEffect(() => {
    const fetchVlog = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/admin/vlog/${encodedVideoUrl}`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch vlog");
        }
        
        const data = await response.json();
        const vlog = data.vlog;
        
        if (!vlog) {
          toast.error("Vlog not found");
          router.push("/admin");
          return;
        }
        
        // Set form data with the fetched vlog details
        setFormData({
          title: vlog.title || "",
          description: vlog.description || "",
          video_url: vlog.video_url || "",
          thumbnail_url: vlog.thumbnail_url || "",
          duration: vlog.duration || "",
          content: vlog.content || "",
          meta_description: vlog.meta_description || "",
          meta_keywords: vlog.meta_keywords || "",
          meta_title: vlog.meta_title || "",
          author: vlog.author || "Rohit Pandit",
          category: vlog.category || "",
          is_published: vlog.is_published || false,
          priority: vlog.priority || 0,
          tags: vlog.tags || [],
          published_at: vlog.published_at 
            ? new Date(vlog.published_at).toISOString().split("T")[0] 
            : new Date().toISOString().split("T")[0],
        });
        
        // Set thumbnail preview if available
        if (vlog.thumbnail_url) {
          setThumbnailPreview(vlog.thumbnail_url);
          setThumbnailUrl(vlog.thumbnail_url);
        }
        
      } catch (error) {
        console.error("Error fetching vlog:", error);
        toast.error("Failed to load vlog. Please try again.");
        router.push("/admin");
      } finally {
        setIsLoading(false);
      }
    };

    if (videoUrl) {
      fetchVlog();
    }
  }, [videoUrl, router, encodedVideoUrl]);

  // Handle input changes and validate fields
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, is_published: checked }));
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tagsArray = e.target.value.split(",").map((tag) => tag.trim());
    setFormData((prev) => ({ ...prev, tags: tagsArray }));
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

  const handleThumbnailUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setThumbnailUrl(url);
    setFormData((prev) => ({ ...prev, thumbnail_url: url }));
    
    // Only show preview if the URL isn't empty
    if (url) {
      setThumbnailPreview(url);
    } else {
      setThumbnailPreview(null);
    }
  };

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      const dateString = date.toISOString().split("T")[0];
      setFormData((prev) => ({ ...prev, published_at: dateString }));
    }
  };

  // Validate the form using Zod
  const validateForm = () => {
    try {
      // Create a new object that matches the schema structure
      const validationData = {
        ...formData,
        priority: Number(formData.priority), // Ensure priority is a number
      };
      
      createVlogSchema.parse(validationData);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          // Extract the field name from the path
          const field = err.path[0] as string;
          newErrors[field] = err.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate the form before submission
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }
    
    setIsSubmitting(true);

    try {
      const vlogData = {
        ...formData,
        priority: Number(formData.priority),
        published_at: formData.is_published ? formData.published_at : null,
      };

      // Send PUT request to update the vlog
      const response = await fetch(`/api/admin/vlog/${encodedVideoUrl}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(vlogData),
      });

      if (!response.ok) {
        throw new Error("Failed to update vlog");
      }

      const action = formData.is_published ? "published" : "saved as draft";
      toast.success(`Vlog ${action} successfully!`);
      router.push("/admin");
    } catch (error) {
      console.error("Error updating vlog:", error);
      toast.error("Failed to update vlog. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg">Loading vlog content...</p>
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
          <h1 className="text-2xl font-bold">Edit Vlog</h1>
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
            form="vlog-form"
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
            <Video className="mr-2 h-4 w-4" />
            Video & Thumbnail
          </TabsTrigger>
          <TabsTrigger value="seo" className="flex items-center">
            <Search className="mr-2 h-4 w-4" />
            SEO
          </TabsTrigger>
        </TabsList>

        <form id="vlog-form" onSubmit={handleSubmit}>
          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardContent className="pt-6 space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Vlog Title</Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Enter your vlog title"
                      className={cn(
                        "text-lg",
                        errors.title && "border-red-500"
                      )}
                    />
                    {errors.title && (
                      <p className="text-sm text-red-500">{errors.title}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="A brief description of your vlog"
                      rows={3}
                      className={cn(errors.description && "border-red-500")}
                    />
                    {errors.description && (
                      <p className="text-sm text-red-500">{errors.description}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content">Additional Content/Notes</Label>
                    <Textarea
                      id="content"
                      name="content"
                      value={formData.content}
                      onChange={handleInputChange}
                      placeholder="Optional additional content or notes about this vlog"
                      rows={6}
                    />
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
                    <Label className="flex items-center space-x-2">
                      <Video className="h-4 w-4" />
                      <span>Video Information</span>
                    </Label>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="video_url">Video URL</Label>
                        <Input
                          id="video_url"
                          name="video_url"
                          placeholder="https://youtube.com/watch?v=..."
                          value={formData.video_url}
                          onChange={handleInputChange}
                          className={cn(errors.video_url && "border-red-500")}
                        />
                        {errors.video_url && (
                          <p className="text-sm text-red-500">{errors.video_url}</p>
                        )}
                        <p className="text-xs text-muted-foreground">
                          YouTube, Vimeo, or direct MP4 URL
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="duration" className="flex items-center space-x-2">
                          <Clock className="h-4 w-4" />
                          <span>Duration</span>
                        </Label>
                        <Input
                          id="duration"
                          name="duration"
                          placeholder="e.g., 5:30 or 330 (seconds)"
                          value={formData.duration}
                          onChange={handleInputChange}
                        />
                        <p className="text-xs text-muted-foreground">
                          Format: MM:SS or total seconds
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label className="flex items-center space-x-2">
                      <ImagePlus className="h-4 w-4" />
                      <span>Thumbnail</span>
                    </Label>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="thumbnail_url">Thumbnail URL</Label>
                        <Input
                          id="thumbnail_url"
                          name="thumbnail_url"
                          placeholder="https://example.com/thumbnail.jpg"
                          value={formData.thumbnail_url}
                          onChange={handleThumbnailUrlChange}
                          className={cn(errors.thumbnail_url && "border-red-500")}
                        />
                        {errors.thumbnail_url && (
                          <p className="text-sm text-red-500">{errors.thumbnail_url}</p>
                        )}
                      </div>

                      {thumbnailPreview && (
                        <div className="mt-2 border rounded-md overflow-hidden">
                          <img
                            src={thumbnailPreview}
                            alt="Thumbnail preview"
                            className="w-full h-auto object-cover"
                            onError={() => {
                              toast.error("Failed to load thumbnail image");
                              setThumbnailPreview(null);
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Tag className="h-4 w-4" />
                      <Label htmlFor="tags">Tags (comma separated)</Label>
                    </div>
                    <Input
                      id="tags"
                      name="tags"
                      placeholder="travel, tutorial, vlog"
                      value={formData.tags.join(", ")}
                      onChange={handleTagsChange}
                    />
                    <p className="text-xs text-muted-foreground">
                      Add relevant tags to help viewers find your content
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
                      placeholder="e.g. Travel, Tutorial, Technology"
                    />
                  </div>
                </div>

                <div className="space-y-2 mt-4">
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
                      ? "Date when the vlog will be published"
                      : "Set 'Publish' to enable date selection"}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="seo" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>SEO Settings</CardTitle>
                <CardDescription>
                  Optimize your vlog for search engines
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
                      placeholder="SEO optimized title (defaults to vlog title)"
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
                  How your vlog might appear in search results
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-4 border rounded-md">
                  <p className="text-blue-500 text-xl font-medium truncate">
                    {formData.meta_title || formData.title || "Vlog Title"}
                  </p>
                  <p className="text-green-700 text-sm truncate">
                    www.yoursite.com/vlog/{formData.video_url.split('/').pop() || "video-id"}
                  </p>
                  <p className="text-gray-700 text-sm mt-1 line-clamp-2">
                    {formData.meta_description ||
                      formData.description ||
                      "Your vlog description will appear here in search results. Make sure it's compelling and includes relevant keywords."}
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