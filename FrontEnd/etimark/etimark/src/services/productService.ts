import axios from "axios";
import { API_URL } from "../config/api";

export const getProducts = async () => {
  try {
    const res = await axios.get(`${API_URL}/productos`);
    return res.data.products;
  } catch (error) {
    console.error("Error al obtener productos:", error);
    throw new Error("No se pudieron cargar los productos");
  }
};
