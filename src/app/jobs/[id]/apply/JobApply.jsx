"use client";

import React from "react";
import { Card, Button, TextField, Label, Input, FieldError } from "@heroui/react";
import { FiSend } from "react-icons/fi";

const JobApply = ({ job, applicant }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-zinc-950 px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <Card className="bg-zinc-900 border border-zinc-800">
          <Card.Header className="border-b border-zinc-800 pb-5">
            <Card.Title className="text-2xl font-bold text-white">
              Apply for {job?.jobTitle}
            </Card.Title>
            <Card.Description className="text-zinc-400 mt-1">
              Submit your application and get one step closer to your next opportunity.
            </Card.Description>
          </Card.Header>

          <Card.Content className="py-8">
            <form id="job-apply-form" onSubmit={handleSubmit} className="space-y-6">
              <TextField name="resume" isRequired>
                <Label>Resume Link</Label>
                <Input placeholder="Google Drive / Dropbox resume URL" />
                <FieldError />
              </TextField>

              <TextField name="portfolio">
                <Label>Portfolio</Label>
                <Input placeholder="https://yourportfolio.com" />
                <FieldError />
              </TextField>

              <TextField name="message" className="w-full">
                <Label>Message</Label>
                <Input placeholder="Write a short message to the recruiter..." />
                <FieldError />
              </TextField>
            </form>
          </Card.Content>

          <Card.Footer className="border-t border-zinc-800 flex justify-end">
            <Button
              type="submit"
              form="job-apply-form"
              color="primary"
              startContent={<FiSend />}
            >
              Submit Application
            </Button>
          </Card.Footer>
        </Card>
      </div>
    </div>
  );
};

export default JobApply;