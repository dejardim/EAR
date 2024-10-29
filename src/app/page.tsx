"use client";

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export default function Page() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello! How can I help you with your studies today?" }
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [selectedAnswers, setSelectedAnswers] = useState({})

  const questions = [
    {
      question: "What is the Pythagorean theorem?",
      options: [
        "a² + b² = c²",
        "E = mc²",
        "F = ma",
        "πr²"
      ],
      correctAnswer: "a² + b² = c²"
    },
    {
      question: "Who wrote 'To Kill a Mockingbird'?",
      options: [
        "Ernest Hemingway",
        "Harper Lee",
        "F. Scott Fitzgerald",
        "John Steinbeck"
      ],
      correctAnswer: "Harper Lee"
    },
    {
      question: "What is the chemical symbol for gold?",
      options: [
        "Ag",
        "Fe",
        "Au",
        "Cu"
      ],
      correctAnswer: "Au"
    },
    {
      question: "What are the three states of matter?",
      options: [
        "Liquid, gas, plasma",
        "Solid, liquid, gas",
        "Solid, liquid, plasma",
        "Gas, plasma, solid"
      ],
      correctAnswer: "Solid, liquid, gas"
    },
    {
      question: "What is photosynthesis?",
      options: [
        "The process of water cycle",
        "The process by which plants make their own food",
        "The process of rock formation",
        "The process of animal digestion"
      ],
      correctAnswer: "The process by which plants make their own food"
    },
    {
      question: "Who was the first President of the United States?",
      options: [
        "Thomas Jefferson",
        "John Adams",
        "George Washington",
        "Benjamin Franklin"
      ],
      correctAnswer: "George Washington"
    },
    {
      question: "What is the capital of France?",
      options: [
        "London",
        "Berlin",
        "Madrid",
        "Paris"
      ],
      correctAnswer: "Paris"
    },
    {
      question: "What is the largest planet in our solar system?",
      options: [
        "Mars",
        "Jupiter",
        "Saturn",
        "Neptune"
      ],
      correctAnswer: "Jupiter"
    },
    {
      question: "What is the main function of mitochondria in a cell?",
      options: [
        "Protein synthesis",
        "Energy production",
        "Cell division",
        "Waste removal"
      ],
      correctAnswer: "Energy production"
    },
    {
      question: "What year did World War II end?",
      options: [
        "1943",
        "1944",
        "1945",
        "1946"
      ],
      correctAnswer: "1945"
    }
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

  const handleAnswerSelect = (questionIndex: number, answer: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: answer
    }))
  }

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* Questions Column */}
      <div className="w-full md:w-1/2 p-4 bg-white shadow-md overflow-auto">
        <h2 className="text-2xl font-bold mb-4">High School Questions</h2>
        <ScrollArea className="h-[calc(100vh-8rem)]">
          <ol className="list-decimal list-inside space-y-6">
            {questions.map((q, index) => (
              <li key={index} className="text-lg">
                <p className="font-semibold mb-2">{q.question}</p>

                {/* Para meu *eu* do futuro: resolver os erros de tipagem */}
                <RadioGroup
                  onValueChange={(value) => handleAnswerSelect(index, value)}
                  value={selectedAnswers[index] || ""}
                >
                  {q.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={`q${index}-option${optionIndex}`} />
                      <Label htmlFor={`q${index}-option${optionIndex}`}>{option}</Label>
                    </div>
                  ))}
                </RadioGroup>
                {selectedAnswers[index] && (
                  <p className={`mt-2 ${selectedAnswers[index] === q.correctAnswer ? 'text-green-600' : 'text-red-600'}`}>
                    {selectedAnswers[index] === q.correctAnswer ? 'Correct!' : 'Incorrect. Try again!'}
                  </p>
                )}

              </li>
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
