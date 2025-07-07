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
            <span className="text-xl font-bold text-foreground">Templates</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </a>
            <a
              href="#testimonials"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Testimonials
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
              Create job applications
              <span className="from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent bg-gradient-to-r">
                {" "}
                10x faster
              </span>
            </h1>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
              Stop writing the same applications over and over. Build, test, and ship winning templates with AI.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={() => {}}
              size="lg"
              className="bg-black hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 dark:text-black text-lg px-8 py-6"
            >
              {loggedIn ? "Go to App" : "Start Building"}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6">
              Watch Demo
            </Button>
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
            Everything you need to land your next role
          </h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            From template creation to performance analytics, we've got every part of your job search covered.
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
            <div className="text-4xl font-bold text-neutral-900 dark:text-white">3 weeks</div>
            <div className="text-neutral-600 dark:text-neutral-400">Average time to get hired</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-4xl font-bold text-neutral-900 dark:text-white">4.9/5</div>
            <div className="text-neutral-600 dark:text-neutral-400">User rating on ProductHunt</div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="container mx-auto px-6 py-24">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold text-foreground">Loved by top performers</h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Our users have landed jobs at some of the best companies in the world.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card
                className="border-neutral-200 dark:border-neutral-800 h-full flex flex-col"
              >
                <CardContent className="p-8 flex-grow flex flex-col">
                  <div className="flex-grow space-y-4">
                    <div className="flex items-center gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                      ))}
                    </div>
                    <p className="text-lg text-neutral-800 dark:text-neutral-200 leading-relaxed">
                      "{testimonial.content}"
                    </p>
                  </div>
                  <div className="flex items-center gap-3 pt-6 mt-6 border-t border-neutral-200 dark:border-neutral-800">
                    <div className="w-12 h-12 bg-neutral-200 dark:bg-neutral-800 rounded-full flex items-center justify-center">
                      <span className="font-bold text-neutral-600 dark:text-neutral-400">{testimonial.avatar}</span>
                    </div>
                    <div>
                      <div className="font-semibold text-neutral-900 dark:text-white">{testimonial.name}</div>
                      <div className="text-sm text-neutral-600 dark:text-neutral-400">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="bg-neutral-50 dark:bg-neutral-900/50 py-24">
        <div className="container mx-auto px-6">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-foreground">Choose your plan</h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Simple, transparent pricing. No hidden fees.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {pricingPlans.map((plan, index) => (
              <Card
                key={index}
                className={`border-2 ${
                  plan.popular ? "border-blue-500" : "border-neutral-200 dark:border-neutral-800"
                } flex flex-col`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white">
                    Most Popular
                  </Badge>
                )}
                <CardContent className="p-8 flex-grow flex flex-col">
                  <div className="space-y-4 flex-grow">
                    <h3 className="text-2xl font-semibold text-neutral-900 dark:text-white">{plan.name}</h3>
                    <p className="text-4xl font-bold text-neutral-900 dark:text-white">{plan.price}</p>
                    <p className="text-neutral-600 dark:text-neutral-400">{plan.description}</p>
                  </div>
                  <ul className="space-y-4 mt-8 pt-8 border-t border-neutral-200 dark:border-neutral-800">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-green-500" />
                        <span className="text-neutral-800 dark:text-neutral-200">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <div className="p-8 pt-0">
                  <Button
                    size="lg"
                    className={`w-full ${
                      plan.popular
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "bg-black hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 dark:text-black"
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-24">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-16 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-4">Ready to get started?</h2>
            <p className="text-xl text-blue-100 mb-8">
              {loggedIn ? "Go to your dashboard and start building better job applications today." : "Create an account and start building better job applications today."}
            </p>
            <Button
                onClick={() => {}}
              size="lg"
              className="bg-white hover:bg-neutral-200 text-black text-lg px-8 py-6"
            >
              {loggedIn ? "Go to App" : "Sign Up for Free"}
            </Button>
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
            <span className="text-lg font-bold text-foreground">Templates</span>
          </div>
          <div className="text-sm text-neutral-600 dark:text-neutral-400 mt-4 md:mt-0">
            &copy; {new Date().getFullYear()} Templates, Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
