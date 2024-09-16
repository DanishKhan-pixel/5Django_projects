import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";
import axios from "axios";
const swal = require('sweetalert2');

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem("authTokens")
            ? JSON.parse(localStorage.getItem("authTokens"))
            : null
    );

    const [user, setUser] = useState(() =>
        localStorage.getItem("authTokens")
            ? jwt_decode(localStorage.getItem("authTokens"))
            : null
    );

    const [loading, setLoading] = useState(true);

    const history = useHistory();

    const loginUser = async (email, password) => {
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/token/", {
                email, password
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = response.data;
            console.log(data);

            if (response.status === 200) {
                console.log("Logged In");
                setAuthTokens(data);
                setUser(jwt_decode(data.access));
                localStorage.setItem("authTokens", JSON.stringify(data));
                history.push("/");
                swal.fire({
                    title: "Login Successful",
                    icon: "success",
                    toast: true,
                    timer: 6000,
                    position: 'top-right',
                    timerProgressBar: true,
                    showConfirmButton: false,
                    showCancelButton: true,
                });
            }
        } catch (error) {
            console.log(error.response.status);
            console.log("There was a server issue");
            swal.fire({
                title: "Username or password does not exist",
                icon: "error",
                toast: true,
                timer: 6000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
                showCancelButton: true,
            });
        }
    };

    const registerUser = async (email, username, password, password2) => {
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/register/", {
                email, username, password, password2
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (response.status === 201) {
                history.push("/login");
                swal.fire({
                    title: "Registration Successful, Login Now",
                    icon: "success",
                    toast: true,
                    timer: 6000,
                    position: 'top-right',
                    timerProgressBar: true,
                    showConfirmButton: false,
                    showCancelButton: true,
                });
            }
        } catch (error) {
            console.log(error.response.status);
            console.log("There was a server issue");
            swal.fire({
                title: `An Error Occurred ${error.response.status}`,
                icon: "error",
                toast: true,
                timer: 6000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
                showCancelButton: true,
            });
        }
    };

    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem("authTokens");
        history.push("/login");
        swal.fire({
            title: "You have been logged out...",
            icon: "success",
            toast: true,
            timer: 6000,
            position: 'top-right',
            timerProgressBar: true,
            showConfirmButton: false,
            showCancelButton: true,
        });
    };

    const contextData = {
        user,
        setUser,
        authTokens,
        setAuthTokens,
        registerUser,
        loginUser,
        logoutUser,
    };

    useEffect(() => {
        if (authTokens) {
            setUser(jwt_decode(authTokens.access));
        }
        setLoading(false);
    }, [authTokens, loading]);

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
};
