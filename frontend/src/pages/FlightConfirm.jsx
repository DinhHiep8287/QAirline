import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { format, parseISO } from "date-fns";
import { vi } from "date-fns/locale";
import { formatCurrency } from "../utils/format";
import { FaPlane, FaUser, FaEnvelope, FaPhone, FaCalendar, FaVenusMars, FaMapMarkerAlt } from "react-icons/fa";

const FlightConfirm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState(null);

  useEffect(() => {
    // Get booking data from localStorage
    const data = localStorage.getItem('currentBooking');
    if (!data) {
      navigate('/');
      return;
    }
    setBookingData(JSON.parse(data));
  }, [navigate]);

  if (!bookingData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#605DEC]"></div>
      </div>
    );
  }

  const { flight, passenger, seatClass, price } = bookingData;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-[#605DEC] text-white p-6">
            <h1 className="text-2xl font-semibold">Xác nhận thông tin chuyến bay</h1>
            <p className="mt-2 text-white/80">Vui lòng kiểm tra lại thông tin trước khi tiếp tục</p>
          </div>

          <div className="p-6 space-y-8">
            {/* Flight Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Thông tin chuyến bay</h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-[#F6F6FE] rounded-full flex items-center justify-center">
                    <FaPlane className="w-6 h-6 text-[#605DEC]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {flight.departure} ({flight.departureCode}) → {flight.arrival} ({flight.arrivalCode})
                    </h3>
                    <p className="text-gray-500">Mã chuyến bay: {flight.name}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-500">Khởi hành</p>
                    <p className="font-medium text-gray-900">
                      {format(parseISO(flight.startTime), "HH:mm - EEEE, dd/MM/yyyy", { locale: vi })}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Đến nơi</p>
                    <p className="font-medium text-gray-900">
                      {format(parseISO(flight.endTime), "HH:mm - EEEE, dd/MM/yyyy", { locale: vi })}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Máy bay</p>
                    <p className="font-medium text-gray-900">{flight.plane?.name || "Chưa có thông tin"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Cổng</p>
                    <p className="font-medium text-gray-900">{flight.gate}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Passenger Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Thông tin hành khách</h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex items-center gap-3">
                    <FaUser className="text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Họ và tên</p>
                      <p className="font-medium text-gray-900">{passenger.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaEnvelope className="text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium text-gray-900">{passenger.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaPhone className="text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Số điện thoại</p>
                      <p className="font-medium text-gray-900">{passenger.phoneNum}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaCalendar className="text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Ngày sinh</p>
                      <p className="font-medium text-gray-900">{format(new Date(passenger.birthday), "dd/MM/yyyy")}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaVenusMars className="text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Giới tính</p>
                      <p className="font-medium text-gray-900">
                        {passenger.gender === 'MALE' ? 'Nam' : 
                         passenger.gender === 'FEMALE' ? 'Nữ' : 'Khác'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaMapMarkerAlt className="text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Địa chỉ</p>
                      <p className="font-medium text-gray-900">{passenger.address}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Ticket Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Thông tin vé</h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-500">Hạng vé</p>
                    <p className="font-medium text-gray-900">{seatClass}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Giá vé</p>
                    <p className="text-xl font-semibold text-[#605DEC]">{formatCurrency(price)} VND</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-6 border-t">
              <button
                onClick={() => navigate(-1)}
                className="px-6 py-2 border border-[#605DEC] text-[#605DEC] rounded-lg hover:bg-[#F6F6FE] transition-colors"
              >
                Quay lại
              </button>
              <button
                onClick={() => navigate(`/flight/${id}/seat-selection`)}
                className="px-6 py-2 bg-[#605DEC] text-white rounded-lg hover:bg-[#4B48BF] transition-colors"
              >
                Tiếp tục
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightConfirm; 