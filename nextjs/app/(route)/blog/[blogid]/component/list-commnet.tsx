import { Button } from "@/components/ui/button";
import { BlogComment } from "@/types";
import React from "react";

// const ListComment = ({ blogComments }: { blogComments: BlogComment[] }) => {

const ListComment = () => {
  const blogComments: BlogComment[] = [
    {
      id: 1,
      createdAt: new Date("2024-04-01T10:30:00Z"),
      updatedAt: new Date("2024-04-02T15:45:00Z"),
      desc: "Great article! I learned a lot.",
      userEmail: "user1@example.com",
      postSlug: "my-awesome-post",
      userID: 123,
      BlogPostID: 456,
      SourceType: "Web",
      CategoryComment: "General",
      userName: "Alice"
    },
    {
      id: 2,
      createdAt: new Date("2024-04-03T08:20:00Z"),
      desc: "Interesting perspective. Thanks for sharing!",
      userEmail: "user2@example.com",
      userID: 789,
      BlogPostID: 456,
      SourceType: "Mobile",
      CategoryComment: "Opinion",
      userName: "Bob"
    }
    // Add more comments here...
  ];

  // You can iterate through the array and display each comment as needed.

  return blogComments.map((blogComment) => (
    <div className="flex flex-col mt-8" key={blogComment.id}>
      <p className="text-base font-normal">{blogComment.desc}</p>
      <span className="font-semibold mx-4">
        {blogComment.userName ? blogComment.userName : "anonymous"}
      </span>

      <span className="text-sm text-gray-500 mx-4 border-l">
        {blogComment.createdAt?.toString()}

        {
          <div className="p-10">
            {blogComments.map((blogComment) => (
              <div className="flex flex-col mt-8" key={blogComment.id}>
                <p className="text-base font-normal">{blogComment.desc}</p>
                <span className="font-semibold mx-4">
                  {blogComment.userName ? blogComment.userName : "anonymous"}
                </span>

                <span className="text-sm text-gray-500 mx-4">
                  {blogComment.createdAt?.toString()}
                </span>
              </div>
            ))}

            <div className="flex items-center gap-4 w-full mt-6">
              <textarea
                placeholder="write a comment..."
                className="p-4 border border-gray-300 rounded w-full"
                onChange={(e) => {
                  // setError("");
                  // setDesc(e.target.value);
                }}
              />

              <Button
                className="px-6 py-4 bg-teal-500 text-white font-semibold rounded cursor-pointer mb-6"
                onClick={() => {}}
              >
                Send
              </Button>
            </div>
          </div>
        }
      </span>
    </div>
  ));
};

export default ListComment;
