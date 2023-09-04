"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";

export interface Post {
  prompt: string;
  tag: string;
}

function CreatePrompt() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState<Post>({
    prompt: "",
    tag: "",
  });
  const { data: session } = useSession();
  const handleSetPost = function (newFormData: Post) {
    setPost(newFormData);
  };
  const createPrompt = async function (e: Event) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user ? session.user.id : "",
          tag: post.tag,
        }),
      });
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div>
      <Form
        type="Create"
        post={post}
        setFormData={handleSetPost}
        handleSubmit={createPrompt}
        submitting={submitting}
      />
    </div>
  );
}

export default CreatePrompt;
