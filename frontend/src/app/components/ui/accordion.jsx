"use client"

import { useState } from "react"

export function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <div className="divide-y border-t border-b">
      {items.map((item, index) => (
        <div key={index} className="py-4">
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="flex w-full items-center justify-between text-left font-medium"
          >
            {item.question}
            <span className={`transform transition-transform ${openIndex === index ? "rotate-180" : ""}`}>▼</span>
          </button>
          {openIndex === index && <div className="mt-2 text-gray-600">{item.answer}</div>}
        </div>
      ))}
    </div>
  )
}

