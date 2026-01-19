import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, Brain, Users, Calendar, FileText, Shield, Zap } from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  const features = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: 'AI-Powered Summaries',
      description: 'Automatically generate meeting summaries with DeepSeek AI',
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Team Collaboration',
      description: 'Manage multiple teams and projects with role-based access',
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      title: 'Smart Scheduling',
      description: 'Sync with calendars and optimize meeting times',
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: 'Action Tracking',
      description: 'Extract and track action items with owners and due dates',
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Enterprise Ready',
      description: 'GDPR compliant with enterprise-grade security',
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: 'Real-time Updates',
      description: 'Live collaboration with real-time updates',
    },
  ]

  const useCases = [
    {
      title: 'Enterprise BD Teams',
      description: 'Perfect for JPMorgan, Discord, Panasonic partnership workflows',
      color: 'bg-blue-500/10 text-blue-700',
    },
    {
      title: 'Startup Fundraising',
      description: 'Track i-GENTIC & MCP Discovery fundraising meetings',
      color: 'bg-green-500/10 text-green-700',
    },
    {
      title: 'Community Pods',
      description: 'Human Unicorn Pod planning and coordination',
      color: 'bg-purple-500/10 text-purple-700',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <Brain className="mr-2 h-4 w-4" />
            Powered by DeepSeek AI
          </div>
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            AI-Powered{' '}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Meeting Assistant
            </span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Transform your meetings with AI-powered summaries, action tracking, and team collaboration.
            Built for enterprise BD teams, startup fundraising, and community pods.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" asChild className="gap-2">
              <Link href="/dashboard">
                Get Started Free
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#features">View Features</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Everything You Need for Productive Meetings
          </h2>
          <p className="mb-12 text-lg text-muted-foreground">
            From AI-powered summaries to enterprise-grade collaboration
          </p>
        </div>
        <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index} className="group transition-all hover:shadow-lg">
              <CardHeader>
                <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3 text-primary">
                  {feature.icon}
                </div>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Perfect For Your Workflow
          </h2>
          <p className="mb-12 text-lg text-muted-foreground">
            Trusted by teams across industries
          </p>
        </div>
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {useCases.map((useCase, index) => (
            <Card key={index} className="border-0 shadow-lg">
              <CardHeader>
                <div className={`mb-4 inline-flex rounded-lg ${useCase.color} px-4 py-2`}>
                  <span className="font-semibold">{useCase.title}</span>
                </div>
                <CardDescription className="text-base">{useCase.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-4xl rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5 p-8 text-center md:p-12">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to Transform Your Meetings?
          </h2>
          <p className="mb-8 text-lg text-muted-foreground">
            Join teams from JPMorgan, Discord, Panasonic, and more
          </p>
          <Button size="lg" asChild className="gap-2">
            <Link href="/dashboard">
              Start Free Trial
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <p className="mt-4 text-sm text-muted-foreground">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-background py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold">Meeting Assistant</h3>
              <p className="text-sm text-muted-foreground">
                AI-powered meeting management for teams
              </p>
            </div>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                Terms
              </Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                Contact
              </Link>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Meeting Assistant. Built with ❤️ by yksanjo.
          </div>
        </div>
      </footer>
    </div>
  )
}