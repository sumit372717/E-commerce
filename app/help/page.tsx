"use client";

import { useState } from "react";
import Link from "next/link";

// FAQ data
const faqs = [
  {
    category: "Orders",
    questions: [
      {
        q: "How do I place an order?",
        a: "Simply browse our products, add items to your cart, proceed to checkout, fill in your shipping details, and complete payment. You'll receive an order confirmation email."
      },
      {
        q: "Can I modify or cancel my order?",
        a: "Orders can be modified or cancelled within 1 hour of placement. Contact our support team immediately with your order number."
      },
      {
        q: "How do I track my order?",
        a: "You can track your order using our Track Order feature. Enter your order ID and email address to check the current status."
      }
    ]
  },
  {
    category: "Shipping",
    questions: [
      {
        q: "What are your shipping options?",
        a: "We offer Standard Shipping (5-7 business days) and Express Shipping (2-3 business days). Shipping costs are calculated at checkout."
      },
      {
        q: "Do you ship internationally?",
        a: "Yes, we ship to most countries worldwide. International shipping times vary by destination."
      },
      {
        q: "How can I track my shipment?",
        a: "Once your order ships, you'll receive a tracking number via email. You can also track it on our Track Order page."
      }
    ]
  },
  {
    category: "Returns",
    questions: [
      {
        q: "What is your return policy?",
        a: "We offer a 30-day return policy for unused items in original packaging. Custom-built PCs are subject to different terms."
      },
      {
        q: "How do I initiate a return?",
        a: "Contact our support team with your order number and reason for return. We'll provide a return shipping label."
      },
      {
        q: "How long does a refund take?",
        a: "Refunds are processed within 5-7 business days after we receive the returned item."
      }
    ]
  },
  {
    category: "Custom Builds",
    questions: [
      {
        q: "How does the custom build process work?",
        a: "Use our Custom Build Wizard to select your parts. We'll build, test, and ship your custom PC within 3-5 business days."
      },
      {
        q: "Can I choose specific components?",
        a: "Yes! Our Custom Build Wizard lets you select every component from CPU to case."
      },
      {
        q: "What warranty comes with custom builds?",
        a: "Custom builds come with a 2-year warranty on all components and labour."
      }
    ]
  },
  {
    category: "Account",
    questions: [
      {
        q: "How do I create an account?",
        a: "Click on 'Sign in' in the navbar, then select 'Create account'. Fill in your details and you're ready to shop."
      },
      {
        q: "I forgot my password. What should I do?",
        a: "Contact our support team to reset your password. Password reset functionality is coming soon."
      },
      {
        q: "How do I update my profile?",
        a: "Log in to your account and navigate to the Account page. Click 'Edit Profile' to update your name and email."
      }
    ]
  }
];

// Contact support form
export default function HelpPage() {
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formMessage, setFormMessage] = useState("");

  const toggleFaq = (question: string) => {
    setOpenFaq(openFaq === question ? null : question);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("loading");
    setFormMessage("");

    try {
      const res = await fetch("/api/help", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setFormStatus("success");
        setFormMessage("✅ Your message has been sent! We'll respond within 24 hours.");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setFormStatus("error");
        setFormMessage(data.error || "Failed to send message. Please try again.");
      }
    } catch (error) {
      setFormStatus("error");
      setFormMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="font-display text-3xl font-bold text-ink">Help Centre</h1>
      <p className="text-muted mt-2">Find answers to common questions or contact our support team</p>

      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* Sidebar - Quick Links */}
        <div className="md:col-span-1">
          <div className="border border-line bg-surface p-6">
            <h3 className="font-display text-lg font-bold text-ink">Quick Links</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/track-order" className="text-sm text-trace hover:underline">
                  📦 Track My Order
                </Link>
              </li>
              <li>
                <Link href="/account" className="text-sm text-trace hover:underline">
                  👤 My Account
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-sm text-trace hover:underline">
                  🛒 View Cart
                </Link>
              </li>
              <li>
                <Link href="/custom-builds" className="text-sm text-trace hover:underline">
                  🖥️ Custom Builds
                </Link>
              </li>
            </ul>
          </div>

          <div className="mt-4 border border-line bg-surface p-6">
            <h3 className="font-display text-lg font-bold text-ink">Contact Info</h3>
            <div className="mt-4 space-y-2 text-sm text-muted">
              <p>📧 support@circuitforge.com</p>
              <p>📞 +44 (0) 1234 567890</p>
              <p>🕐 Mon-Fri: 9am - 6pm GMT</p>
            </div>
          </div>
        </div>

        {/* Main Content - FAQ */}
        <div className="md:col-span-2">
          <div className="space-y-6">
            {faqs.map((section) => (
              <div key={section.category} className="border border-line bg-surface p-6">
                <h3 className="font-display text-xl font-bold text-ink">{section.category}</h3>
                <div className="mt-4 space-y-3">
                  {section.questions.map((faq, index) => (
                    <div key={index}>
                      <button
                        onClick={() => toggleFaq(`${section.category}-${index}`)}
                        className="flex w-full justify-between items-center text-left text-ink hover:text-trace"
                      >
                        <span className="font-medium">{faq.q}</span>
                        <span className="text-xl">
                          {openFaq === `${section.category}-${index}` ? '−' : '+'}
                        </span>
                      </button>
                      {openFaq === `${section.category}-${index}` && (
                        <div className="mt-2 pl-4 border-l-2 border-trace">
                          <p className="text-muted text-sm">{faq.a}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="mt-8 border border-line bg-surface p-6">
            <h3 className="font-display text-xl font-bold text-ink">Contact Support</h3>
            <p className="text-sm text-muted mt-1">Can&apos;t find what you&apos;re looking for? Send us a message.</p>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-ink">Your Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1 w-full border border-line bg-base px-4 py-2 text-ink focus:border-trace"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-1 w-full border border-line bg-base px-4 py-2 text-ink focus:border-trace"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-ink">Subject</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="mt-1 w-full border border-line bg-base px-4 py-2 text-ink focus:border-trace"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-ink">Message</label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="mt-1 w-full border border-line bg-base px-4 py-2 text-ink focus:border-trace resize-none"
                  required
                />
              </div>

              {formMessage && (
                <p className={`text-sm ${formStatus === "success" ? "text-green-600" : "text-red-600"}`}>
                  {formMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={formStatus === "loading"}
                className="w-full bg-trace px-6 py-3 text-base font-semibold hover:opacity-80 disabled:opacity-50"
              >
                {formStatus === "loading" ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}