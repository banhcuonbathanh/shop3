import { UsersClient } from "./components/client";

import { get_User_Shop } from "./controller";

const UsersPage = async () => {
  const user = await get_User_Shop();
  return (
    <div className="flex-col">
      <UsersClient data={user} />
    </div>
  );
};

export default UsersPage;
