"use client";

import { useState } from "react";
import { useCreateJob } from "@/hooks/useCreateJob";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const EmployerDashboard = () => {
  const [form, setForm] = useState({
    title: "",
    company: "",
    description: "",
    location: "",
    employmentType: "",
    postedDate: "",
  });

  const { mutate: createJob, isPending } = useCreateJob();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      job_title: form.title,
      employer_name: form.company,
      job_description: form.description,
      job_location: form.location || undefined,
      job_employment_type_text: form.employmentType || undefined,
      job_posted_human_readable: form.postedDate || undefined,
    };

    createJob(payload);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <Card>
        <CardHeader>
          <CardTitle>Post a Job for Free</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Job Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Job Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="e.g. Frontend Developer"
                value={form.title}
                onChange={handleChange}
                required
              />
            </div>

            {/* Company Name */}
            <div className="space-y-2">
              <Label htmlFor="company">Company Name</Label>
              <Input
                id="company"
                name="company"
                placeholder="e.g. Pixidux Pvt Ltd"
                value={form.company}
                onChange={handleChange}
                required
              />
            </div>

            {/* Job Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Job Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe the job role, requirements, benefits, etc."
                value={form.description}
                onChange={handleChange}
                rows={5}
                required
              />
            </div>

            {/* Optional: Job Location */}
            <div className="space-y-2">
              <Label htmlFor="location">Location (optional)</Label>
              <Input
                id="location"
                name="location"
                placeholder="e.g. Remote / Bengaluru"
                value={form.location}
                onChange={handleChange}
              />
            </div>

            {/* Optional: Employment Type */}
            <div className="space-y-2">
              <Label htmlFor="employmentType">Employment Type (optional)</Label>
              <Input
                id="employmentType"
                name="employmentType"
                placeholder="e.g. Full-time / Internship"
                value={form.employmentType}
                onChange={handleChange}
              />
            </div>

            {/* Optional: Posted Date */}
            <div className="space-y-2">
              <Label htmlFor="postedDate">Posted Date (optional)</Label>
              <Input
                id="postedDate"
                name="postedDate"
                placeholder="e.g. 2 days ago"
                value={form.postedDate}
                onChange={handleChange}
              />
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Posting..." : "Post Job"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployerDashboard;
