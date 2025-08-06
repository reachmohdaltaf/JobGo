'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Briefcase, Pencil, Trash2 } from 'lucide-react'
import React from 'react'
import { useRouter } from 'next/navigation'
import { useAllCompanies } from '@/hooks/useAllCompanies'
import axiosInstance from '@/lib/axios'

const CompanyPage = () => {
  const router = useRouter()

  const { data: companies, isLoading, isError, refetch } = useAllCompanies()

  const handleRedirect = () => {
    router.push('/company/create')
  }

  const handleEdit = (id: string) => {
    router.push(`/company/edit/${id}`)
  }

  const handleDelete = async (id: string) => {
    try {
      await axiosInstance.delete(`/company/delete/${id}`)
      refetch()
    } catch (error) {
      console.log(error)
    }
  }

  if (isLoading) {
    return <p className="text-center mt-10">Loading companies...</p>
  }

  if (isError) {
    return <p className="text-center mt-10 text-red-500">Failed to load companies.</p>
  }

  return (
    <div className="flex flex-col h-full items-start  gap-6 p-6">
      <h1 className='text-2xl font-bold'>Explore Companies</h1>
      {companies && companies.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {companies.map((company: any) => (
            <Card
              key={company.id}
              className="p-6 shadow-md border border-muted bg-card flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-bold mb-1 text-primary">{company.name}</h2>
                <p className="text-muted-foreground mb-1">
                  <strong>Industry:</strong> {company.industry}
                </p>
                <p className="text-muted-foreground mb-1">
                  <strong>Location:</strong> {company.location}
                </p>
                <p className="text-muted-foreground">{company.description}</p>
              </div>

              <div className="flex justify-end mt-4 gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleEdit(company.id)}
                  className="flex items-center gap-1"
                >
                  <Pencil className="w-4 h-4" />
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(company.id)}
                  className="flex items-center gap-1"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </Button>
              </div>
            </Card>
          ))}
         
        </div>
      ) : (
        <Card className="flex mt-20 flex-col items-center justify-center gap-4 p-10">
          <Briefcase className="text-primary w-16 h-16" />
          <h1 className="text-2xl font-bold text-center">Post a job For Free</h1>
          <Button variant="outline" onClick={handleRedirect}>
            Create Company
          </Button>
        </Card>
      )}
    </div>
  )
}

export default CompanyPage
