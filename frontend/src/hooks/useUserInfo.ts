import { useContext, useMemo } from "react"
import { AuthContext } from "../components/auth/auth/Auth"
import { jwtDecode } from "jwt-decode"
import User from "../models/user/User"

function useUserInfo() {
    const { jwt } = useContext(AuthContext)!

    const user = useMemo(() => {
        const user = jwtDecode<User>(jwt)
        return user
    }, [jwt])

    return user
}

export default useUserInfo;