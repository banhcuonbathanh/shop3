import { NextResponse, NextRequest } from "next/server";

import {
  linkCustomer,
  HTTP_request_method_Get,
  HTTP_request_method_Delete
} from "@/lib/config";

const baseUrl = linkCustomer.golang_Base;

export async function GET(req: NextRequest, res: NextResponse) {
  const id = req.body;

  try {
    console.log(" this is inside shop admin component route");
    console.log(baseUrl + linkCustomer.routes_categories.findCategoryById + id);
    const response = await fetch(
      baseUrl + linkCustomer.routes_categories.findCategoryById + id,
      HTTP_request_method_Get
    );
    console.log("response");
    console.log(await response.json());
    console.log(response);
    if (response.ok) {
      console.log(" this is inside shop admin component route okokokokokkkok");
      const data = await response.json();

      return new NextResponse(JSON.stringify(data), {
        status: 200,
        headers: {
          "Content-Type": "application/json" // Set the appropriate content type
        }
      });
    } else {
      const data = await response.json();
      console.error("Received unexpected status code:", response.status, data);
      return NextResponse.json(
        { status: "Failed", message: data.message || "Unexpected error" },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error("An error occurred while retrieving categories:", error);
    console.error("Categories nodejs server");
    return NextResponse.json(
      { status: "Failed", message: "Internal server error" },
      { status: 500 }
    );
  }
}
// export async function GET(
//   req: Request,
//   { params }: { params: { categoryId: string } }
// ) {
//   try {
//     if (!params.categoryId) {
//       return new NextResponse("Category id is required", { status: 400 });
//     }

//     // Make a GET request to retrieve the category by its ID
//     const response = await fetch(
//       `${link.golang_Base}${link.routes_categories.findCategoryById}${params.categoryId}`,
//       HTTP_request_method_Get
//     );

//     if (response.ok) {
//       const category = await response.json();
//       return NextResponse.json(category, { status: 200 });
//     } else {
//       const data = await response.json();
//       console.error("Received unexpected status code:", response.status, data);
//       return NextResponse.json(
//         { status: "Failed", message: data.message || "Unexpected error" },
//         { status: response.status }
//       );
//     }
//   } catch (error) {
//     console.log("[CATEGORY_GET]", error);
//     return new NextResponse("Internal error", { status: 500 });
//   }
// }

export async function DELETE(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  console.log(" this is delete category component 11");
  try {
    if (!params.categoryId) {
      return new NextResponse("Category id is required", { status: 400 });
    }
    console.log(" this is delete category component 22");
    // Make a DELETE request to delete the category by its ID
    const response = await fetch(
      `${linkCustomer.golang_Base}${linkCustomer.routes_categories.deleteCategory}${params.categoryId}`,
      HTTP_request_method_Delete
    );
    console.log(
      `${linkCustomer.golang_Base}${linkCustomer.routes_categories.deleteCategory}${params.categoryId}`
    );
    console.log(" this is delete category component 33");

    if (response.ok) {
      console.log(" this is delete category component 44");
      const category = await response.json();
      return NextResponse.json(category, { status: 200 });
    } else {
      console.log(" this is delete category component 55");
      const data = await response.json();
      console.error("Received unexpected status code:", response.status, data);
      return NextResponse.json(
        { status: "Failed", message: data.message || "Unexpected error" },
        { status: response.status }
      );
    }
  } catch (error) {
    console.log("[CATEGORY_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    // Assuming you have implemented the 'auth()' function
    console.log(" this is inside category patchvASDLFKJALKSJFD111111");
    const body = await req.json();
    console.log(" this is inside category patchvASDLFKJAL222222");
    const { Name } = body;
    console.log(" this is inside category patchvASDLFKJAL3333333");
    console.log(Name);
    // Add your authentication logic here
    // const { userId } = auth();
    // if (!userId) {
    //   return new NextResponse("Unauthenticated", { status: 403 });
    // }

    if (!Name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    console.log(" this is inside category patchvAS444444444");
    if (!params.categoryId) {
      return new NextResponse("Category id is required", { status: 400 });
    }
    console.log(" this is inside category patchvASDLFKJALKSJFD");
    console.log(
      `${linkCustomer.golang_Base}${linkCustomer.routes_categories.updateCategory}${params.categoryId}`
    );
    // Make a PATCH request to update the category by its ID
    const response = await fetch(
      `${linkCustomer.golang_Base}${linkCustomer.routes_categories.updateCategory}${params.categoryId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ Name }) // Send the updated name
      }
    );

    if (response.ok) {
      const category = await response.json();
      return NextResponse.json(category, { status: 200 });
    } else {
      const data = await response.json();
      console.error("Received unexpected status code:", response.status, data);
      return NextResponse.json(
        { status: "Failed", message: data.message || "Unexpected error" },
        { status: response.status }
      );
    }
  } catch (error) {
    console.log("[CATEGORY_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
