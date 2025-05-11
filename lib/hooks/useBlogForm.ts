import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';
import { format } from 'date-fns';

// Define the slug schema
export const slugSchema = z.string().min(1).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
  message: "Slug must be URL-friendly (lowercase, hyphens, no spaces)"
});

// Define the blog post schema (matching backend validation)
export const blogPostSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(200, "Title cannot exceed 200 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  slug: slugSchema,
  content: z.string()
    .min(50, "Content must be at least 50 characters")
    .refine(
      (val) => {
        // Check if content is just empty paragraph tags or similar
        return !(val.trim() === "" || val.trim() === "<p></p>" || val.trim() === "<p><br></p>");
      },
      { message: "Content cannot be empty" }
    ),
  author: z.string().min(2, "Author name must be at least 2 characters"),
  priority: z.number().int().min(0).max(10).default(0),
  category: z.string().min(1, "Category is required"),
  published_at: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: "Invalid date format"
  }),
  is_published: z.boolean().default(false),
  featured_image_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  meta_description: z.string().optional().or(z.literal("")),
  meta_keywords: z.string().optional().or(z.literal("")),
  meta_title: z.string().optional().or(z.literal("")),
  tags: z.array(z.string()).default([])
});

// Create a type from the schema
export type BlogPostFormData = z.infer<typeof blogPostSchema>;

// Default form values
export const defaultFormValues: BlogPostFormData = {
  title: "",
  slug: "",
  description: "",
  content: "",
  meta_description: "",
  meta_keywords: "",
  meta_title: "",
  author: "Rohit Pandit",
  category: "",
  featured_image_url: "",
  is_published: false,
  priority: 0,
  tags: [],
  published_at: new Date().toISOString().split("T")[0],
};

type UseBlogFormProps = {
  initialValues?: Partial<BlogPostFormData>;
  initialContent?: string;
  onSubmit: (formData: BlogPostFormData, content: string) => Promise<void>;
};

type UseBlogFormReturn = {
  formData: BlogPostFormData;
  content: string;
  setContent: (content: string) => void;
  formErrors: Partial<Record<keyof BlogPostFormData, string>>;
  isSubmitting: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  imagePreview: string | null;
  imageUrl: string;
  datePickerOpen: boolean;
  setDatePickerOpen: (open: boolean) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSwitchChange: (checked: boolean) => void;
  handleTagsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSlugGenerate: () => void;
  handleMetaGenerate: () => void;
  handleImageUrlChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleImagePreviewError: () => void;
  handleDateChange: (date: Date | undefined) => void;
  handleContentChange: (newContent: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  hasError: (field: keyof BlogPostFormData) => boolean;
};

export function useBlogForm({
  initialValues = {},
  initialContent = "",
  onSubmit
}: UseBlogFormProps): UseBlogFormReturn {
  // Form state
  const [formData, setFormData] = useState<BlogPostFormData>({
    ...defaultFormValues,
    ...initialValues
  });
  
  // Content state
  const [content, setContent] = useState(initialContent);
  
  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("content");
  const [imagePreview, setImagePreview] = useState<string | null>(
    initialValues.featured_image_url || null
  );
  const [imageUrl, setImageUrl] = useState<string>(
    initialValues.featured_image_url || ""
  );
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  
  // Form validation state
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof BlogPostFormData, string>>>({});

  // Update imageUrl and preview if initialValues changes
  useEffect(() => {
    if (initialValues.featured_image_url) {
      setImageUrl(initialValues.featured_image_url);
      setImagePreview(initialValues.featured_image_url);
    }
  }, [initialValues.featured_image_url]);

  // Event handlers
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    // Clear error for this field when it changes
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => {
        const updated = { ...prev };
        delete updated[name as keyof typeof updated];
        return updated;
      });
    }
    
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
    
    // Clear any slug errors since we're generating a valid slug
    if (formErrors.slug) {
      setFormErrors(prev => {
        const updated = { ...prev };
        delete updated.slug;
        return updated;
      });
    }
    
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
    
    // Clear featured_image_url error when it changes
    if (formErrors.featured_image_url) {
      setFormErrors(prev => {
        const updated = { ...prev };
        delete updated.featured_image_url;
        return updated;
      });
    }
    
    // Only show preview if the URL isn't empty
    if (url) {
      setImagePreview(url);
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
  
  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    
    // Clear content error when it changes
    if (formErrors.content) {
      setFormErrors(prev => {
        const updated = { ...prev };
        delete updated.content;
        return updated;
      });
    }
  };

  // Validation function
  const validateForm = () => {
    // Prepare the complete data object for validation
    const dataToValidate = {
      ...formData,
      content
    };
    
    try {
      // Parse and validate the data with Zod
      blogPostSchema.parse(dataToValidate);
      return { success: true, errors: {} };
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Convert Zod errors to a more usable format
        const errors: Partial<Record<keyof BlogPostFormData, string>> = {};
        error.errors.forEach(err => {
          const path = err.path[0] as keyof BlogPostFormData;
          errors[path] = err.message;
        });
        return { success: false, errors };
      }
      // Return an empty errors object for other error types
      return { success: false, errors: {} };
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate the form data with Zod
    const { success, errors } = validateForm();
    
    if (!success) {
      setFormErrors(errors);
      
      // Determine which tab has errors
      const errorFields = Object.keys(errors) as Array<keyof BlogPostFormData>;
      
      if (errorFields.some(field => ['title', 'slug', 'description', 'content'].includes(field))) {
        setActiveTab("content");
        toast.error("Please fix the errors in the Content tab");
      } else if (errorFields.some(field => ['category', 'featured_image_url', 'tags'].includes(field))) {
        setActiveTab("media");
        toast.error("Please fix the errors in the Media & Tags tab");
      } else if (errorFields.some(field => ['meta_title', 'meta_description', 'meta_keywords'].includes(field))) {
        setActiveTab("seo");
        toast.error("Please fix the errors in the SEO tab");
      }
      return; // Exit early if validation fails
    }
    
    // Force validate essential fields even if Zod validation passes
    const emptyRequiredFields: Partial<Record<keyof BlogPostFormData, string>> = {};
    
    // Check essential fields manually
    if (!formData.title) emptyRequiredFields.title = "Title is required";
    if (!formData.slug) emptyRequiredFields.slug = "Slug is required";
    if (!formData.description) emptyRequiredFields.description = "Description is required";
    if (!formData.category) emptyRequiredFields.category = "Category is required";
    if (!content || content.trim() === "") emptyRequiredFields.content = "Content is required";
    
    // If any required fields are empty, show errors and return
    if (Object.keys(emptyRequiredFields).length > 0) {
      setFormErrors(prev => ({ ...prev, ...emptyRequiredFields }));
      
      // Navigate to the first tab with errors
      if (Object.keys(emptyRequiredFields).some(field => ['title', 'slug', 'description', 'content'].includes(field))) {
        setActiveTab("content");
        toast.error("Please fill in all required fields in the Content tab");
      } else if (Object.keys(emptyRequiredFields).some(field => ['category'].includes(field))) {
        setActiveTab("media");
        toast.error("Please fill in all required fields in the Media & Tags tab");
      }
      return;
    }
    
    // If validation passes, proceed with submission
    setIsSubmitting(true);

    try {
      // Call the onSubmit function passed from the parent component
      await onSubmit(
        { ...formData, content }, 
        content
      );
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper to check if a field has an error
  const hasError = (field: keyof BlogPostFormData) => Boolean(formErrors[field]);

  return {
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
  };
} 