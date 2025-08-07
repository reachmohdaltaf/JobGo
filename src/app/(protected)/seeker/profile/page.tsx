"use client";

import { useRef, useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/getUser";
import { useUpdateUser } from "@/hooks/useUpdateUser";
import { UploadCloud } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ProfilePage = () => {
  const { data: user, isLoading, isError } = useUser();
  const { mutate, isPending } = useUpdateUser();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setBio(user.bio || "");
    }
  }, [user]);

  const handleAvatarClick = () => {
    fileInputRef.current?.click(); // Trigger hidden file input
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setPreview(imageURL);
    }
  };

  const handleUpdate = () => {
    mutate({ name, email, bio });
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-4 items-center">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[150px]" />
            <Skeleton className="h-4 w-[100px]" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent>Error loading user data</CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="w-full">
        <CardTitle className="flex justify-between items-center w-full">
          Profile
          <Button onClick={handleUpdate} disabled={isPending}>
            {isPending ? "Updating..." : "Update"}
          </Button>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex items-center gap-6">
        <div
          className="relative cursor-pointer group"
          onClick={handleAvatarClick}
        >
          <Avatar className="h-20 w-20 ring ring-ring ring-offset-2 ring-offset-background transition-all">
            <AvatarImage
              src={preview || user?.image || ""}
              alt={user?.name || "User"}
            />
            <AvatarFallback>
              {user?.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 rounded-full transition-opacity">
            <UploadCloud className="h-5 w-5 text-white" />
          </div>
        </div>

        <div className="space-y-2 w-full">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
          />
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
        </div>

        {/* Hidden File Input */}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
      </CardContent>

      <CardContent className="w-full">
        <Textarea
          placeholder="Enter your bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
      </CardContent>
    </Card>
  );
};

export default ProfilePage;
