'use client'
import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useCreateCompany } from '@/hooks/useCreateCompany'

const CreateCompany = () => {
  const [formData, setFormData] = useState({
    name: '',
    industry: '',
    location: '',
    description: ''
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const {mutate: createCompany} = useCreateCompany()
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async () => {
    setLoading(true)
    setMessage('')
    createCompany(formData)
  }

  return (
    <div className="max-w-md mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-center">Create Company</h1>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Company Name *</Label>
          <Input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter company name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="industry">Industry *</Label>
          <Input
            id="industry"
            name="industry"
            type="text"
            value={formData.industry}
            onChange={handleInputChange}
            placeholder="Enter industry"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location *</Label>
          <Input
            id="location"
            name="location"
            type="text"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="Enter location"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter company description (optional)"
            rows={3}
          />
        </div>

        <Button 
          onClick={handleSubmit}
          disabled={loading || !formData.name || !formData.industry || !formData.location}
          className="w-full"
        >
          {loading ? 'Creating...' : 'Create Company'}
        </Button>

        {message && (
          <p className={`text-sm text-center ${
            message.includes('successfully') ? 'text-green-600' : 'text-red-600'
          }`}>
            {message}
          </p>
        )}
      </div>
    </div>
  )
}

export default CreateCompany