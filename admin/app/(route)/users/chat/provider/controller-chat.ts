import axios from "axios";

import { linkCustomer } from "@/lib/config";

const createRoomController = async (id: string, name: string) => {
  const linktest =
    linkCustomer.golang_Base + linkCustomer.routes_chat.createRoom;

  console.log(
    "3.admin_cloth_nextjs13/app/shop/chat/provider/controller.ts",
    linktest
  );
  try {
    const response = await axios.post(linktest, {
      id: id,
      name: name
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
  const linktest = `${linkCustomer.API_URL}/ws/getRooms`; // Construct the API endpoint URL
  console.log(
    "admin/app/(route)/users/chat/provider/controller-chat.ts link get room",
    linktest
  );
  try {
    const res = await axios.get(linktest, {
      method: "GET"
    });
    console.log(
      "admin/app/(route)/users/chat/provider/controller.ts res.data",
      res.data
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
const joinRoomController = async (
  userId: string,
  username: string,
  roomID: string
) => {
  console.log(
    "3.admin_cloth_nextjs13/app/shop/chat/provider/controller.ts joinRoomController 12"
  );

  // const ws = new WebSocket(
  //   `ws://127.0.0.1:8888/api/chat/joinRoom/1?userId=1&username=test`
  // );

  // const ws = new WebSocket(
  //   `${WEBSOCKET_URL}/ws/joinRoom/${roomId}?userId=${user.id}&username=${user.username}`
  // )

  // export const WEBSOCKET_URL = process.env.NEXT_PUBLIC_WEBSOCKET_URL || 'ws://127.0.0.1:8080'
  const teset = "ws://localhost:8888";
  // ${linkCustomer.WEBSOCKET_URL}
  const linktest = `${teset}/ws/joinRoom/${roomID}?userId=${userId}&username=${username}`; //

  console.log(
    "admin/app/(route)/users/chat/provider/controller-chat.ts linktest",
    linktest
  );
  const ws = new WebSocket(linktest);


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
