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

  // Obtener usuario por Email
  const getUser = async (email: string, password: string) => {

    try {
      const response = await api.post("/auth/login", { email, password });
      return response.data;
      
  } catch (err) {
      console.log(err);
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
