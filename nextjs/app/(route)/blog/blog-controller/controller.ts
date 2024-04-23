import { linkCustomer, link_internal } from "@/lib/config";
import { BlogCategory, BlogComment, BlogPost } from "@/types";
import axios from "axios";
import toast from "react-hot-toast";

//------------

// ------
async function getAllBlogCategory(): Promise<BlogCategory[]> {
  // Validate and sanitize input data (replace with your validation logic)
  const apiUrl =
    linkCustomer.golang_Base + linkCustomer.routes_blogs.findAllBlogs;

  try {
    // Assuming the API endpoint requires an empty body for GET requests:
    const response = await axios.get(apiUrl); // Change to `axios.post` if necessary

    // Ensure the response code indicates success and handle appropriate content types:
    // (Adapt this logic based on your actual API response structure)
    if (response.status !== 200 || !response.data || !response.data.data) {
      throw new Error(
        "Error fetching blog categories: " + response.data.message ||
          "Unknown error"
      );
    }

    // Cast the retrieved data to `BlogCategory[]` based on your API response format:
    const blogCategories = response.data.data as BlogCategory[];
    // console.log(
    //   "getAllBlogCategory blog/blog-controller/controller.ts blogCategories",
    //   blogCategories
    // );
    return blogCategories; // Return the array of BlogCategory objects
  } catch (error) {
    // Handle other potential errors, such as network issues:
    console.error("Error fetching blog categories:", error);
    throw { message: "Error fetching blog categories" }; // Rethrow with descriptive message
  }
}

//------

const extractFilePath = (url: string) => {
  const parsedURL = new URL(url);
  const pathArray = parsedURL.pathname.split("/").slice(2).join("/"); // Extract from the third segment
  return pathArray;
};

const deleteImageControllerProduct = async (deleteImageLink: string[]) => {
  console.log("deleteImageControllerProduct");

  for (const imageFileToDelete of deleteImageLink) {
    try {
      const path = extractFilePath(imageFileToDelete);
      console.log("deleteImageControllerProduct path", path);
      const response = await axios.delete(
        `${linkCustomer.golang_Base}/deleteImage?file=uploads/${path}`
      );
      console.log("deleteImageControllerProduct filename", path);
      if (response.status === 200) {
        console.error(`success to delete the image /uploads/`);
        return true;
      } else {
        console.error(`Failed to delete the image /uploads/`);
        return false;
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }
};

//------------

const createBlogCommentController = async (
  des: string,
  userEmail: string,
  postSlug: string,
  userID: number,
  BlogPostID: number,
  CategoryComment: string,

  UserName: string
) => {
  const baseUrl = linkCustomer.golang_Base;

  const linkPostComment = baseUrl + linkCustomer.routes_blog_comments.create;
  console.log(
    "nextjs/app/(route)/blog/blog-controller/controller.ts",
    linkPostComment
  );
  try {
    const formdata = {
      desc: des,
      userEmail: userEmail,
      postSlug: postSlug,
      userID: userID,
      BlogPostID: BlogPostID,
      SourceType: "web",
      CategoryComment: CategoryComment,
      userName:UserName
    };

    // Create the request body

    // Send the POST request using Axios
    const response = await axios.post(linkPostComment, formdata);

    console.log(
      "nextjs/app/(route)/blog/blog-controller/controller.ts response ccomment.data",
      response.data
    );
    // console.log(
    //   " createBlogPost 3.admin_cloth_nextjs13/app/shop_admin/(dashboard)/(route)/blog/blog-controller/controller.ts response.data",
    //   response.data.data
    // );
    const test = response.data.data;

    return test;
  } catch (error) {
    // Handle other potential errors, such as network issues
    console.error("Error creating blog category:", error);
    throw { message: "Error creating blog category" };
  }
};
const FindAllCommentsByPostIDController = async (blogId: string) => {
  const baseUrl = linkCustomer.golang_Base;

  const linkPostComment =
    baseUrl + linkCustomer.routes_blog_comments.FindAllCommentsByPostIDFE;

  try {
    const formdata = {
      blogId: blogId
    };

    // Create the request body

    // Send the POST request using Axios
    const response = await axios.post(linkPostComment, formdata);
    // console.log(
    //   " createBlogPost 3.admin_cloth_nextjs13/app/shop_admin/(dashboard)/(route)/blog/blog-controller/controller.ts response.data",
    //   response.data.data
    // );
    const test = response.data.data;

    return test;
  } catch (error) {
    // Handle other potential errors, such as network issues
    console.error("Error creating blog category:", error);
    throw { message: "Error creating blog category" };
  }
};

const get_blog_post = async (): Promise<BlogPost[]> => {
  try {
    const response = await fetch(
      linkCustomer.golang_Base + linkCustomer.routes_blog_posts.getAll,
      {
        method: "GET",
        cache: "no-store"
      }
    );

    const data = await response.json();

    return data.data; // Returning the parsed JSON data
  } catch (error) {
    console.error("Error fetching billboard:", error);
    throw error; // Propagate the error to the caller
  }
};
export {
  FindAllCommentsByPostIDController,
  createBlogCommentController,
  getAllBlogCategory,
  deleteImageControllerProduct,
  get_blog_post
};
