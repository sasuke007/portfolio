"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export function ContactForm() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Message sent!",
      description: "Thank you for your message. I'll get back to you soon.",
    })

    setIsSubmitting(false)
    e.currentTarget.reset()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 stagger-children">
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium text-gray-300">
          Name
        </label>
        <Input
          id="name"
          name="name"
          placeholder="Your name"
          required
          className="bg-dark-100 border-border/50 focus:border-primary transition-all duration-300 focus:shadow-glow"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-gray-300">
          Email
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Your email"
          required
          className="bg-dark-100 border-border/50 focus:border-primary transition-all duration-300 focus:shadow-glow"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="subject" className="text-sm font-medium text-gray-300">
          Subject
        </label>
        <Input
          id="subject"
          name="subject"
          placeholder="Subject of your message"
          required
          className="bg-dark-100 border-border/50 focus:border-primary transition-all duration-300 focus:shadow-glow"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium text-gray-300">
          Message
        </label>
        <Textarea
          id="message"
          name="message"
          placeholder="Your message"
          rows={5}
          required
          className="bg-dark-100 border-border/50 focus:border-primary transition-all duration-300 focus:shadow-glow"
        />
      </div>
      <Button
        type="submit"
        className="w-full bg-gradient-glow hover:opacity-90 transition-opacity hover-scale"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <span className="flex items-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Sending...
          </span>
        ) : (
          "Send Message"
        )}
      </Button>
    </form>
  )
}
