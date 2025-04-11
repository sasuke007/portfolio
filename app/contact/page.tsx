import type { Metadata } from "next"
import { PageHeader } from "@/components/page-header"
import { ContactForm } from "@/components/contact-form"

export const metadata: Metadata = {
  title: "Contact | John Doe",
  description: "Get in touch with John Doe for collaborations or inquiries.",
}

export default function ContactPage() {
  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <PageHeader title="Get in Touch" description="Have a question or want to work together? Send me a message." />

      <div className="grid grid-cols-1 gap-12 mt-12 md:grid-cols-2">
        <div className="space-y-6">
          <p className="text-lg text-gray-700">
            I'm always open to new opportunities, collaborations, and interesting conversations. Whether you have a
            project in mind, want to discuss a potential collaboration, or simply want to say hello, feel free to reach
            out using the contact form.
          </p>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">Email</h3>
              <p className="text-gray-500">hello@johndoe.com</p>
            </div>
            <div>
              <h3 className="text-lg font-medium">Based in</h3>
              <p className="text-gray-500">New York, NY</p>
            </div>
            <div>
              <h3 className="text-lg font-medium">Social</h3>
              <div className="flex space-x-4 mt-2">
                <a href="#" className="text-gray-500 hover:text-gray-900">
                  Twitter
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-900">
                  Instagram
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-900">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
        <ContactForm />
      </div>
    </div>
  )
}
