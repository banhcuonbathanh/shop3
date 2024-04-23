import { NextResponse } from "next/server";
import { linkCustomer, HTTP_request_method_Get } from "@/lib/config";

const baseUrl = linkCustomer.golang_Base;

export async function GET(request: Request) {
  try {
    const response = await fetch(
      baseUrl + linkCustomer.routes_products.getAllProducts, // Update the route for getting all products
      {
        method: "GET",
        cache: "no-store"
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log(
        " this is get all product trong api link",
        baseUrl + linkCustomer.routes_products.getAllProducts
      );
      console.log(" this is get all product trong api p", data);
      return NextResponse.json({ status: "Success", data }, { status: 200 });
    } else {
      const data = await response.json();
      console.error("Received unexpected status code:", response.status, data);
      return NextResponse.json(
        { status: "Failed", message: data.message || "Unexpected error" },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error("An error occurred while retrieving products:", error);
    console.error("Products nodejs server");
    return NextResponse.json(
      { status: "Failed", message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      id,
      createdAt,
      updatedAt,
      desc,
      userEmail,
      postSlug,
      userID,
      BlogPostID,
      SourceType,
      CategoryComment,
      userName
    } = body;

    console.log(
      "this is service of blog comment api/shop_admin/blog_comments",
      body
    );

    if (
      !desc ||
      !userEmail ||
      !userID ||
      !BlogPostID ||
      !SourceType ||
      !CategoryComment ||
      !userName
    ) {
      return new NextResponse(
        "Blog comment details are incomplete. All fields (desc, userEmail, userID, BlogPostID, SourceType, CategoryComment, userName) are required",
        {
          status: 400
        }
      );
    }

    console.log(
      " this is jsonnnnnnnnn",
      JSON.stringify({
        id,
        createdAt,
        updatedAt,
        desc,
        userEmail,
        postSlug,
        userID,
        BlogPostID,
        SourceType,
        CategoryComment,
        userName
      })
    );
    const response = await fetch(
      `${linkCustomer.golang_Base}${linkCustomer.routes_blog_comments.create}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id,
          createdAt,
          updatedAt,
          desc,
          userEmail,
          postSlug,
          userID,
          BlogPostID,
          SourceType,
          CategoryComment,
          userName
        })
      }
    );
  } catch (error) {
    console.error("An error occurred while creating the product:", error);
    return new NextResponse(
      JSON.stringify({ status: "Failed", message: "Internal server error" }),
      { status: 500 }
    );
  }
}
