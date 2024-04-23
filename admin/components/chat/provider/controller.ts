import axios from "axios";

import { linkCustomer } from "@/lib/config";

const createRoomController = async (roomName: string) => {
  const linktest =
    linkCustomer.golang_Base + linkCustomer.routes_chat.createRoom;

  console.log(
    "3.admin_cloth_nextjs13/app/shop/chat/provider/controller.ts",
    linktest
  );
  try {
    const response = await axios.post(linktest, {
      id: "1",
      name: "test"
      // Assuming your API endpoint expects the room name in the request body
    });

    if (response.status === 200) {
      return response.data; // Handle successful room creation (e.g., redirect to the room)
    } else {
      throw new Error("Failed to create room");
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    throw error; // Handle errors appropriately (e.g., display an error message to the user)
  }
};

const getRoomController = async () => {
  const linktest = linkCustomer.golang_Base + linkCustomer.routes_chat.getRooms; // Construct the API endpoint URL

  try {
    const res = await axios.get(linktest, {
      method: "GET"
    });
    console.log(
      "3.admin_cloth_nextjs13/app/shop/chat/provider/controller.ts res.data",
      res.data
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
const joinRoomController = async (roomId: string) => {
  console.log(
    "3.admin_cloth_nextjs13/app/shop/chat/provider/controller.ts joinRoomController 12"
  );

  const ws = new WebSocket(
    `ws://127.0.0.1:8888/api/chat/joinRoom/1?userId=1&username=test`
  );
  // const url = link.golang_Base + link.routes_chat.joinRoom + roomId; // Construct the API endpoint URL with roomId
  // console.log(
  //   "3.admin_cloth_nextjs13/app/shop/chat/provider/controller.ts joinRoomController"
  // );
  // try {
  //   const res = await axios.post(url, {
  //     roomID: "1",

  //     userId: "1",

  //     username: "test"
  //   });
  //   console.log("joinRoom response:", res.data);
  //   return res.data;
  // } catch (err) {
  //   console.log("Error joining room:", err);
  // }
};

export { createRoomController, getRoomController, joinRoomController };
