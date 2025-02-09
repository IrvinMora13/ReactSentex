import { useState } from "react";
import api from "../utils/api";

interface User {
  id: number;
  username: string;
  email: string;
  is_active: boolean;
}

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Obtener usuario por ID
  const getUser = async (userId: number) => {
    setLoading(true);
    try {
      const response = await api.get<User>(`/users/${userId}`);
      return response.data;
    } catch (err) {
      setError("Error al obtener el usuario");
    } finally {
      setLoading(false);
    }
  };

  // Crear un usuario
  const createUser = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await api.post("/users/", { email, password });
  
      setUsers([...users, response.data]);
    } catch (err) {
      setError("Error al crear el usuario");
      console.error("Error de API:", err); 
    } finally {
      setLoading(false);
    }
  };
  

  return { users, getUser, createUser, loading, error };
}
