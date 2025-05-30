import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({ email: '', username: '' });
    const [flights, setFlights] = useState([]);

    useEffect(() => {
        const email = localStorage.getItem('email');
        const token = localStorage.getItem('token');
        if (!email || !token) {
            navigate('/');
        } else {
            // Thiết lập thông tin người dùng
            setUser({ email, username: email.split('@')[0] });

            // Dữ liệu chuyến bay giả lập
            const mockFlights = [
                {
                    flightNumber: 'QA001',
                    from: 'Hà Nội (HAN)',
                    to: 'TP. HCM (SGN)',
                    departureTime: '2025-06-01 08:30',
                    seat: '12A',
                    gate: 'B3'
                },
                {
                    flightNumber: 'QA202',
                    from: 'Đà Nẵng (DAD)',
                    to: 'Cần Thơ (VCA)',
                    departureTime: '2025-06-05 14:00',
                    seat: '8F',
                    gate: 'A1'
                }
            ];
            setFlights(mockFlights);
        }
    }, []);

    return (
        <div className="max-w-5xl mx-auto px-6 py-10">
            <h1 className="text-3xl font-bold text-[#605DEC] mb-6">Trang cá nhân</h1>

            <div className="bg-white shadow-md rounded-xl p-6 mb-10 border border-gray-200">
                <h2 className="text-xl font-semibold mb-4">👤 Thông tin người dùng</h2>
                <p className="text-gray-700 mb-1"><strong>Email:</strong> {user.email}</p>
                <p className="text-gray-700"><strong>Tên đăng nhập:</strong> {user.username}</p>
            </div>

            <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
                <h2 className="text-xl font-semibold mb-4">✈️ Chuyến bay của bạn</h2>
                {flights.length === 0 ? (
                    <p className="text-gray-500">Bạn chưa đặt chuyến bay nào.</p>
                ) : (
                    <ul className="space-y-4">
                        {flights.map((flight, index) => (
                            <li key={index} className="border rounded-lg p-5 hover:shadow-md transition-all bg-gray-50">
                                <p className="text-lg font-medium text-[#605DEC] mb-1">{flight.flightNumber}</p>
                                <p className="text-gray-700">Từ: <strong>{flight.from}</strong></p>
                                <p className="text-gray-700">Đến: <strong>{flight.to}</strong></p>
                                <p className="text-gray-700">Thời gian: {flight.departureTime}</p>
                                <p className="text-gray-700">Ghế: {flight.seat} | Cổng: {flight.gate}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Profile;
