import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdOutlineClose } from 'react-icons/md';
import { BiMenuAltLeft } from 'react-icons/bi';
import { useState, useEffect } from "react";
import Signin from "../container/Signin";
import Signup from "../container/Signup";

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [toggle, setToggle] = useState(false);
    const [signin, setSignin] = useState(false);
    const [signup, setSignup] = useState(false);
    const [userEmail, setUserEmail] = useState(localStorage.getItem("email"));

    const isActive = (route) => route === location.pathname;

    useEffect(() => {
        const email = localStorage.getItem("email");
        if (email) setUserEmail(email);
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        setUserEmail(null);
        navigate("/");
        window.location.reload();
    };

    return (
        <>
            <nav className="w-full flex flex-row items-center justify-between px-5 py-4 relative">
                {/* Logo + menu mobile */}
                <div className="flex items-center justify-center gap-3">
                    <div className="relative md:hidden flex items-center">
                        {toggle ? (
                            <MdOutlineClose className="w-7 h-7 text-[#605DEC] cursor-pointer" onClick={() => setToggle(false)} />
                        ) : (
                            <BiMenuAltLeft className="w-7 h-7 text-[#605DEC] cursor-pointer" onClick={() => setToggle(true)} />
                        )}
                        {toggle && (
                            <ul className="absolute w-40 z-10 h-fit bg-[#FFFFFF] shadow-xl top-14 left-0 text-[#7C8DB0] flex flex-col gap-2 items-start p-4 scaleUp">
                                <Link to="/" className={`text-base hover:text-[#605DEC] ${isActive("/") && "text-[#605DEC]"}`}>
                                    <li>Chuyến bay</li>
                                </Link>
                                <Link to="/hotels" className={`text-base hover:text-[#605DEC] ${isActive("/hotels") && "text-[#605DEC]"}`}>
                                    <li>Khách sạn</li>
                                </Link>
                                <Link to="/packages" className={`text-base hover:text-[#605DEC] ${isActive("/packages") && "text-[#605DEC]"}`}>
                                    <li>Gói du lịch</li>
                                </Link>
                            </ul>
                        )}
                    </div>
                    <span className="text-xl font-bold text-[#605DEC]">QAIRLINE</span>
                </div>

                {/* Nút đăng nhập hoặc user (mobile) */}
                <div className="block md:hidden">
                    {userEmail ? (
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => navigate("/profile")}
                                className="text-[#605DEC] font-medium underline text-sm"
                            >
                                {userEmail}
                            </button>
                            <button
                                onClick={handleLogout}
                                className="text-[#605DEC] text-sm border px-2 py-1 rounded"
                            >
                                Đăng xuất
                            </button>
                        </div>
                    ) : (
                        <button
                            className="bg-[#605DEC] py-2 px-4 rounded-[5px] border-2 border-[#605DEC] text-base text-white hover:text-[#605DEC] hover:bg-white transition-all duration-200"
                            onClick={() => setSignin(true)}
                        >
                            Đăng nhập
                        </button>
                    )}
                </div>

                {/* Menu desktop */}
                <div className="hidden md:flex items-center space-x-8">
                    <ul className="flex items-center space-x-8 text-[#7C8DB0]">
                        <Link to="/" className={`text-base hover:text-[#605DEC] ${isActive("/") && "text-[#605DEC]"}`}>
                            <li>Chuyến bay</li>
                        </Link>
                        <Link to="/hotels" className={`text-base hover:text-[#605DEC] ${isActive("/hotels") && "text-[#605DEC]"}`}>
                            <li>Khách sạn</li>
                        </Link>
                        <Link to="/packages" className={`text-base hover:text-[#605DEC] ${isActive("/packages") && "text-[#605DEC]"}`}>
                            <li>Gói du lịch</li>
                        </Link>
                    </ul>
                    {userEmail ? (
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate("/profile")}
                                className="text-[#605DEC] font-medium underline"
                            >
                                {userEmail}
                            </button>
                            <button
                                onClick={handleLogout}
                                className="text-[#605DEC] text-sm border px-3 py-1 rounded hover:bg-[#605DEC] hover:text-white transition"
                            >
                                Đăng xuất
                            </button>
                        </div>
                    ) : (
                        <button
                            className="bg-[#605DEC] py-2 px-4 rounded-[5px] border-2 border-[#605DEC] text-base text-white hover:text-[#605DEC] hover:bg-white transition-all duration-200"
                            onClick={() => setSignin(true)}
                        >
                            Đăng nhập
                        </button>
                    )}
                </div>
            </nav>

            {/* Form đăng nhập */}
            {signin && (
                <Signin signin={signin} setSignin={setSignin} setSignup={setSignup} />
            )}

            {/* Form đăng ký */}
            {signup && (
                <Signup signup={signup} setSignup={setSignup} setSignin={setSignin} />
            )}
        </>
    );
};

export default Navbar;
