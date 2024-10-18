import { useEffect, useState } from "react";
import { UserInterface } from "./types/User.interface.ts";
import { fetchData } from "./utils/api.ts";

const App = () => {
  const [users, setUsers] = useState<UserInterface[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchDataAndHandleLoading = async () => {
      try {
        setIsLoading(true);
        const data = await fetchData();
        setUsers(data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDataAndHandleLoading();

    return () => {
      // componentWillUnmount
    };
  }, []);

  return (
    <div>
      <h1>Render of Users list</h1>
      <hr />
      {isLoading && <h2>Loading...</h2>}
      {error && <h2>{error}</h2>}
      <ul>
        {users.map((user: UserInterface) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
