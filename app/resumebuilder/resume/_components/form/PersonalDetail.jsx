"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResumeInfoContext } from "@/app/context/ResumeInfoContext";
import { LoaderCircle } from "lucide-react";
import React, { useContext, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { db } from "@/utils/db";
import { resumes } from "@/utils/schema";
import { eq } from "drizzle-orm";

export default function PersonalDetail({ enabledNext }) {
  const searchParams = useSearchParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [formData, setFormData] = useState(resumeInfo || {});
  const [resumeId, setResumeId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const id = window.location.pathname.split("/")[3] || searchParams.get("resumeId");
    setResumeId(id);
    console.log("🔍 Retrieved resumeId:", id);
  }, [searchParams]);

  const handleInputChange = (e) => {
    enabledNext(false);
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setResumeInfo((prev) => ({ ...prev, [name]: value }));
  };

  const onSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!resumeId) {
      toast.error("❌ Invalid resume ID");
      console.error("❌ Resume ID is missing or null:", resumeId);
      setLoading(false);
      return;
    }

    try {
      console.log("📌 Updating database with resumeId:", resumeId);
      console.log("📌 Form data:", formData);

      // Filter out empty values
      const updateData = {};
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== undefined && formData[key] !== null && formData[key] !== "") {
          updateData[key] = formData[key];
        }
      });

      if (Object.keys(updateData).length === 0) {
        toast.error("❌ No valid data to update");
        setLoading(false);
        return;
      }

      // Update database directly
      const result = await db
        .update(resumes)
        .set(updateData)
        .where(eq(resumes.resumeId, resumeId))
        .returning();

      console.log("✅ Updated Rows:", result);

      if (result.length > 0) {
        enabledNext(true);
        toast.success("✅ Details updated successfully");
      } else {
        toast.error("Failed to update");
      }
    } catch (error) {
      console.error("❌ Database update error:", error);
      toast.error("Error updating details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Personal Detail</h2>
      <p>Get started with your basic information</p>

      <form onSubmit={onSave}>
        <div className="grid grid-cols-2 mt-5 gap-3">
          <div>
            <label className="text-sm">First Name</label>
            <Input name="firstName" defaultValue={formData?.firstName} required onChange={handleInputChange} />
          </div>
          <div>
            <label className="text-sm">Last Name</label>
            <Input name="lastName" defaultValue={formData?.lastName} required onChange={handleInputChange} />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Job Title</label>
            <Input name="jobTitle" defaultValue={formData?.jobTitle} required onChange={handleInputChange} />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Address</label>
            <Input name="address" defaultValue={formData?.address} required onChange={handleInputChange} />
          </div>
          <div>
            <label className="text-sm">Phone</label>
            <Input name="phone" defaultValue={formData?.phone} required onChange={handleInputChange} />
          </div>
          <div>
            <label className="text-sm">Email</label>
            <Input name="email" defaultValue={formData?.email} required onChange={handleInputChange} />
          </div>
        </div>
        <div className="mt-3 flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
}
