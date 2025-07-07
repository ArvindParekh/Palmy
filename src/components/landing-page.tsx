"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Sparkles,
  FileText,
  Users,
  FlaskConical,
  Trophy,
  ArrowRight,
  Check,
  Target,
  BarChart3,
  Star,
  Heart,
  Coffee,
  Lightbulb,
} from "lucide-react"
import { motion } from "framer-motion"
import { HeroShowcase } from "./landing/hero-showcase"
import Link from "next/link"

const features = [
  {
    icon: FileText,
    title: "Smart Templates",
    description: "Create and organize templates in folders with AI-powered suggestions and variable detection.",
    color: "from-blue-500 to-purple-600",
  },
  {
    icon: FlaskConical,
    title: "A/B Testing Lab",
    description: "Test different versions of your templates and optimize for maximum success rates.",
    color: "from-purple-500 to-pink-600",
  },
  {
    icon: Users,
    title: "Community Library",
    description: "Share and discover templates from other job seekers in your field.",
    color: "from-green-500 to-emerald-600",
  },
  {
    icon: BarChart3,
    title: "Performance Analytics",
    description: "Track your application success and get insights to improve your approach.",
    color: "from-orange-500 to-red-600",
  },
  {
    icon: Trophy,
    title: "Leaderboards",
    description: "Stay motivated with friendly competition and achievement tracking.",
    color: "from-yellow-500 to-orange-600",
  },
  {
    icon: Target,
    title: "AI Optimization",
    description: "Get personalized recommendations to improve your templates.",
    color: "from-indigo-500 to-purple-600",
  },
]

const whyWeBuiltThis = [
  {
    icon: Coffee,
    title: "We've been there too",
    description: "Countless hours spent rewriting the same cover letters and applications, hoping something would stick.",
  },
  {
    icon: Lightbulb,
    title: "There had to be a better way",
    description: "Why are we treating job applications like one-off essays instead of iterative products?",
  },
  {
    icon: Heart,
    title: "Built with love, for job seekers",
    description: "We're building the tool we wish we had during our own job searches.",
  },
]

const pricingPlans = [
  {
    name: "Beta Access",
    price: "Free",
    description: "Everything unlocked during beta",
    features: [
      "Unlimited templates & folders",
      // "A/B testing lab", 
      "Advanced analytics",
      "AI optimization",
      "Community access",
      "Priority support as early user"
    ],
    cta: "Get Beta Access",
    popular: true,
    available: true,
  },
  {
    name: "Pro",
    price: "$12/mo",
    description: "Coming after beta",
    features: [
      "Unlimited templates & folders",
      "A/B testing lab",
      "Advanced analytics",
      "AI optimization",
      "Priority support",
    ],
    cta: "Coming Soon",
    popular: false,
    available: false,
  },
  {
    name: "Team",
    price: "$39/mo",
    description: "Coming after beta",
    features: ["Everything in Pro", "Team collaboration", "Custom branding", "API access", "Dedicated support"],
    cta: "Coming Soon",
    popular: false,
    available: false,
  },
]

export function LandingPage({ loggedIn }: { loggedIn: boolean }) {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-black/80 backdrop-blur-xl">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 via-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">Palmy</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </a>
            <a
              href="#story"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Our Story
            </a>
            <a
              href="#pricing"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Pricing
            </a>
          </nav>

          <div className="flex items-center gap-3">
            {loggedIn ? (
              <Link href="/dashboard" >
                <Button
                  variant="default"
                  size="sm"
                >
                  Dashboard
                </Button>
              </Link>
            ) : (
              <>
              <Link href="/auth/sign-in" >
                <Button
                  variant="outline"
                  size="sm"
                >
                Log In
                </Button>
              </Link>
              <Link href="/auth/sign-up" >
              <Button
                variant="default"
                size="sm"
              >
                Sign Up
              </Button>
            </Link>
            </>
            )}
            
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-24 text-center">
        <div className="space-y-8 max-w-4xl mx-auto">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
              Stop rewriting the same
              <span className="from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent bg-gradient-to-r">
                {" "}
                application
              </span>
              {" "}every time
            </h1>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
              Create reusable job application templates, test what works, and apply faster. 
              Because your time is better spent preparing for interviews, not rewriting cover letters.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {loggedIn ? (
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="bg-black hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 dark:text-black text-lg px-8 py-6"
                >
                  Go to App
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            ) : (
              <Link href="/auth/sign-up">
                <Button
                  size="lg"
                  className="bg-black hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 dark:text-black text-lg px-8 py-6"
                >
                  Start Building Templates
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            )}
            {/* <Button variant="outline" size="lg" className="text-lg px-8 py-6">
              Watch Demo
            </Button> */}
          </div>

          <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              🚀 <strong>Just launched!</strong> We're looking for early users to help shape the future of job applications.
            </p>
          </div>
        </div>

        <div className="mt-20">
          <HeroShowcase />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-6 py-24">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold text-foreground">
            Everything you need to streamline your job search
          </h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            From template creation to performance tracking, we're building tools that actually help you land your next role.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card
                className="border-neutral-200 dark:border-neutral-800 hover:shadow-lg transition-all duration-300 h-full"
              >
                <CardContent className="p-8">
                  <div className="space-y-4">
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center`}
                    >
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">{feature.title}</h3>
                      <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Our Story Section */}
      <section id="story" className="bg-neutral-50 dark:bg-neutral-900/50 py-24">
        <div className="container mx-auto px-6">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-foreground">Why we built Palmy</h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Job searching is broken. We're here to fix it, one template at a time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {whyWeBuiltThis.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Card className="border-neutral-200 dark:border-neutral-800 h-full">
                  <CardContent className="p-8">
                    <div className="space-y-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <reason.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">{reason.title}</h3>
                        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">{reason.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="bg-white dark:bg-neutral-900 rounded-2xl p-8 md:p-12 shadow-lg">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h3 className="text-3xl font-bold text-foreground">Help us build something amazing</h3>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                We're just getting started, and we need your feedback to build the best possible experience. 
                Every early user helps us understand what job seekers really need. Join us on this journey—
                your input will directly shape how Palmy evolves.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                {!loggedIn && (
                  <Link href="/auth/sign-up">
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                      Be an Early User
                    </Button>
                  </Link>
                )}
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  Free to use • No credit card required
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="container mx-auto px-6 py-24">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold text-foreground">Beta pricing</h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Everything is free while we're in beta. Help us build the perfect job search tool!
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-950/30 rounded-full border border-green-200 dark:border-green-800">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-green-800 dark:text-green-200">
              Beta Access: All features unlocked
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {pricingPlans.map((plan, index) => (
            <Card
              key={index}
              className={`border-2 ${
                plan.popular ? "border-blue-500" : "border-neutral-200 dark:border-neutral-800"
              } flex flex-col relative ${!plan.available ? "opacity-75" : ""}`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white">
                  Free During Beta
                </Badge>
              )}
              {!plan.available && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-neutral-500 text-white">
                  Coming Soon
                </Badge>
              )}
              <CardContent className="p-8 flex-grow flex flex-col">
                <div className="space-y-4 flex-grow">
                  <h3 className={`text-2xl font-semibold ${!plan.available ? "text-neutral-500 dark:text-neutral-600" : "text-neutral-900 dark:text-white"}`}>
                    {plan.name}
                  </h3>
                  <p className={`text-4xl font-bold ${!plan.available ? "text-neutral-400 dark:text-neutral-600" : "text-neutral-900 dark:text-white"}`}>
                    {plan.price}
                  </p>
                  <p className="text-neutral-600 dark:text-neutral-400">{plan.description}</p>
                </div>
                <ul className="space-y-4 mt-8 pt-8 border-t border-neutral-200 dark:border-neutral-800">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <Check className={`w-5 h-5 ${!plan.available ? "text-neutral-400" : "text-green-500"}`} />
                      <span className={`${!plan.available ? "text-neutral-500 dark:text-neutral-600" : "text-neutral-800 dark:text-neutral-200"}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <div className="p-8 pt-0">
                {plan.available ? (
                  <Link href="/auth/sign-up">
                    <Button
                      size="lg"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                ) : (
                  <Button
                    size="lg"
                    disabled
                    className="w-full"
                  >
                    {plan.cta}
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-24">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-16 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-4">Ready to transform your job search?</h2>
            <p className="text-xl text-blue-100 mb-8">
              {loggedIn 
                ? "Start building your template library and never rewrite an application from scratch again." 
                : "Join our community of job seekers who are working smarter, not harder."
              }
            </p>
            {loggedIn ? (
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="bg-white hover:bg-neutral-200 text-black text-lg px-8 py-6"
                >
                  Go to Dashboard
                </Button>
              </Link>
            ) : (
              <Link href="/auth/sign-up">
                <Button
                  size="lg"
                  className="bg-white hover:bg-neutral-200 text-black text-lg px-8 py-6"
                >
                  Get Started Free
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200 dark:border-neutral-800">
        <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 via-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-foreground">Palmy</span>
          </div>
          <div className="text-sm text-neutral-600 dark:text-neutral-400 mt-4 md:mt-0">
            &copy; {new Date().getFullYear()} Palmy. Made with ❤️ for job seekers.
          </div>
        </div>
      </footer>
    </div>
  )
}
