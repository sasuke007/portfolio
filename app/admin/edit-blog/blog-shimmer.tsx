import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, ImagePlus, Search } from "lucide-react";

// Reusable shimmer element component
const ShimmerElement = ({ className }: { className?: string }) => (
  <div 
    className={`bg-muted/70 shimmer rounded ${className}`}
  />
);

export default function BlogShimmer() {
  return (
    <div className="space-y-4 py-4 lg:py-8 animate-in fade-in duration-500 bg-background dark:bg-dark-200">
      <div className="flex items-center justify-between p-2">
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" disabled>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blogs
          </Button>
        </div>
      </div>

      <div className="container p-0">
        <Tabs defaultValue="content">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="content" disabled>
              <FileText className="mr-2 h-4 w-4" />
              Content
            </TabsTrigger>
            <TabsTrigger value="media" disabled>
              <ImagePlus className="mr-2 h-4 w-4" />
              Media & Tags
            </TabsTrigger>
            <TabsTrigger value="seo" disabled>
              <Search className="mr-2 h-4 w-4" />
              SEO
            </TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="space-y-4">
            <Card className="border border-border bg-card/30 shimmer">
              <CardHeader className="border-b border-border/20 bg-card/50 dark:bg-dark-300/80">
                <ShimmerElement className="h-8 w-1/3" />
                <ShimmerElement className="h-4 w-2/3" />
              </CardHeader>
              <CardContent className="space-y-8 p-6 bg-card/50 dark:bg-dark-300/50">
                <div className="space-y-6">
                  {/* Title field shimmer */}
                  <div className="space-y-2">
                    <ShimmerElement className="h-4 w-1/6" />
                    <ShimmerElement className="h-10 w-full" />
                  </div>
                  
                  {/* Slug field shimmer */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <ShimmerElement className="h-4 w-1/6" />
                      <ShimmerElement className="h-4 w-1/6" />
                    </div>
                    <ShimmerElement className="h-10 w-full" />
                  </div>

                  {/* Description field shimmer */}
                  <div className="space-y-2">
                    <ShimmerElement className="h-4 w-1/6" />
                    <ShimmerElement className="h-24 w-full" />
                  </div>

                  {/* Content editor shimmer */}
                  <div className="space-y-2">
                    <ShimmerElement className="h-4 w-1/6" />
                    <ShimmerElement className="h-64 w-full" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Media & Tags Tab */}
          <TabsContent value="media" className="space-y-4">
            <Card className="border border-border bg-card/30 shimmer">
              <CardHeader className="border-b border-border/20 bg-card/50 dark:bg-dark-300/80">
                <ShimmerElement className="h-8 w-1/3" />
                <ShimmerElement className="h-4 w-2/3" />
              </CardHeader>
              <CardContent className="space-y-8 p-6 bg-card/50 dark:bg-dark-300/50">
                <div className="grid lg:grid-cols-2 gap-4">
                  <div className="space-y-6">
                    {/* Category field shimmer */}
                    <div className="space-y-2">
                      <ShimmerElement className="h-4 w-1/6" />
                      <ShimmerElement className="h-10 w-full" />
                    </div>
                    
                    {/* Tags field shimmer */}
                    <div className="space-y-2">
                      <ShimmerElement className="h-4 w-1/4" />
                      <ShimmerElement className="h-10 w-full" />
                    </div>
                    
                    {/* Author field shimmer */}
                    <div className="space-y-2">
                      <ShimmerElement className="h-4 w-1/6" />
                      <ShimmerElement className="h-10 w-full" />
                    </div>
                    
                    {/* Toggle field shimmer */}
                    <div className="space-y-2 pt-4">
                      <div className="flex">
                        <ShimmerElement className="h-6 w-10 rounded-full mr-2" />
                        <ShimmerElement className="h-4 w-1/6" />
                      </div>
                      <ShimmerElement className="h-4 w-2/3" />
                    </div>
                  </div>
                  
                  {/* Image preview shimmer */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <ShimmerElement className="h-4 w-1/6" />
                      <ShimmerElement className="h-10 w-full" />
                    </div>
                    <div className="relative aspect-video rounded-md overflow-hidden border border-border">
                      <ShimmerElement className="absolute inset-0" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* SEO Tab */}
          <TabsContent value="seo" className="space-y-4">
            <Card className="border border-border bg-card/30 shimmer">
              <CardHeader className="border-b border-border/20 bg-card/50 dark:bg-dark-300/80">
                <ShimmerElement className="h-8 w-1/3" />
                <ShimmerElement className="h-4 w-2/3" />
              </CardHeader>
              <CardContent className="space-y-8 p-6 bg-card/50 dark:bg-dark-300/50">
                <div className="flex justify-end">
                  <ShimmerElement className="h-10 w-40" />
                </div>
                
                {/* Meta Title field shimmer */}
                <div className="space-y-2">
                  <ShimmerElement className="h-4 w-1/6" />
                  <ShimmerElement className="h-10 w-full" />
                </div>
                
                {/* Meta Description field shimmer */}
                <div className="space-y-2">
                  <ShimmerElement className="h-4 w-1/6" />
                  <ShimmerElement className="h-24 w-full" />
                </div>
                
                {/* Meta Keywords field shimmer */}
                <div className="space-y-2">
                  <ShimmerElement className="h-4 w-1/6" />
                  <ShimmerElement className="h-10 w-full" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-4 flex justify-end">
          <ShimmerElement className="h-10 w-32" />
        </div>
      </div>
    </div>
  );
} 