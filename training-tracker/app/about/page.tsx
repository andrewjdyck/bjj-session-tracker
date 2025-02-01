'use client'

import { useState } from 'react'
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
    answer: "Not yet. This feature is coming soon."
  },
  {
    question: "Can I import or export my training data?",
    answer: "Not yet, but this is a key feature to enable learning from the community."
  },
  {
    question: "Is my training data private?",
    answer: "Yes, your individual training data is private and can only be seen by you. However, your training data is aggregated across all users to analyze the training habits of the community that are most likely to leading to success in the sport and provide coaching advice (future feature)."
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
          BJJ Tracker is a web application designed to help Jiu-Jitsu practitioners track their training journey. The goal of the project is to 
          collect training data from the community from people with many different skill levels, training styles, and goals, which can then be 
          analyzed to generate coaching advice tailored to each individual, prevent pre-mature quitting, and grow the sport.
        </p>
        <br />
        <p className="text-lg text-gray-600">
          This app is built by <a href="https://www.andrewdyck.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline font-bold">Andy Dyck</a>. 
          If you find this app useful, please consider supporting the project by <a href="https://www.buymeacoffee.com/andrewjdyck" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline font-bold">buying me a coffee</a>.
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