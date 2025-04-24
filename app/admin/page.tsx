import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, BookOpen, Image as ImageIcon, Video } from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  // Mock data - would be fetched from API in production
  const stats = [
    { title: "Blog Posts", count: 12, icon: FileText, path: "create-blog" },
    { title: "Poems", count: 8, icon: BookOpen, path: "create-poem" },
    { title: "Photos", count: 24, icon: ImageIcon, path: "create-photo" },
    { title: "Vlogs", count: 5, icon: Video, path: "create-vlog" }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your content and media from this dashboard.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Link href={`/admin/${stat.path}`} key={stat.title}>
              <Card className="hover:bg-muted/50 transition-colors">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.count}</div>
                  <p className="text-xs text-muted-foreground">
                    {stat.count === 1 ? 'item' : 'items'} published
                  </p>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Your recent content actions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <div className="text-sm">
                  <strong>New blog post</strong> created 2 days ago
                </div>
              </div>
              <div className="flex items-center gap-2">
                <ImageIcon className="h-4 w-4 text-muted-foreground" />
                <div className="text-sm">
                  <strong>3 photos</strong> uploaded 5 days ago
                </div>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-muted-foreground" />
                <div className="text-sm">
                  <strong>Poem collection</strong> updated 1 week ago
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks and operations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Link href="/admin/create-blog" className="text-sm text-blue-500 hover:underline flex items-center gap-1">
                <FileText className="h-3 w-3" /> New blog post
              </Link>
              <Link href="/admin/create-poem" className="text-sm text-blue-500 hover:underline flex items-center gap-1">
                <BookOpen className="h-3 w-3" /> New poem
              </Link>
              <Link href="/admin/create-photo" className="text-sm text-blue-500 hover:underline flex items-center gap-1">
                <ImageIcon className="h-3 w-3" /> Upload photos
              </Link>
              <Link href="/admin/create-vlog" className="text-sm text-blue-500 hover:underline flex items-center gap-1">
                <Video className="h-3 w-3" /> New vlog
              </Link>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>
              Current system information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Storage</span>
                <span className="text-sm">45% used</span>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div className="bg-primary h-full w-[45%]" />
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-sm text-muted-foreground">Last Backup</span>
                <span className="text-sm">2 days ago</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">System Status</span>
                <span className="text-sm text-green-500">Operational</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 