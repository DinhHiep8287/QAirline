import { useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { toast } from "react-toastify";
import axios from "axios";

// eslint-disable-next-line react/prop-types
const Signup = ({ signup, setSignup, setSignin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [check1, setCheck1] = useState(false);

    const handleSignup = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.warning("Vui lòng điền đầy đủ thông tin.");
            return;
        }

        if (!check1) {
            toast.warning("Vui lòng đồng ý điều khoản.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8080/api/v1/auth/register", {
                email,
                password
            });

            toast.success("Đăng ký thành công!");
            setSignup(false);
            setSignin(true);
        } catch (err) {
            toast.error("Đăng ký thất bại. Email có thể đã tồn tại.");
        }
    };

    return (
        <div className="absolute top-36 right-0 left-0 m-auto z-20 bg-white shadowCard w-[310px] sm:w-[468px] md:w-[568px] rounded px-8 py-6 flex flex-col gap-6 scaleUp">
            <div className="flex items-center justify-between">
                <h1 className="text-[#6E7491] text-xl sm:text-2xl font-bold">Đăng ký tài khoản QAIRLINE</h1>
                <MdOutlineClose
                    className="text-[#6E7491] cursor-pointer"
                    onClick={() => setSignup(false)}
                />
            </div>
            <form className="flex flex-col gap-4" onSubmit={handleSignup}>
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
                <label className="flex items-center gap-2 text-[#7C8DB0]">
                    <input
                        type="checkbox"
                        checked={check1}
                        onChange={(e) => setCheck1(e.target.checked)}
                    />
                    Tôi đồng ý với <span className="text-[#605DEC]">điều khoản sử dụng</span>
                </label>
                <button
                    type="submit"
                    className="bg-[#605DEC] text-white rounded py-3 mt-2"
                >
                    Tạo tài khoản
                </button>
            </form>

            <div className="flex justify-center gap-2 mt-4">
                <p className="text-[#7C8DB0]">Đã có tài khoản?</p>
                <button
                    onClick={() => {
                        setSignup(false);
                        setSignin(true);
                    }}
                    className="text-[#605DEC] font-semibold underline"
                >
                    Đăng nhập
                </button>
            </div>
        </div>
    );
};

export default Signup;
