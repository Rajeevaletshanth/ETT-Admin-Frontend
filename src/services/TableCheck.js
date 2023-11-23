import { useSelector } from "react-redux";

const roles = ['client', 'agent', 'supplier'];

export default function useUserRole() {
    const authority = useSelector((state) => state.auth.user.authority);

    const checkUserRole = () => {
        if (roles.includes(authority[0])) {
            return 'moderator';
        } else {
            return 'admin';
        }
    };

    return checkUserRole();
}