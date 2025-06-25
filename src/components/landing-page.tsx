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
} from "lucide-react"

interface LandingPageProps {
  onLogin: () => void
}

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
    description: "Access thousands of proven templates from top performers in your industry.",
    color: "from-green-500 to-emerald-600",
  },
  {
    icon: BarChart3,
    title: "Performance Analytics",
    description: "Track success rates, response times, and get AI insights to improve your applications.",
    color: "from-orange-500 to-red-600",
  },
  {
    icon: Trophy,
    title: "Leaderboards",
    description: "Compete with other job seekers and unlock achievements as you improve.",
    color: "from-yellow-500 to-orange-600",
  },
  {
    icon: Target,
    title: "AI Optimization",
    description: "Get personalized recommendations to improve your templates based on industry data.",
    color: "from-indigo-500 to-purple-600",
  },
]

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Software Engineer at Google",
    content: "Increased my interview rate by 340% using optimized templates. The A/B testing feature is game-changing.",
    avatar: "SC",
    rating: 5,
  },
  {
    name: "Marcus Rodriguez",
    role: "Product Manager at Stripe",
    content: "The community templates gave me insights I never would have thought of. Landed my dream job in 3 weeks.",
    avatar: "MR",
    rating: 5,
  },
  {
    name: "Emily Zhang",
    role: "Designer at Figma",
    content:
      "Finally, a tool that actually helps you get better at job applications. The analytics are incredibly detailed.",
    avatar: "EZ",
    rating: 5,
  },
]

const pricingPlans = [
  {
    name: "Starter",
    price: "Free",
    description: "Perfect for getting started",
    features: ["5 templates per folder", "3 folders maximum", "Basic analytics", "Community access"],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: "$12/mo",
    description: "For serious job seekers",
    features: [
      "Unlimited templates & folders",
      "A/B testing lab",
      "Advanced analytics",
      "AI optimization",
      "Priority support",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Team",
    price: "$39/mo",
    description: "For teams and agencies",
    features: ["Everything in Pro", "Team collaboration", "Custom branding", "API access", "Dedicated support"],
    cta: "Contact Sales",
    popular: false,
  },
]

export function LandingPage({ onLogin }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-black/80 backdrop-blur-xl">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-neutral-900 dark:text-white">Templates</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              Features
            </a>
            <a
              href="#testimonials"
              className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              Testimonials
            </a>
            <a
              href="#pricing"
              className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              Pricing
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
            <Button
              onClick={onLogin}
              className="bg-black hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 dark:text-black"
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-24">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <div className="space-y-4">
            <Badge variant="secondary" className="text-sm px-4 py-2">
              🚀 Join 10,000+ job seekers who landed their dream roles
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold text-neutral-900 dark:text-white leading-tight">
              Job applications that
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}
                actually work
              </span>
            </h1>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
              Create, test, and optimize job application templates with AI-powered insights. Increase your interview
              rate by up to 340%.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={onLogin}
              size="lg"
              className="bg-black hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 dark:text-black text-lg px-8 py-6"
            >
              Start Building Templates
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6">
              Watch Demo
            </Button>
          </div>

          <div className="flex items-center justify-center gap-8 text-sm text-neutral-500 dark:text-neutral-400">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>Free to start</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>Setup in 2 minutes</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-6 py-24">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold text-neutral-900 dark:text-white">
            Everything you need to land your next role
          </h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            From template creation to performance analytics, we've got every part of your job search covered.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-neutral-200 dark:border-neutral-800 hover:shadow-lg transition-all duration-300"
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
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center space-y-2">
            <div className="text-4xl font-bold text-neutral-900 dark:text-white">340%</div>
            <div className="text-neutral-600 dark:text-neutral-400">Average interview rate increase</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-4xl font-bold text-neutral-900 dark:text-white">10,000+</div>
            <div className="text-neutral-600 dark:text-neutral-400">Job seekers using Templates</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-4xl font-bold text-neutral-900 dark:text-white">50,000+</div>
            <div className="text-neutral-600 dark:text-neutral-400">Templates created</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-4xl font-bold text-neutral-900 dark:text-white">87%</div>
            <div className="text-neutral-600 dark:text-neutral-400">Success rate improvement</div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="container mx-auto px-6 py-24">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold text-neutral-900 dark:text-white">Loved by job seekers everywhere</h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-400">
            See how Templates helped others land their dream jobs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-neutral-200 dark:border-neutral-800">
              <CardContent className="p-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">"{testimonial.content}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">{testimonial.avatar}</span>
                    </div>
                    <div>
                      <div className="font-medium text-neutral-900 dark:text-white">{testimonial.name}</div>
                      <div className="text-sm text-neutral-600 dark:text-neutral-400">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="container mx-auto px-6 py-24">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold text-neutral-900 dark:text-white">Simple, transparent pricing</h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-400">
            Choose the plan that's right for your job search
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <Card
              key={index}
              className={`border-neutral-200 dark:border-neutral-800 relative ${
                plan.popular ? "ring-2 ring-blue-500 scale-105" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-500 hover:bg-blue-500 text-white">Most Popular</Badge>
                </div>
              )}
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">{plan.name}</h3>
                    <p className="text-neutral-600 dark:text-neutral-400">{plan.description}</p>
                  </div>

                  <div className="space-y-1">
                    <div className="text-4xl font-bold text-neutral-900 dark:text-white">{plan.price}</div>
                    {plan.price !== "Free" && (
                      <div className="text-sm text-neutral-600 dark:text-neutral-400">per month, billed annually</div>
                    )}
                  </div>

                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-neutral-600 dark:text-neutral-400">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={onLogin}
                    className={`w-full ${
                      plan.popular
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white"
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-24">
        <div className="text-center space-y-8 max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-neutral-900 dark:text-white">Ready to land your dream job?</h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-400">
            Join thousands of job seekers who've already transformed their application process with Templates.
          </p>
          <Button
            onClick={onLogin}
            size="lg"
            className="bg-black hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 dark:text-black text-lg px-8 py-6"
          >
            Start Building Templates
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200 dark:border-neutral-800">
        <div className="container mx-auto px-6 py-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-neutral-900 dark:text-white">Templates</span>
            </div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400">© 2024 Templates. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
