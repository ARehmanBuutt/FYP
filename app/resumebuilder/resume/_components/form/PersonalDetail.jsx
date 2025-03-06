"use client";

import { Button } from "../../../../../components/ui/button";
import { Input } from "../../../../../components/ui/input";
import { ResumeInfoContext } from "../../../../context/ResumeInfoContext";
import { LoaderCircle } from "lucide-react";
import React, { useContext, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { db } from "../../../../../utils/db";
import { resumes } from "../../../../../utils/schema";
import { eq } from "drizzle-orm";

export default function PersonalDetail({ enabledNext }) {
  const searchParams = useSearchParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [resumeId, setResumeId] = useState(null);
  const [formData, setFormData] = useState({}); // Ensure formData starts empty
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const id = window.location.pathname.split("/")[3] || searchParams.get("resumeId");
    if (id) {
      setResumeId(id);
      console.log("🔍 Retrieved resumeId:", id);
      fetchPersonalDetails(id);
    }
  }, [searchParams]);

  const fetchPersonalDetails = async (id) => {
    try {
      const result = await db.select().from(resumes).where(eq(resumes.resumeId, id));
      if (result.length > 0) {
        const data = result[0];
        setFormData(data); // Update formData with fetched data
        setResumeInfo((prev) => ({ ...prev, ...data }));
        console.log("✅ Fetched Personal Details:", data);
      } else {
        console.log("❌ No existing personal details found.");
      }
    } catch (error) {
      console.error("❌ Error fetching personal details:", error);
    }
  };

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

      const updateData = Object.fromEntries(
        Object.entries(formData).filter(([_, value]) => value !== "" && value !== null && value !== undefined)
      );

      if (Object.keys(updateData).length === 0) {
        toast.error("❌ No valid data to update");
        setLoading(false);
        return;
      }

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
            <Input placeholder="James" name="firstName" required value={formData.firstName || ""} onChange={handleInputChange} />
          </div>
          <div>
            <label className="text-sm">Last Name</label>
            <Input placeholder="Carter" name="lastName" required value={formData.lastName || ""} onChange={handleInputChange} />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Job Title</label>
            <Input placeholder="Full Stack Developer" required name="jobTitle" value={formData.jobTitle || ""} onChange={handleInputChange} />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Address</label>
            <Input placeholder="525 N tryon Street, NC 28117" required name="address" value={formData.address || ""} onChange={handleInputChange} />
          </div>
          <div>
            <label className="text-sm">Phone</label>
            <Input placeholder="(123)-456-7890" required name="phone" value={formData.phone || ""} onChange={handleInputChange} />
          </div>
          <div>
            <label className="text-sm">Email</label>
            <Input placeholder="exmaple@gmail.com" required name="email" value={formData.email || ""} onChange={handleInputChange} />
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