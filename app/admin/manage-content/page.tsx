"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Pencil, Search, ArrowLeft } from "lucide-react";
import { BlogDTO } from "@/types/blog";
import { PoemDTO } from "@/types/poem";
import { format } from "date-fns";

export default function ManageContentPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("blogs");
  const [blogs, setBlogs] = useState<BlogDTO[]>([]);
  const [poems, setPoems] = useState<PoemDTO[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [contentType, setContentType] = useState("all");

  useEffect(() => {
    const fetchContent = async () => {
      setIsLoading(true);
      try {
        // Fetch blogs
        const blogsResponse = await fetch("/api/admin/blogs");
        const blogsData = await blogsResponse.json();
        setBlogs(blogsData.blogs || []);

        // Fetch poems
        const poemsResponse = await fetch("/api/admin/poems");
        const poemsData = await poemsResponse.json();
        setPoems(poemsData.poems || []);
      } catch (error) {
        console.error("Error fetching content:", error);
        toast.error("Failed to load content. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleContentTypeChange = (value: string) => {
    setContentType(value);
  };

  const handleEditItem = (type: string, slug: string) => {
    if (type === "blog") {
      router.push(`/admin/edit-blog/${slug}`);
    } else if (type === "poem") {
      router.push(`/admin/edit-poem/${slug}`);
    }
  };

  // Filter content based on search term and content type
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = searchTerm
      ? blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.slug.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    
    const matchesType =
      contentType === "all" ||
      (contentType === "published" && blog.is_published) ||
      (contentType === "draft" && !blog.is_published);
    
    return matchesSearch && matchesType;
  });

  const filteredPoems = poems.filter((poem) => {
    const matchesSearch = searchTerm
      ? poem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        poem.slug.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    
    const matchesType =
      contentType === "all" ||
      (contentType === "published" && poem.is_published) ||
      (contentType === "draft" && !poem.is_published);
    
    return matchesSearch && matchesType;
  });

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
          <h1 className="text-2xl font-bold">Manage Content</h1>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            placeholder="Search by title or slug..."
            className="pl-8"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <Select value={contentType} onValueChange={handleContentTypeChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Content</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="draft">Drafts</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="blogs">Blogs</TabsTrigger>
          <TabsTrigger value="poems">Poems</TabsTrigger>
        </TabsList>
        
        <TabsContent value="blogs">
          <Card>
            <CardHeader>
              <CardTitle>Blog Posts</CardTitle>
              <CardDescription>
                Manage your existing blog posts. Click on a post to edit it.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-4">Loading blogs...</div>
              ) : filteredBlogs.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Published Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBlogs.map((blog) => (
                      <TableRow key={blog.slug}>
                        <TableCell className="font-medium">{blog.title}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            blog.is_published 
                              ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100" 
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100"
                          }`}>
                            {blog.is_published ? "Published" : "Draft"}
                          </span>
                        </TableCell>
                        <TableCell>
                          {blog.published_at 
                            ? format(new Date(blog.published_at), "MMM d, yyyy") 
                            : "Not published"}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditItem("blog", blog.slug)}
                          >
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-4">
                  No blogs found. {searchTerm && "Try a different search term."}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="poems">
          <Card>
            <CardHeader>
              <CardTitle>Poems</CardTitle>
              <CardDescription>
                Manage your existing poems. Click on a poem to edit it.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-4">Loading poems...</div>
              ) : filteredPoems.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPoems.map((poem) => (
                      <TableRow key={poem.slug}>
                        <TableCell className="font-medium">{poem.title}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            poem.is_published 
                              ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100" 
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100"
                          }`}>
                            {poem.is_published ? "Published" : "Draft"}
                          </span>
                        </TableCell>
                        <TableCell>
                          {format(new Date(poem.created_at), "MMM d, yyyy")}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditItem("poem", poem.slug)}
                          >
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-4">
                  No poems found. {searchTerm && "Try a different search term."}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 