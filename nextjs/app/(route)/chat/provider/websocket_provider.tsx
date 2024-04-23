"use client";

import React, { useState, createContext } from "react";

type Conn = WebSocket | null;

export const WebsocketContext = createContext<{
  conn: Conn;
  setConn: (c: Conn) => void;
}>({
  conn: null,
  setConn: () => {}
});

const WebSocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [conn, setConn] = useState<Conn>(null);
  console.log(
    "nextjs/app/(route)/chat/provider/websocket_provider.tsx conn",
    conn
  );
  return (
    <WebsocketContext.Provider
      value={{
        conn: conn,
        setConn: setConn
      }}
    >
      {children}
    </WebsocketContext.Provider>
  );
};

export default WebSocketProvider;
