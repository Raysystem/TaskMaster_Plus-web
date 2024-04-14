import { useContext } from "react";
import AppContext from "../context/AuthContext";

const useAppData = () => useContext(AppContext)
export default useAppData