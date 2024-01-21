"use client";
import { Button, InputField } from "@/components";
import { get, post } from "@/config";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({ title: "" });
  const router = useRouter();
  const handleInput = (event: any) => {
    const { value, name } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleForm = async () => {
    const { data } = await post("groups", formData);
    if (data.status == "success") router.back();
  };

  return (
    <main className="flex flex-col items-start gap-4">
      <p className="font-bold text-2xl">Create Group</p>
      <InputField name="title" title="Group Name" onChange={handleInput} />
      <Button
        title="Create"
        onClick={() => {
          handleForm();
        }}
      />
    </main>
  );
}
