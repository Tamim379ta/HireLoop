"use client";

import React, { useState } from "react";
import {
  Form,
  Fieldset,
  TextField,
  Label,
  Input,
  TextArea,
  Dropdown,
  FieldError,
  Button,
  Switch,
} from "@heroui/react";

import {
  FaBriefcase,
  FaMoneyBillWave,
  FaGlobe,
  FaFileLines,
  FaCloudArrowUp,
} from "react-icons/fa6";
import { createJob } from "@/lib/action/job";

const WEB_JOB_CATEGORIES = [
  { id: "frontend", label: "Frontend Engineer" },
  { id: "backend", label: "Backend Engineer" },
  { id: "fullstack", label: "Fullstack Engineer" },
  { id: "ui-ux", label: "UI/UX Designer" },
  { id: "devops", label: "DevOps / Infrastructure" },
  { id: "product-web", label: "Web Product Manager" },
];

const EMPLOYMENT_TYPES = [
  { id: "full-time", label: "Full-time" },
  { id: "part-time", label: "Part-time" },
  { id: "contract", label: "Contract" },
  { id: "internship", label: "Internship" },
];

const CURRENCIES = [
  { id: "bdt", label: "BDT (৳)" },
  { id: "usd", label: "USD ($)" },
  { id: "eur", label: "EUR (€)" },
  { id: "gbp", label: "GBP (£)" },
  { id: "cad", label: "CAD ($)" },
];

export default function PostJobPage() {
  const [companyInfo] = useState({
    name: "TechNova Solutions LLC",
    id: "comp_847392",
    isApproved: true,
  });

  const [isRemote, setIsRemote] = useState(false);
  const [loading, setLoading] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("Select a Category");
  const [selectedType, setSelectedType] = useState("Select Employment Type");
  const [selectedCurrency, setSelectedCurrency] = useState("Select Currency");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!companyInfo.isApproved) {
      alert("Your company profile must be approved before publishing jobs.");
      return;
    }

    if (
      selectedCategory === "Select a Category" ||
      selectedType === "Select Employment Type" ||
      selectedCurrency === "Select Currency"
    ) {
      alert("Please ensure all dropdowns (Category, Type, and Currency) are selected.");
      return;
    }

    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(formData.entries());

    const jobPayload = {
      jobTitle: formValues.jobTitle,
      jobCategory: formValues.jobCategory,
      jobType: formValues.jobType,
      minSalary: formValues.salaryMin,
      maxSalary: formValues.salaryMax,
      currency: formValues.currency,
      location: isRemote ? "Remote" : formValues.location,
      deadline: formValues.deadline,
      responsibilities: formValues.responsibilities,
      requirements: formValues.requirements,
      benefits: formValues.benefits || "",
      isRemote: isRemote,
      companyId: companyInfo.id,
      status: "active",
      isPubliclyVisible: true,
    };

    try {
      const res = await createJob(jobPayload);
      alert("Job posted successfully!");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 my-8 text-slate-100">
      <Form onSubmit={handleSubmit} className="space-y-8">
        {/* COMPANY CARD */}
        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl flex items-center justify-between backdrop-blur">
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider">
              Publishing Organization
            </p>
            <p className="text-sm font-medium text-slate-200">
              {companyInfo.name}
            </p>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium border ${
              companyInfo.isApproved
                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                : "bg-rose-500/10 text-rose-400 border-rose-500/30"
            }`}
          >
            {companyInfo.isApproved ? "Verified" : "Pending"}
          </span>
        </div>

        {/* CLASSIFICATION FIELDSET */}
        <Fieldset className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 space-y-6 backdrop-blur">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <FaBriefcase className="text-indigo-400" />
            <legend className="text-lg font-bold text-white">
              Job Classification Details
            </legend>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextField isRequired name="jobTitle">
              <Label className="text-slate-300">Job Title</Label>
              <Input className="bg-slate-950 border-slate-800 text-white" />
              <FieldError />
            </TextField>

            <TextField isRequired type="date" name="deadline" className="flex flex-col gap-1 w-full">
              <Label className="text-slate-300 font-medium text-sm">Application Deadline</Label>
              <Input className="bg-slate-950 border-slate-800 text-white h-10" />
              <FieldError />
            </TextField>

            {/* JOB CATEGORY DROPDOWN */}
            <div className="flex flex-col gap-2">
              <Label className="text-slate-300 text-sm font-medium">Job Category</Label>
              <input type="hidden" name="jobCategory" value={selectedCategory} />
              <Dropdown>
                <Button
                  aria-label="Job Category Menu"
                  variant="secondary"
                  className="w-full bg-slate-950 border border-slate-800 text-slate-300 justify-between text-left h-10"
                >
                  {selectedCategory}
                </Button>
                <Dropdown.Popover>
                  <Dropdown.Menu onAction={(key) => setSelectedCategory(String(key))}>
                    {WEB_JOB_CATEGORIES.map((cat) => (
                      <Dropdown.Item id={cat.label} key={cat.id} textValue={cat.label}>
                        <Label>{cat.label}</Label>
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown.Popover>
              </Dropdown>
            </div>

            {/* EMPLOYMENT TYPE DROPDOWN */}
            <div className="flex flex-col gap-2">
              <Label className="text-slate-300 text-sm font-medium">Employment Type</Label>
              <input type="hidden" name="jobType" value={selectedType} />
              <Dropdown>
                <Button
                  aria-label="Employment Type Menu"
                  variant="secondary"
                  className="w-full bg-slate-950 border border-slate-800 text-slate-300 justify-between text-left h-10"
                >
                  {selectedType}
                </Button>
                <Dropdown.Popover>
                  <Dropdown.Menu onAction={(key) => setSelectedType(String(key))}>
                    {EMPLOYMENT_TYPES.map((type) => (
                      <Dropdown.Item id={type.label} key={type.id} textValue={type.label}>
                        <Label>{type.label}</Label>
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown.Popover>
              </Dropdown>
            </div>
          </div>

          {/* LOCATION & REMOTE TOGGLE */}
          <div className="space-y-4 bg-slate-950/40 p-4 border border-slate-800/80 rounded-xl">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm text-slate-300 font-medium">
                <FaGlobe className="text-indigo-400" />
                Workplace Option
              </span>

              <Switch
                isSelected={isRemote}
                onChange={setIsRemote}
                size="sm"
              >
                <Switch.Control className="bg-zinc-800 data-[selected=true]:bg-white">
                  <Switch.Thumb className="bg-zinc-400 data-[selected=true]:bg-black" />
                </Switch.Control>
                <Switch.Content>
                  <Label className="text-xs text-zinc-400 font-medium">Remote</Label>
                </Switch.Content>
              </Switch>
            </div>

            <TextField
              name="location"
              isRequired={!isRemote}
              className="flex flex-col gap-1 w-full relative"
            >
              <Label className="text-slate-400 text-sm">Job Location</Label>
              <div className="relative flex items-center">
                <FaGlobe
                  size={16}
                  className="absolute left-3 text-zinc-500 pointer-events-none z-10"
                />
                <Input
                  placeholder={isRemote ? "Global / Remote" : "e.g. Austin, TX"}
                  disabled={isRemote}
                  className="bg-slate-950 border-slate-800 text-white w-full pl-10"
                />
              </div>
              <FieldError />
            </TextField>
          </div>

          {/* SALARY */}
          <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl space-y-4">
            <p className="text-sm font-semibold flex items-center gap-2 text-slate-200">
              <FaMoneyBillWave className="text-indigo-400" />
              Compensation Range
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <TextField isRequired name="salaryMin">
                <Label className="text-slate-400">Min</Label>
                <Input type="number" className="bg-slate-950 border-slate-800 text-white h-10" />
                <FieldError />
              </TextField>

              <TextField isRequired name="salaryMax">
                <Label className="text-slate-400">Max</Label>
                <Input type="number" className="bg-slate-950 border-slate-800 text-white h-10" />
                <FieldError />
              </TextField>

              {/* CURRENCY DROPDOWN */}
              <div className="flex flex-col gap-2">
                <Label className="text-slate-400 text-sm font-medium">Currency</Label>
                <input type="hidden" name="currency" value={selectedCurrency} />
                <Dropdown>
                  <Button
                    aria-label="Currency Menu"
                    variant="secondary"
                    className="w-full bg-slate-950 border border-slate-800 text-slate-300 justify-between text-left h-10 min-h-10"
                  >
                    {selectedCurrency}
                  </Button>
                  <Dropdown.Popover>
                    <Dropdown.Menu onAction={(key) => setSelectedCurrency(String(key))}>
                      {CURRENCIES.map((curr) => (
                        <Dropdown.Item id={curr.label} key={curr.id} textValue={curr.label}>
                          <Label>{curr.label}</Label>
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown.Popover>
                </Dropdown>
              </div>
            </div>
          </div>
        </Fieldset>

        {/* DESCRIPTION FIELDSET */}
        <Fieldset className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 space-y-6 backdrop-blur">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <FaFileLines className="text-indigo-400" />
            <legend className="text-lg font-bold text-white">
              Job Description
            </legend>
          </div>

          <TextField isRequired name="responsibilities">
            <Label className="text-slate-300">Responsibilities</Label>
            <TextArea className="bg-slate-950 border-slate-800 text-white" />
            <FieldError />
          </TextField>

          <TextField isRequired name="requirements">
            <Label className="text-slate-300">Requirements</Label>
            <TextArea className="bg-slate-950 border-slate-800 text-white" />
            <FieldError />
          </TextField>

          <TextField name="benefits">
            <Label className="text-slate-300">Benefits</Label>
            <TextArea className="bg-slate-950 border-slate-800 text-white" />
          </TextField>
        </Fieldset>

        {/* ACTIONS */}
        <div className="flex justify-end gap-4">
          <Button type="button" variant="secondary">
            Cancel
          </Button>
          <Button type="submit" isDisabled={loading || !companyInfo.isApproved}>
            {loading ? (
              "Processing..."
            ) : (
              <>
                <FaCloudArrowUp />
                Publish Job
              </>
            )}
          </Button>
        </div>
      </Form>
    </div>
  );
}