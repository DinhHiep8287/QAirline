import { Link, useLocation } from "react-router-dom";
import { MdOutlineClose } from 'react-icons/md';
import { BiMenuAltLeft } from 'react-icons/bi';
import { useState } from "react";
import Signin from "../container/Signin";
import Signup from "../container/Signup";

const Navbar = () => {
    const location = useLocation();
    const [toggle, setToggle] = useState(false);
    const [signin, setSignin] = useState(false);
    const [signup, setSignup] = useState(false);

    const isActive = (route) => route === location.pathname;

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

                {/* Nút đăng nhập trên mobile */}
                <div className="block md:hidden">
                    <button
                        className="bg-[#605DEC] py-2 px-4 rounded-[5px] border-2 border-[#605DEC] text-base text-white hover:text-[#605DEC] hover:bg-white transition-all duration-200"
                        onClick={() => setSignin(true)}
                    >
                        Đăng nhập
                    </button>
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
                    <button
                        className="bg-[#605DEC] py-2 px-4 rounded-[5px] border-2 border-[#605DEC] text-base text-white hover:text-[#605DEC] hover:bg-white transition-all duration-200"
                        onClick={() => setSignin(true)}
                    >
                        Đăng nhập
                    </button>
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
