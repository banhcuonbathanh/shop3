"use client";

import { UserInfo } from "../../_component/user-info";
import { useCurrentUser } from "../../hooks/use-current-user";

// import { UserInfo } from "@/components/user-info";
// import { useCurrentUser } from "@/hooks/use-current-user";

const ClientPage = () => {
  // const user = useCurrentUser();

  return (
    <UserInfo
      label="📱 Client component"
      // user={user}
    />
  );
};

export default ClientPage;
