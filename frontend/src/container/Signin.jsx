import { useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

// eslint-disable-next-line react/prop-types
const Signin = ({ signin, setSignin, setSignup }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        if (email.trim() && password.trim()) {
            try {
                const response = await axios.post('http://localhost:8080/api/v1/auth/login', {
                    email,
                    password
                });

                if (response.data.token) {
                    toast.success("Đăng nhập thành công!");
                    localStorage.setItem("token", response.data.token);
                    localStorage.setItem("email", response.data.email);
                    localStorage.setItem("username", response.data.username);
                    localStorage.setItem("userId", response.data.id);
                    navigate('/');
                    window.location.reload();
                    setSignin(false);
                } else {
                    toast.error("Đăng nhập thất bại. Vui lòng kiểm tra lại.");
                }
            } catch (err) {
                toast.error("Lỗi máy chủ hoặc sai thông tin đăng nhập.");
            }
        } else {
            toast.warning("Vui lòng điền đầy đủ thông tin.");
        }
    };

    return (
        <div className="absolute top-36 right-0 left-0 m-auto z-20 bg-white shadowCard w-[310px] sm:w-[468px] md:w-[568px] rounded px-8 py-6 flex flex-col gap-6 scaleUp">
            <div className="flex items-center justify-between">
                <h1 className="text-[#6E7491] text-xl sm:text-2xl font-bold">Đăng nhập tài khoản QAIRLINE</h1>
                <MdOutlineClose
                    className="text-[#6E7491] cursor-pointer"
                    onClick={() => setSignin(false)}
                />
            </div>
            <form className="flex flex-col gap-4" onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-2 rounded text-[#7C8DB0]"
                />
                <input
                    type="password"
                    placeholder="Mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-2 rounded text-[#7C8DB0]"
                />
                <button
                    type="submit"
                    className="bg-[#605DEC] text-white rounded py-3 mt-2"
                >
                    Đăng nhập
                </button>
            </form>

            <div className="flex justify-center gap-2 mt-4">
                <p className="text-[#7C8DB0]">Chưa có tài khoản?</p>
                <button
                    onClick={() => {
                        setSignin(false);
                        setSignup(true);
                    }}
                    className="text-[#605DEC] font-semibold underline"
                >
                    Đăng ký
                </button>
            </div>
        </div>
    );
};

export default Signin;
