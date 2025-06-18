"use client";

import { Loader2, PlusSquare } from "lucide-react";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { db } from "../../../utils/db";
import { resumes } from "../../../utils/schema";

export default function AddResume() {
  const [openDialog, setOpenDialog] = useState(false);
  const [resumeTitle, setResumeTitle] = useState("");
  const { user, isLoaded } = useUser();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onCreate = async () => {
    setLoading(true);

    try {
      if (!isLoaded || !user?.primaryEmailAddress?.emailAddress) {
        console.error("User data not ready");
        setLoading(false);
        return;
      }

      const resumeId = uuidv4();

      const fullName =
        user.fullName ||
        user.username ||
        user.primaryEmailAddress.emailAddress.split("@")[0] ||
        "User";

      const [newResume] = await db
        .insert(resumes)
        .values({
          title: resumeTitle,
          resumeId,
          userEmail: user.primaryEmailAddress.emailAddress,
          userName: fullName,
          firstName: "",
          lastName: "",
          address: "",
          jobTitle: "",
          phone: "",
          email: "",
          summary: "",
        })
        .returning({ resumeId: resumes.resumeId });

      router.push(
        `/resumebuilder/resume/${newResume.resumeId}/edit?resumeId=${newResume.resumeId}`
      );
    } catch (error) {
      console.error("Error creating resume:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div
        className="p-14 py-24 border items-center flex justify-center bg-secondary rounded-lg h-[300px] w-[292px] hover:scale-105 transition-all hover:shadow-md cursor-pointer border-dashed"
        onClick={() => setOpenDialog(true)}
      >
        <PlusSquare />
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Resume</DialogTitle>
            <DialogDescription>
              <p>Add a title for your new resume</p>
              <Input
                className="my-2"
                placeholder="Ex. Full Stack Resume"
                onChange={(e) => setResumeTitle(e.target.value)}
              />
            </DialogDescription>
            <div className="flex justify-end gap-5">
              <Button onClick={() => setOpenDialog(false)} variant="ghost">
                Cancel
              </Button>
              <Button disabled={!resumeTitle || loading} onClick={onCreate}>
                {loading ? <Loader2 className="animate-spin" /> : "Create"}
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}