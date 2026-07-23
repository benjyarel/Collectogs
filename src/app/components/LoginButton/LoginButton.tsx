import { getRequestToken } from "./getRequestToken";

export const LoginButton = () => {
    return <button className="btn" onClick={getRequestToken}>Login</button>
}