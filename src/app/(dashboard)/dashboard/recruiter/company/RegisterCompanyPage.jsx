"use client";

import React, { useState, useRef } from "react";
import {
  Form,
  Fieldset,
  TextField,
  Label,
  Input,
  TextArea,
  FieldError,
  Button,
  Select,
  ListBox,
} from "@heroui/react";

import { FaLocationDot, FaCloudArrowUp, FaBuilding, FaGlobe, FaUsers, FaArrowLeft } from "react-icons/fa6";
import { ChevronDown } from "@gravity-ui/icons";
import { createCompany } from "@/lib/action/company";

const textInputClass =
  "w-full bg-zinc-900/50 border border-zinc-800 text-white rounded-lg px-3 py-2.5 outline-none placeholder:text-zinc-600 focus:border-zinc-700 transition";
const selectBoxClass = "w-full flex flex-col gap-1";
const triggerClasses =
  "w-full bg-zinc-900/50 border border-zinc-800 text-white rounded-lg px-3 py-2.5 flex items-center justify-between outline-none data-[hover=true]:border-zinc-700";
const popoverClasses =
  "bg-zinc-950 border border-zinc-800 rounded-lg p-1 shadow-xl min-w-[200px]";
const listItemClasses =
  "text-zinc-300 px-3 py-2 rounded-md cursor-pointer hover:bg-zinc-900 hover:text-white outline-none data-[focused=true]:bg-zinc-900";
const textAreaClass =
  "w-full bg-zinc-900/50 border border-zinc-800 text-white rounded-lg p-3 outline-none placeholder:text-zinc-600 focus:border-zinc-700 transition resize-none";

const INDUSTRY_CATEGORIES = [
  { id: "technology", label: "Technology" },
  { id: "finance", label: "Finance / Banking" },
  { id: "healthcare", label: "Healthcare" },
  { id: "education", label: "Education" },
  { id: "design", label: "Design / Creative" },
];

const EMPLOYEE_RANGES = [
  { id: "1-10", label: "1-10 employees" },
  { id: "11-50", label: "11-50 employees" },
  { id: "51-200", label: "51-200 employees" },
  { id: "201-500", label: "201-500 employees" },
  { id: "500+", label: "500+ employees" },
];

export default function CompanyProfilePage({ recruiter, company }) {
  // Navigation & Data View States
  const [companyProfile, setCompanyProfile] = useState(company);
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);

  // Logo uploading state mechanics
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [logoUrl, setLogoUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = useRef(null);

  const handleLogoChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      if (file.size > 5 * 1024 * 1024) {
        alert("Image file size must be under 5MB");
        return;
      }

      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));

      setIsUploading(true);
      try {
        const formData = new FormData();
        formData.append("image", file);

        const response = await fetch(
          `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
          { method: "POST", body: formData }
        );
        const data = await response.json();

        if (data.success) {
          setLogoUrl(data.data.url);
        } else {
          alert("Logo upload failed. Please try again.");
          setLogoFile(null);
          setLogoPreview(null);
        }
      } catch (err) {
        alert("Network error during logo upload.");
        setLogoFile(null);
        setLogoPreview(null);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isUploading) {
      alert("Please wait for the logo to finish uploading.");
      return;
    }

    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(formData.entries());

    // Resolve human-readable option keys for the payload view
    const matchedIndustry = INDUSTRY_CATEGORIES.find(c => c.id === formValues.industryCategory)?.label || "Technology";
    const matchedRange = EMPLOYEE_RANGES.find(r => r.id === formValues.employeeCountRange)?.label || "1-10 employees";

    const companyPayload = {
      companyName: formValues.companyName,
      industry: matchedIndustry,
      websiteUrl: formValues.websiteUrl,
      location: formValues.location,
      employeeCountRange: matchedRange,
      briefDescription: formValues.briefDescription,
      logo: logoUrl || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150",
      recruiterId: recruiter.id,
    };
   setCompanyProfile(companyPayload);
    try {
      setIsRegistering(false);

      const res = await createCompany(companyPayload);
      alert("Company details registered successfully!");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // --- STATE 1: NO COMPANY REGISTERED YET VIEW ---
  if (!companyProfile && !isRegistering) {
    return (
      <div className="max-w-2xl mx-auto my-16 p-8 text-center bg-zinc-950 border border-zinc-900 rounded-xl shadow-2xl space-y-6">
        <div className="mx-auto w-16 h-16 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center text-zinc-500">
          <FaBuilding size={28} />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-white tracking-wide">No Company Profile</h2>
          <p className="text-sm text-zinc-400 max-w-md mx-auto">
            You haven't registered an organizational identity on HireLoop yet. Register a profile to start publishing job openings.
          </p>
        </div>
        <div>
          <Button
            onClick={() => setIsRegistering(true)}
            className="bg-white text-black font-semibold hover:bg-zinc-200 rounded-lg px-6 h-11 transition-all"
          >
            Register Your Company
          </Button>
        </div>
      </div>
    );
  }

  // --- STATE 2: ACTIVE COMPANY PROFILE VIEW ---
  if (companyProfile && !isRegistering) {
    return (
      <div className="max-w-3xl mx-auto my-8 bg-zinc-950 border border-zinc-900 rounded-xl shadow-2xl overflow-hidden text-slate-100">
        {/* Profile Banner */}
        <div className="h-32 bg-gradient-to-r from-zinc-900 via-zinc-900/60 to-black border-b border-zinc-900" />

        <div className="p-8 relative pt-0">
          {/* Logo Frame Adjustment */}
          <div className="absolute -top-10 left-8 w-20 h-20 bg-zinc-950 border-2 border-zinc-900 rounded-xl overflow-hidden shadow-xl p-1">
            <img
              src={companyProfile.logo}
              alt="Company logo"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          <div className="flex justify-between items-start pt-14">
            <div>
              <h1 className="text-2xl font-bold text-white tracking-wide">{companyProfile.companyName}</h1>
              <span className="inline-block mt-1 text-xs px-2.5 py-1 font-medium bg-zinc-900 border border-zinc-800 rounded-md text-zinc-400">
                {companyProfile.industry}
              </span>
            </div>
            <Button
              onClick={() => setIsRegistering(true)}
              variant="bordered"
              className="border-zinc-800 text-zinc-300 hover:bg-zinc-900 rounded-lg text-xs font-medium h-9"
            >
              Edit Details
            </Button>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 py-4 border-y border-zinc-900/80">
            <div className="flex items-center gap-3 text-zinc-400">
              <FaGlobe className="text-zinc-600 shrink-0" size={16} />
              <div className="overflow-hidden text-ellipsis whitespace-nowrap">
                <p className="text-[10px] uppercase text-zinc-600 font-bold tracking-wider">Website URL</p>
                <a
                  href={`https://${companyProfile.websiteUrl}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm hover:text-white transition"
                >
                  {companyProfile.websiteUrl}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3 text-zinc-400">
              <FaLocationDot className="text-zinc-600 shrink-0" size={16} />
              <div>
                <p className="text-[10px] uppercase text-zinc-600 font-bold tracking-wider">Headquarters</p>
                <p className="text-sm text-zinc-300">{companyProfile.location}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-zinc-400">
              <FaUsers className="text-zinc-600 shrink-0" size={16} />
              <div>
                <p className="text-[10px] uppercase text-zinc-600 font-bold tracking-wider">Company Size</p>
                <p className="text-sm text-zinc-300">{companyProfile.employeeCountRange}</p>
              </div>
            </div>
          </div>

          {/* About Information Section */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white tracking-wide">About Organization</h3>
            <p className="text-sm text-zinc-400 leading-relaxed whitespace-pre-wrap">
              {companyProfile.briefDescription}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // --- STATE 3: INTERACTIVE FORM CONTAINER REGISTRATION VIEW ---
  return (
    <div className="max-w-2xl mx-auto p-8 my-8 text-slate-100 bg-zinc-950 border border-zinc-900 rounded-xl shadow-2xl">
      {/* HEADER */}
      <div className="flex justify-between items-center pb-4 mb-6 border-b border-zinc-900">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsRegistering(false)}
            className="p-2 -ml-2 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-900 transition"
          >
            <FaArrowLeft size={14} />
          </button>
          <div>
            <h2 className="text-xl font-semibold text-white tracking-wide">
              {companyProfile ? "Update Company Details" : "Register New Company"}
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Enter your business details to start hiring on HireLoop.
            </p>
          </div>
        </div>
      </div>

      <Form onSubmit={handleSubmit} className="space-y-8">
        <Fieldset className="space-y-6 w-full">

          {/* ROW 1: COMPANY NAME & INDUSTRY */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextField
              isRequired
              name="companyName"
              defaultValue={companyProfile?.companyName || ""}
              className="flex flex-col gap-1 w-full"
            >
              <Label className="text-zinc-400 font-medium text-sm">
                Company Name
              </Label>
              <Input
                placeholder="e.g. Acme Corp"
                className={textInputClass}
              />
              <FieldError />
            </TextField>

            <Select
              className={selectBoxClass}
              name="industryCategory"
              defaultSelectedKeys={["technology"]}
            >
              <Label className="text-zinc-400 font-medium text-sm mb-1 block">
                Industry / Category
              </Label>
              <Select.Trigger className={triggerClasses}>
                <Select.Value className="text-white placeholder:text-zinc-600" />
                <Select.Indicator>
                  <ChevronDown size={16} className="text-zinc-500" />
                </Select.Indicator>
              </Select.Trigger>
              <Select.Popover className={popoverClasses}>
                <ListBox className="outline-none">
                  {INDUSTRY_CATEGORIES.map((ind) => (
                    <ListBox.Item
                      key={ind.id}
                      id={ind.id}
                      className={listItemClasses}
                      textValue={ind.label}
                    >
                      {ind.label}
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>
          </div>

          {/* ROW 2: WEBSITE URL & LOCATION */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextField
              isRequired
              name="websiteUrl"
              defaultValue={companyProfile?.websiteUrl || ""}
              className="flex flex-col gap-1 w-full"
            >
              <Label className="text-zinc-400 font-medium text-sm">
                Website URL
              </Label>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-zinc-600 text-sm font-medium select-none pointer-events-none border-r border-zinc-800 pr-2">
                  https://
                </span>
                <Input
                  placeholder="www.company.com"
                  className={`${textInputClass} pl-20`}
                />
              </div>
              <FieldError />
            </TextField>

            <TextField
              isRequired
              name="location"
              defaultValue={companyProfile?.location || ""}
              className="flex flex-col gap-1 w-full"
            >
              <Label className="text-zinc-400 font-medium text-sm">
                Location
              </Label>
              <div className="relative flex items-center">
                <FaLocationDot
                  size={14}
                  className="absolute left-3 text-zinc-600 pointer-events-none z-10"
                />
                <Input
                  placeholder="City, Country"
                  className={`${textInputClass} pl-9`}
                />
              </div>
              <FieldError />
            </TextField>
          </div>

          {/* ROW 3: EMPLOYEE COUNT RANGE & LOGO UPLOAD */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <Select
              className={selectBoxClass}
              name="employeeCountRange"
              defaultSelectedKeys={["1-10"]}
            >
              <Label className="text-zinc-400 font-medium text-sm mb-1 block">
                Employee Count Range
              </Label>
              <Select.Trigger className={triggerClasses}>
                <Select.Value className="text-white" />
                <Select.Indicator>
                  <ChevronDown size={16} className="text-zinc-500" />
                </Select.Indicator>
              </Select.Trigger>
              <Select.Popover className={popoverClasses}>
                <ListBox className="outline-none">
                  {EMPLOYEE_RANGES.map((range) => (
                    <ListBox.Item
                      key={range.id}
                      id={range.id}
                      className={listItemClasses}
                      textValue={range.label}
                    >
                      {range.label}
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>

            {/* LOGO UPLOAD BLOCK */}
            <div className="flex flex-col gap-1 w-full">
              <span className="text-zinc-400 font-medium text-sm">
                Company Logo
              </span>
              <div className="flex items-center gap-4 mt-1">
                <label className="w-14 h-14 border border-dashed border-zinc-700 hover:border-zinc-500 bg-zinc-900/40 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors group relative overflow-hidden">
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/png, image/jpeg"
                    onChange={handleLogoChange}
                    className="hidden"
                  />
                  {isUploading ? (
                    <div className="w-5 h-5 border-2 border-zinc-500 border-t-white rounded-full animate-spin" />
                  ) : logoPreview ? (
                    <img
                      src={logoPreview}
                      alt="Logo Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : companyProfile?.logo ? (
                    <img
                      src={companyProfile.logo}
                      alt="Current Logo"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FaCloudArrowUp
                      size={18}
                      className="text-zinc-400 group-hover:text-zinc-200 transition-colors"
                    />
                  )}
                </label>

                <div className="flex flex-col">
                  <span className="text-sm font-medium text-zinc-300">
                    {isUploading
                      ? "Uploading to ImgBB..."
                      : logoFile
                        ? logoFile.name
                        : "Upload image"}
                  </span>
                  {logoUrl && !isUploading && (
                    <span className="text-xs text-emerald-400 mt-0.5">
                      ✓ Uploaded successfully
                    </span>
                  )}
                  {!logoFile && (
                    <span className="text-xs text-zinc-600 mt-0.5">
                      PNG, JPG up to 5MB
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* BRIEF DESCRIPTION */}
          <TextField
            isRequired
            name="briefDescription"
            defaultValue={companyProfile?.briefDescription || ""}
            className="flex flex-col gap-1 w-full"
          >
            <Label className="text-zinc-400 font-medium text-sm">
              Brief Description
            </Label>
            <TextArea
              rows={4}
              placeholder="Tell us about your company's mission and culture..."
              className={textAreaClass}
            />
            <FieldError />
          </TextField>
        </Fieldset>

        {/* FOOTER ACTIONS */}
        <div className="flex justify-end gap-3 pt-5 border-t border-zinc-900 w-full">
          <Button
            type="button"
            variant="bordered"
            onClick={() => setIsRegistering(false)}
            className="border-zinc-800 text-zinc-400 hover:bg-zinc-900 rounded-lg px-5 font-medium h-11"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            isDisabled={loading || isUploading}
            className="bg-white text-black font-semibold hover:bg-zinc-200 rounded-lg px-6 transition-colors h-11"
          >
            {loading ? "Saving..." : isUploading ? "Uploading..." : companyProfile ? "Save Changes" : "Register Company"}
          </Button>
        </div>
      </Form>
    </div>
  );
}