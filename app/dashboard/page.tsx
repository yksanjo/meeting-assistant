import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Calendar, Users, FileText, CheckCircle, Clock, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const stats = [
    {
      title: 'Upcoming Meetings',
      value: '12',
      change: '+2',
      icon: <Calendar className="h-5 w-5" />,
      color: 'bg-blue-500/10 text-blue-700',
    },
    {
      title: 'Team Members',
      value: '24',
      change: '+4',
      icon: <Users className="h-5 w-5" />,
      color: 'bg-green-500/10 text-green-700',
    },
    {
      title: 'Action Items',
      value: '18',
      change: '-3',
      icon: <CheckCircle className="h-5 w-5" />,
      color: 'bg-purple-500/10 text-purple-700',
    },
    {
      title: 'Notes Created',
      value: '47',
      change: '+12',
      icon: <FileText className="h-5 w-5" />,
      color: 'bg-orange-500/10 text-orange-700',
    },
  ]

  const upcomingMeetings = [
    {
      id: 1,
      title: 'Weekly Team Sync',
      time: 'Today, 10:00 AM',
      project: 'Product Development',
      participants: 8,
      status: 'scheduled',
    },
    {
      id: 2,
      title: 'Client Review - JPMorgan',
      time: 'Tomorrow, 2:00 PM',
      project: 'Enterprise Partnership',
      participants: 5,
      status: 'scheduled',
    },
    {
      id: 3,
      title: 'Sprint Planning',
      time: 'Jan 22, 11:00 AM',
      project: 'Engineering',
      participants: 12,
      status: 'scheduled',
    },
    {
      id: 4,
      title: 'Fundraising Update',
      time: 'Jan 23, 3:00 PM',
      project: 'i-GENTIC',
      participants: 6,
      status: 'scheduled',
    },
  ]

  const recentActionItems = [
    {
      id: 1,
      title: 'Prepare investor deck',
      assignee: 'You',
      dueDate: 'Today',
      priority: 'high',
      project: 'MCP Discovery',
    },
    {
      id: 2,
      title: 'Review partnership agreement',
      assignee: 'Sarah Chen',
      dueDate: 'Tomorrow',
      priority: 'medium',
      project: 'Panasonic',
    },
    {
      id: 3,
      title: 'Schedule demo with Discord',
      assignee: 'Alex Johnson',
      dueDate: 'Jan 25',
      priority: 'high',
      project: 'Enterprise Sales',
    },
    {
      id: 4,
      title: 'Update community program',
      assignee: 'You',
      dueDate: 'Jan 26',
      priority: 'medium',
      project: 'Human Unicorn Pod',
    },
  ]

  const teams = [
    {
      id: 1,
      name: 'Enterprise BD',
      description: 'JPMorgan, Discord, Panasonic partnerships',
      memberCount: 8,
      meetingCount: 24,
    },
    {
      id: 2,
      name: 'Fundraising',
      description: 'i-GENTIC & MCP Discovery',
      memberCount: 4,
      meetingCount: 18,
    },
    {
      id: 3,
      name: 'Community',
      description: 'Human Unicorn Pod & Programs',
      memberCount: 6,
      meetingCount: 32,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground">
                Welcome back! Here's what's happening with your meetings.
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" asChild>
                <Link href="/meetings/new">
                  <Calendar className="mr-2 h-4 w-4" />
                  New Meeting
                </Link>
              </Button>
              <Button asChild>
                <Link href="/teams/new">
                  <Users className="mr-2 h-4 w-4" />
                  Create Team
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <div className="mt-2 flex items-baseline">
                      <p className="text-3xl font-bold">{stat.value}</p>
                      <span className="ml-2 text-sm font-medium text-green-600">
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div className={`rounded-lg p-3 ${stat.color}`}>
                    {stat.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column - Meetings & Teams */}
          <div className="lg:col-span-2 space-y-8">
            {/* Upcoming Meetings */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Upcoming Meetings</CardTitle>
                    <CardDescription>
                      Your scheduled meetings for the next 7 days
                    </CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/meetings">View All</Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingMeetings.map((meeting) => (
                    <div
                      key={meeting.id}
                      className="flex items-center justify-between rounded-lg border p-4 hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex items-start gap-4">
                        <div className="rounded-lg bg-blue-500/10 p-2">
                          <Calendar className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{meeting.title}</h3>
                          <div className="mt-1 flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {meeting.time}
                            </span>
                            <span>•</span>
                            <span>{meeting.project}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {meeting.participants} people
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/meetings/${meeting.id}`}>View</Link>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Teams */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Your Teams</CardTitle>
                    <CardDescription>
                      Teams you're a member of
                    </CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/teams">View All</Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  {teams.map((team) => (
                    <Card key={team.id} className="border-2">
                      <CardContent className="p-6">
                        <div className="mb-4 flex items-center justify-between">
                          <div className="rounded-lg bg-primary/10 p-2">
                            <Users className="h-5 w-5 text-primary" />
                          </div>
                          <span className="rounded-full bg-green-500/10 px-2 py-1 text-xs font-medium text-green-700">
                            Active
                          </span>
                        </div>
                        <h3 className="font-semibold">{team.name}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {team.description}
                        </p>
                        <div className="mt-4 flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">
                            {team.memberCount} members
                          </span>
                          <span className="text-muted-foreground">
                            {team.meetingCount} meetings
                          </span>
                        </div>
                        <Button className="mt-4 w-full" size="sm" asChild>
                          <Link href={`/teams/${team.id}`}>Open Team</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Action Items & Quick Actions */}
          <div className="space-y-8">
            {/* Action Items */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Action Items</CardTitle>
                    <CardDescription>
                      Tasks assigned to you
                    </CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/action-items">View All</Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActionItems.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-lg border p-4 hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{item.title}</h4>
                            <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                              item.priority === 'high'
                                ? 'bg-red-500/10 text-red-700'
                                : 'bg-yellow-500/10 text-yellow-700'
                            }`}>
                              {item.priority}
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {item.project} • Due {item.dueDate}
                          </p>
                          <p className="mt-2 text-sm">
                            Assigned to: <span className="font-medium">{item.assignee}</span>
                          </p>
                        </div>
                        <Button size="sm" variant="outline">
                          Mark Done
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Common tasks and shortcuts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full justify-start" variant="outline" asChild>
                    <Link href="/meetings/new">
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule Meeting
                    </Link>
                  </Button>
                  <Button className="w-full justify-start" variant="outline" asChild>
                    <Link href="/notes/new">
                      <FileText className="mr-2 h-4 w-4" />
                      Take Quick Note
                    </Link>
                  </Button>
                  <Button className="w-full justify-start" variant="outline" asChild>
                    <Link href="/ai/summarize">
                      <TrendingUp className="mr-2 h-4 w-4" />
                      AI Summary Tool
                    </Link>
                  </Button>
                  <Button className="w-full justify-start" variant="outline" asChild>
                    <Link href="/export">
                      <FileText className="mr-2 h-4 w-4" />
                      Export Reports
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* AI Assistant */}
            <Card className="bg-gradient-to-br from-primary/5 to-primary/10">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="mx-auto mb-4 inline-flex rounded-full bg-primary/20 p-3">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 font-semibold">AI Meeting Assistant</h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Let AI help summarize meetings, extract action items, and generate insights.
                  </p>
                  <Button className="w-full" asChild>
                    <Link href="/ai/assistant">
                      Try AI Assistant
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}