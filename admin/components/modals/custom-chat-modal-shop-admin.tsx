"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";

import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";

import { useStoreModalShopAdmin } from "../use-hook-shop-admin/use-store-modal-shop-admin";
import { ModalShopAdmin } from "./modal-shop-admin";
import { WebsocketContext } from "../chat/provider/websocket_provider";
import { useSession } from "next-auth/react";
import { Message } from "@/types";
import ChatBody from "@/app/(route)/users/components/message";

export const CustomChatModalShopAdmin = () => {
  // console.log("this is StoreModalShopAdmin");
  const storeModal = useStoreModalShopAdmin();
  const textarea = useRef<HTMLTextAreaElement>(null);
  // receive message

  const [users, setUsers] = useState<Array<{ username: string }>>([]);
  const { conn, setConn } = useContext(WebsocketContext);
  const session = useSession();
  const user = session?.data?.user;
  const [messages, setMessage] = useState<Array<Message>>([]);
  useEffect(() => {
    if (conn === null) {
      console.log("conn === null");
      return;
    }

    conn.onmessage = (message) => {
      const m: Message = JSON.parse(message.data);
      if (m.content == "A new user has joined the room") {
        setUsers([...users, { username: m.username }]);
      }

      if (m.content == "user left the chat") {
        const deleteUser = users.filter((user) => user.username != m.username);
        setUsers([...deleteUser]);
        // setMessage1([...messages, m]);
        return;
      }

      user?.userName == m.username ? (m.type = "self") : (m.type = "recv");
      setMessage([...messages, m]);
    };

    conn.onclose = () => {};
    conn.onerror = () => {};
    conn.onopen = () => {};
  }, [conn, users]);
  // receive message

  // send message
  const sendMessage = () => {
    console.log(
      "admin/components/modals/custom-chat-modal-shop-admin.tsx chat message"
    );
    if (!textarea.current?.value) return;

    console.log(
      "admin/components/modals/custom-chat-modal-shop-admin.tsx chat message 11111"
    );
    if (conn === null) {
      console.log(
        "admin/components/modals/custom-chat-modal-shop-admin.tsx chat message conn null 2222"
      );
      return;
    }

    conn.send(textarea.current.value);
    textarea.current.value = "";
  };
  // send message
  return (
    <ModalShopAdmin
      title="Create store"
      description="Add a new store to manage products and categories."
      isOpen={storeModal.isOpenChatModal}
      onClose={() => {
        console.log(" this is on close inside StoreModalShopAdmin");
        // storeModal.isOpen;
        storeModal.onClose();
        storeModal.onCloseChatModal();
        // storeModal.isOpen;
      }}
    >
      <>
        <div className="flex flex-col w-full">
          <div className="p-4 md:mx-6 mb-14">
            <ChatBody data={messages} />
          </div>
          <div className="fixed bottom-0 mt-4 w-full">
            <div className="flex md:flex-row px-4 py-2 bg-grey md:mx-4 rounded-md">
              <div className="flex w-full mr-4 rounded-md border border-blue">
                <textarea
                  ref={textarea}
                  placeholder="type your message here"
                  className="w-full h-10 p-2 rounded-md focus:outline-none"
                  style={{ resize: "none" }}
                />
              </div>
              <div className="flex items-center">
                <button
                  className="p-2 rounded-md bg-blue text-white"
                  onClick={sendMessage}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    </ModalShopAdmin>
  );
};
