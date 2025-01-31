'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { PlusIcon, MinusIcon } from '@radix-ui/react-icons'

type FAQItem = {
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    question: "How do I track a training session?",
    answer: "After logging in, click on the 'Track Session' button in the navigation bar. Fill in the details about your training session including duration, techniques practiced, and any notes you want to remember."
  },
  {
    question: "Can I edit or delete a training session?",
    answer: "Yes! From your dashboard, you can view all your training sessions. Each session has options to edit or delete the entry if you need to make changes."
  },
  {
    question: "How is my belt rank displayed?",
    answer: "Your belt rank is set in your profile settings. Once set, it will be displayed on your dashboard and associated with your training sessions."
  },
  {
    question: "Is my training data private?",
    answer: "Yes, your individual training data is private and can only be seen by you. The only public information is the aggregate total training time across all users shown on the landing page."
  }
]

function FAQItem({ question, answer }: FAQItem) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        className="flex w-full justify-between items-center text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-medium">{question}</span>
        {isOpen ? (
          <MinusIcon className="h-5 w-5 text-gray-500" />
        ) : (
          <PlusIcon className="h-5 w-5 text-gray-500" />
        )}
      </button>
      {isOpen && (
        <p className="mt-2 text-gray-600">
          {answer}
        </p>
      )}
    </div>
  )
}

export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6">About BJJ Tracker</h1>
      
      <div className="prose mb-12">
        <p className="text-lg text-gray-600">
          BJJ Tracker is a web application designed to help Brazilian Jiu-Jitsu practitioners track their training journey. 
          Built by Andy Dyck, this app allows users to log their training sessions, track progress, and maintain a detailed 
          record of their BJJ development. Whether you're a white belt just starting out or a seasoned black belt, 
          BJJ Tracker helps you maintain a comprehensive log of your training history.
        </p>
      </div>

      <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
      <div className="space-y-2">
        {faqs.map((faq, index) => (
          <FAQItem key={index} {...faq} />
        ))}
      </div>
    </div>
  )
} 