// src/UserTable.js
import { useState, useEffect } from 'react';
import axios from 'axios';

function UserTable() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <table border="1">
      <thead><tr><th>ID</th><th>Name</th></tr></thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id}><td>{user.id}</td><td>{user.name}</td></tr>
        ))}
      </tbody>
    </table>
  );
}

export default UserTable;
