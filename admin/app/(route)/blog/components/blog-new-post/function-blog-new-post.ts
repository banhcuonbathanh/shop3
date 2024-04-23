import { createBlogPost } from "../../blog-controller/controller";
import BlogSubDes from "../blog-sub-des/blog-sub-des";

async function validateAndCreateBlogPost(
  title: string,
  blogCategory: string,
  userEmail: string,
  userID: number,
  file: File | null | undefined,
  blogCategoryID: number,
  setError: (error: string) => void,

  upload_picture_blog: (
    folername: string,
    tittle: string,
    file: File[],
    serverAddress: string
  ) => Promise<string[]>
) {
  console.log(
    "admin/app/(route)/blog/components/blog-new-post/function-blog-new-post.ts validateAndCreateBlogPost"
  );
  if (title === "") {
    setError("please fill information for blog title");
    return;
  }

  if (blogCategory === "") {
    setError("please fill information for blog Category");
    return;
  }
  if (userEmail === "") {
    setError("please fill information userEmail");
    return;
  }
  if (userID === 0) {
    setError("please fill information userID");
    return;
  }

  let testL;

  if (file) {
    const imageUploadResponse = await upload_picture_blog(
      "Blog-Post",
      title,
      [file],
      "http://localhost:8888"
    );

    testL = imageUploadResponse[0];
    console.log("imageUploadResponse type:", testL);
  } else {
    setError("please select picture for blog");
    return;
  }

  const postresult = await createBlogPost(
    testL,
    title,
    blogCategory,
    blogCategoryID,
    userEmail,
    userID
  );

  return postresult;
}

export { validateAndCreateBlogPost };
