"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
  MapPin,
  Camera,
} from "lucide-react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { createPhotoSchema } from "@/types/photo";
import { z } from "zod";

export default function CreatePhotoPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("content");
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  // Initial form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image_url: "",
    location: "",
    camera_details: "",
    content: "",
    meta_description: "",
    meta_keywords: "",
    meta_title: "",
    author: "Rohit Pandit", // Default author
    category: "",
    is_published: false,
    priority: 0,
    tags: [] as string[],
    taken_at: new Date().toISOString().split("T")[0],
    published_at: new Date().toISOString().split("T")[0],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Form handling functions
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

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setFormData((prev) => ({ ...prev, image_url: url }));
    
    // Update preview if URL isn't empty
    if (url) {
      setPhotoPreview(url);
    } else {
      setPhotoPreview(null);
    }
  };

  const handleDateChange = (date: Date | undefined, fieldName: 'taken_at' | 'published_at') => {
    if (date) {
      const dateString = date.toISOString().split("T")[0];
      setFormData((prev) => ({ ...prev, [fieldName]: dateString }));
    }
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

  // Validate the form using Zod
  const validateForm = () => {
    try {
      // Create a new object that matches the schema structure
      const validationData = {
        ...formData,
        priority: Number(formData.priority), // Ensure priority is a number
      };
      
      createPhotoSchema.parse(validationData);
      return { valid: true, errors: {} };
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          // Extract the field name from the path
          const field = err.path[0] as string;
          newErrors[field] = err.message;
        });
        setErrors(newErrors);
        return { valid: false, errors: newErrors };
      }
      return { valid: false, errors: {} };
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate the form before submission
    const validation = validateForm();
    if (!validation.valid) {
      // Determine which tab has errors and switch to it
      const errorFields = Object.keys(validation.errors);
      
      if (errorFields.includes('title') || errorFields.includes('description') || errorFields.includes('content')) {
        setActiveTab('content');
      } else if (errorFields.includes('image_url') || errorFields.includes('location') || 
                errorFields.includes('camera_details') || errorFields.includes('taken_at') || 
                errorFields.includes('tags')) {
        setActiveTab('media');
      } else if (errorFields.includes('meta_title') || errorFields.includes('meta_description') || 
                errorFields.includes('meta_keywords')) {
        setActiveTab('seo');
      }
      
      // Create a more specific error message
      const firstError = errorFields[0];
      const errorMessage = firstError 
        ? `Please fix the error in the ${firstError.replace('_', ' ')} field`
        : "Please fix the errors in the form";
      
      toast.error(errorMessage, {
        description: "Fields with errors are highlighted in red"
      });
      
      // Scroll to the first error if possible
      const errorElement = document.getElementById(firstError);
      if (errorElement) {
        setTimeout(() => {
          errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          errorElement.focus();
        }, 100);
      }
      
      return;
    }
    
    setIsSubmitting(true);

    try {
      const photoData = {
        ...formData,
        priority: Number(formData.priority),
        published_at: formData.is_published ? formData.published_at : null,
      };

      // Send POST request to create the photo
      const response = await fetch("/api/admin/photo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(photoData),
      });

      if (!response.ok) {
        throw new Error("Failed to create photo");
      }

      const action = formData.is_published ? "published" : "saved as draft";
      toast.success(`Photo ${action} successfully!`);
      router.push("/admin");
    } catch (error) {
      console.error("Error creating photo:", error);
      toast.error("Failed to create photo. Please try again.");
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
          <h1 className="text-2xl font-bold">Create New Photo</h1>
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
            form="photo-form"
            disabled={isSubmitting}
            className="bg-glow-purple hover:bg-glow-purple/90"
          >
            {isSubmitting ? (
              <>Saving...</>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                {formData.is_published ? "Create & Publish" : "Save as Draft"}
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
            Photo & Details
          </TabsTrigger>
          <TabsTrigger value="seo" className="flex items-center">
            <Search className="mr-2 h-4 w-4" />
            SEO
          </TabsTrigger>
        </TabsList>

        <form id="photo-form" onSubmit={handleSubmit}>
          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardContent className="pt-6 space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Photo Title</Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Enter your photo title"
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
                      placeholder="A brief description of your photo"
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
                      placeholder="Optional additional content or notes about this photo"
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
                    <div className="space-y-2">
                      <Label htmlFor="image_url">Photo URL</Label>
                      <Input
                        id="image_url"
                        name="image_url"
                        placeholder="https://example.com/photo.jpg"
                        value={formData.image_url}
                        onChange={handleImageUrlChange}
                        className={cn(errors.image_url && "border-red-500")}
                      />
                      {errors.image_url && (
                        <p className="text-sm text-red-500">{errors.image_url}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location" className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4" />
                        <span>Location</span>
                      </Label>
                      <Input
                        id="location"
                        name="location"
                        placeholder="e.g., Paris, France"
                        value={formData.location}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="camera_details" className="flex items-center space-x-2">
                        <Camera className="h-4 w-4" />
                        <span>Camera Details</span>
                      </Label>
                      <Input
                        id="camera_details"
                        name="camera_details"
                        placeholder="e.g., Canon EOS 5D, f/2.8, 1/125s, ISO 100"
                        value={formData.camera_details}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <Label htmlFor="taken_at">Date Taken</Label>
                      </div>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !formData.taken_at && "text-muted-foreground"
                            )}
                          >
                            <Calendar className="mr-2 h-4 w-4" />
                            {formData.taken_at ? (
                              format(new Date(formData.taken_at), "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <CalendarComponent
                            mode="single"
                            selected={formData.taken_at ? new Date(formData.taken_at) : undefined}
                            onSelect={(date) => handleDateChange(date, 'taken_at')}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {photoPreview && (
                      <div className="border rounded-md overflow-hidden">
                        <img
                          src={photoPreview}
                          alt="Photo preview"
                          className="w-full h-auto object-cover"
                          onError={() => {
                            toast.error("Failed to load image");
                            setPhotoPreview(null);
                          }}
                        />
                      </div>
                    )}

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Tag className="h-4 w-4" />
                        <Label htmlFor="tags">Tags (comma separated)</Label>
                      </div>
                      <Input
                        id="tags"
                        name="tags"
                        placeholder="landscape, nature, portrait"
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
                        placeholder="e.g. Landscape, Portrait, Wildlife"
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
                            onSelect={(date) => handleDateChange(date, 'published_at')}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <p className="text-xs text-muted-foreground">
                        {formData.is_published
                          ? "Date when the photo will be published"
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
                  Optimize your photo for search engines
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
                      placeholder="SEO optimized title (defaults to photo title)"
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
                  How your photo might appear in search results
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-4 border rounded-md">
                  <p className="text-blue-500 text-xl font-medium truncate">
                    {formData.meta_title || formData.title || "Photo Title"}
                  </p>
                  <p className="text-green-700 text-sm truncate">
                    www.yoursite.com/photos/{formData.image_url.split('/').pop() || "photo-id"}
                  </p>
                  <p className="text-gray-700 text-sm mt-1 line-clamp-2">
                    {formData.meta_description ||
                      formData.description ||
                      "Your photo description will appear here in search results. Make sure it's compelling and includes relevant keywords."}
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