import { linkCustomer, link_internal } from "@/lib/config";
import { BlogCategory, BlogComment, BlogPost } from "@/types";
import axios from "axios";
import toast from "react-hot-toast";
type ProductFormValues = {
  name: string;
  images: string[];
  price: number;
  CategoryName: string;
  ColorName: string;
  SizeName: string;
  isFeatured?: boolean | undefined;
  isArchived?: boolean | undefined;
};

const fetchOneProductByName = async (name: string): Promise<boolean> => {
  // console.log("this is inside fetchOneProductByName controller", name);
  try {
    const response = await axios.get(
      `${linkCustomer.golang_Base}${linkCustomer.routes_products.findProductsByName}?name=${name}`
    );

    // console.log(
    //   "this is inside fetchOneProductByName controller data ",
    //   response.data.data
    // );
    const dataFromserver = response.data.data;
    if (Array.isArray(dataFromserver) && dataFromserver.length === 0) {
      return false; // Product found, return true
    } else {
      // Handle other response status codes or conditions
      return true; // Product not found, return false
    }
  } catch (error) {
    // Handle any network or request-related errors
    console.error("An error occurred:", error);
    return false; // An error occurred, return false
  }
};
//------------
const createBlogCategory = async (
  Slug: string,
  Title: string,
  ImageUrl: string
) => {
  console.log("admin/app/(route)/blog/blog-controller/controller.ts apiUrl ");
  const apiUrl =
    linkCustomer.golang_Base +
    linkCustomer.routes_blog_categories.createBlogCategory;
  console.log(
    "admin/app/(route)/blog/blog-controller/controller.ts apiUrl ",
    apiUrl
  );
  // console.log("createBlogCategory blog/blog-controller/controller.ts", apiUrl);
  try {
    const formdata = {
      slug: Slug,
      title: Title,
      imageUrl: ImageUrl,

      blogPostID: 0
    };
    // Create the request body

    // Send the POST request using Axios
    const response = await axios.post(apiUrl, formdata);

    const test = response.data.status;
    console.log(
      "admin/app/(route)/blog/blog-controller/controller.ts test ",
      test
    );
  } catch (error) {
    // Handle other potential errors, such as network issues
    console.error("Error creating blog category:", error);
    throw { message: "Error creating blog category" };
  }
};

// ------
async function getAllBlogCategory(): Promise<BlogCategory[]> {
  // Validate and sanitize input data (replace with your validation logic)
  const apiUrl =
    linkCustomer.golang_Base +
    linkCustomer.routes_blog_categories.getAllBlogCategories;

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
const onSubmitControllerToCreateProduct = async (
  data: ProductFormValues,

  link_pic_onserver: string[]
) => {
  // Check if the product is available in the database
  const isProductAvailable = await fetchOneProductByName(data.name);

  if (isProductAvailable) {
    // Product exists, handle accordingly
    // console.log("Product already exists");
    toast.success("Product exists");
  } else {
    // Product doesn't exist, proceed to create it

    const formdata = {
      name: data.name,
      ImageUrls: link_pic_onserver,
      Price: data.price,
      CategoryId: data.CategoryName,
      ColorId: data.ColorName,
      SizeId: data.SizeName,
      IsFeatured: data.isFeatured,
      IsArchived: data.isArchived,
      OrderItem: []
    };

    const postUrl = link_internal.routes_shop_admin_products.productid;

    try {
      // Make a POST request to create the product
      const responseData = await axios.post(`${postUrl}`, formdata);

      // Handle the response data, and update the UI as needed
      // (e.g., redirect to a different page, show a success message)
      // ...

      // Example:
      // router.refresh();
      // router.push(
      //   `http://localhost:3000/${link_internal.routes_shop_admin_products_not_api.productid}`
      // );
      // toast.success(toastMessage);
    } catch (error) {
      // Handle any errors that may occur during the POST request
      console.error("An error occurred:", error);
      toast.error("Something went wrong.");
    }
  }
};

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
const createBlogPost = async (
  ImageUrl: string,
  Title: string,
  CategoryTitle: string,

  BlogCatID: number,

  UserEmail: string,
  // Array of BlogComment objects (assuming BlogComment interface exists)
  UserId: number
) => {
  // Validate and sanitize input data (replace with your validation logic)
  const apiUrl =
    linkCustomer.golang_Base + linkCustomer.routes_blogs.createBlog;
  console.log(
    "3.admin_cloth_nextjs13/app/shop_admin/(dashboard)/(route)/blog/blog-controller/controller.ts CategoryTitle",
    CategoryTitle
  );
  try {
    const formdata = {
      ImageUrl: ImageUrl,
      Title: Title,

      CategoryTitle: CategoryTitle,
      BlogCatID: BlogCatID,

      Views: 0,

      UserEmail: UserEmail,

      UserId: UserId
    };

    const test1 = "http://localhost:8888/api/blog-posts";
    // Create the request body

    // Send the POST request using Axios
    const response = await axios.post(test1, formdata);
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

//------------
const createSubDesList1 = async (blogSubDes: any) => {
  // Validate and sanitize input data (replace with your validation logic)
  const apiUrl =
    linkCustomer.golang_Base + linkCustomer.routes_blog_sub_des.saveList;

  try {
    const formdata = {
      blogSubList: blogSubDes
    };

    // Create the request body

    // Send the POST request using Axios
    const response = await axios.post(apiUrl, formdata);
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

const createBlogCommentController = async (
  des: string,
  userEmail: string,
  postSlug: string,
  userID: number,
  BlogPostID: number,
  CategoryComment: string
) => {
  const baseUrl = linkCustomer.golang_Base;

  const linkPostComment = baseUrl + linkCustomer.routes_blog_comments.create;

  try {
    const formdata = {
      desc: des,
      userEmail: userEmail,
      postSlug: postSlug,
      userID: userID,
      BlogPostID: BlogPostID,
      SourceType: "web",
      CategoryComment: CategoryComment
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

export {
  createBlogCommentController,
  createSubDesList1,
  createBlogPost,
  getAllBlogCategory,
  createBlogCategory,
  onSubmitControllerToCreateProduct,
  deleteImageControllerProduct
};
