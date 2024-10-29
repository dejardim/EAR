"use client";

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Page() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello! How can I help you with your studies today?" }
  ])
  const [inputMessage, setInputMessage] = useState("")

  const questions = [
    "What is the Pythagorean theorem?",
    "Who wrote 'To Kill a Mockingbird'?",
    "What is the chemical symbol for gold?",
    "What are the three states of matter?",
    "What is photosynthesis?",
    "Who was the first President of the United States?",
    "What is the capital of France?",
    "What is the largest planet in our solar system?",
    "What is the main function of mitochondria in a cell?",
    "What year did World War II end?"
  ]

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputMessage.trim()) {
      setMessages([...messages, { role: "user", content: inputMessage }])
      setInputMessage("")
      // Simulate assistant response
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          role: "assistant", 
          content: "I'm an AI assistant. I can try to help you with that question, but remember to verify any information with your textbooks or teachers." 
        }])
      }, 1000)
    }
  }

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* Questions Column */}
      <div className="w-full md:w-1/2 p-4 bg-white shadow-md">
        <h2 className="text-2xl font-bold mb-4">High School Questions</h2>
        <ScrollArea className="h-[calc(100vh-8rem)]">
          <ol className="list-decimal list-inside space-y-2">
            {questions.map((question, index) => (
              <li key={index} className="text-lg">{question}</li>
            ))}
          </ol>
        </ScrollArea>
      </div>

      {/* Chat Assistant Column */}
      <div className="w-full md:w-1/2 p-4 bg-gray-50 flex flex-col">
        <h2 className="text-2xl font-bold mb-4">Chat Assistant</h2>
        <ScrollArea className="flex-grow mb-4">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-start space-x-2 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <Avatar>
                    <AvatarFallback>{message.role === 'user' ? 'U' : 'A'}</AvatarFallback>
                    <AvatarImage src={message.role === 'user' ? "/user-avatar.png" : "/assistant-avatar.png"} />
                  </Avatar>
                  <div className={`rounded-lg p-3 ${message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                    {message.content}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <Input
            type="text"
            placeholder="Type your message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="flex-grow"
          />
          <Button type="submit">Send</Button>
        </form>
      </div>
    </div>
  )
}
