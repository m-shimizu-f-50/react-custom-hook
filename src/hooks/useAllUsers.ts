import { useState } from "react";
import { userProfile } from "../types/userProfile";
import { User } from "../types/api/user";
import axios from "axios";

//全ユーザー一覧を取得するカスタムフック
export const useAllUsers = () => {
  const [userProfiles, serUserProfiles] = useState<Array<userProfile>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getUsers = () => {
    setLoading(true);
    setError(false);

    axios
      .get<Array<User>>("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        // 必要なものだけdataに変換して格納する
        const data = res.data.map((user) => ({
          id: user.id,
          name: `${user.name}(${user.username})`,
          email: user.email,
          address: `${user.address.city}${user.address.suite}${user.address.suite}`
        }));

        serUserProfiles(data);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return { getUsers, userProfiles, loading, error };
};
