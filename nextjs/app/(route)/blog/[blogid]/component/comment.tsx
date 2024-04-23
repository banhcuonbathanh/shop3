"use client";

import Link from "next/link";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { BlogComment, CategoryBlog, Post, UserBlog } from "@/types";
import { Button } from "@/components/ui/button";
import { createBlogCommentController } from "../../blog-controller/controller";
import ListComment from "./list-commnet";

interface CommentsProps {
  postSlug: number;
  BlogPostID: number | undefined;
  CategoryComment: string | undefined;
  // onNewComment: (newComment: string) => void; // Add this line
}

const Comments = ({
  postSlug,
  BlogPostID,
  CategoryComment
}: // onNewComment
CommentsProps) => {
  const session = useSession();

  const [error, setError] = useState("");

  const [desc, setDesc] = useState("");

  const handleSubmit = async () => {
    setError("");
  
    if (desc === "") {
      setError("comment not input");

      return;
    }
    if (
      session.data?.user.useremail &&
      session.data?.user.userID &&
      BlogPostID &&
      CategoryComment
    ) {
      await createBlogCommentController(
        desc,
        session.data?.user.useremail,
        "postSlug",
        Number(session.data?.user.userID),
        BlogPostID,
        CategoryComment,

        session.data?.user.useremail
      );

      // onNewComment(desc);
    } else {
      // Handle the case where desc is undefined (e.g., display an error message)
    }
  };

  return (
    <div className="mt-8">
      <h1 className="text-gray-500 mb-4 text-lg">Comments</h1>

      <div className="flex items-center gap-4 w-full">
        <textarea
          placeholder="write a comment..."
          className="p-4 border border-gray-300 rounded w-full"
          onChange={(e) => {
            setError("");
            setDesc(e.target.value);
          }}
        />

        <Button
          className="px-6 py-4 bg-teal-500 text-white font-semibold rounded cursor-pointer mb-6"
          onClick={handleSubmit}
        >
          Send
        </Button>
      </div>

      {error !== "" && <p className="text-center mt-6">{error}</p>}

      <ListComment />
    </div>
  );
};

export default Comments;
