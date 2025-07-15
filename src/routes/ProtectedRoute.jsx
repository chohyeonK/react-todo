import { Navigate } from "react-router-dom";
import { auth } from '../firebase'
import useUserStore from "../stores/useUserStore";

export default function ProtectedRoute({ children }) {
    const user = useUserStore((state) => state.user);

    if (!user) {
        return <Navigate to="/login" />;
    }
    return children;
}