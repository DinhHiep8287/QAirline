import { useState, useEffect } from 'react';
import { FaSearch, FaFilter, FaPlane, FaCalendarAlt, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

const BookingCard = ({ booking }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'Đã hoàn thành';
      case 'upcoming':
        return 'Sắp khởi hành';
      case 'cancelled':
        return 'Đã hủy';
      default:
        return 'Không xác định';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#F6F6FE] rounded-full flex items-center justify-center">
              <FaPlane className="w-6 h-6 text-[#605DEC]" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {booking.from} → {booking.to}
              </h3>
              <p className="text-sm text-gray-500">Mã đặt chỗ: {booking.bookingCode}</p>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
            {getStatusText(booking.status)}
          </span>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3">
            <FaCalendarAlt className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Ngày khởi hành</p>
              <p className="text-sm font-medium text-gray-900">
                {format(new Date(booking.departureDate), "dd MMMM yyyy", { locale: vi })}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <FaClock className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Thời gian</p>
              <p className="text-sm font-medium text-gray-900">{booking.departureTime}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <FaMapMarkerAlt className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Cổng</p>
              <p className="text-sm font-medium text-gray-900">{booking.gate}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Tổng giá</p>
              <p className="text-lg font-semibold text-gray-900">{booking.price.toLocaleString('vi-VN')}₫</p>
            </div>
            <button className="px-4 py-2 bg-[#F6F6FE] text-[#605DEC] rounded-lg hover:bg-[#605DEC] hover:text-white transition-colors duration-200 text-sm font-medium">
              Xem chi tiết
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    // TODO: Replace with actual API call
    const mockBookings = [
      {
        id: 1,
        bookingCode: 'QB123456',
        from: 'Hà Nội (HAN)',
        to: 'TP. HCM (SGN)',
        departureDate: '2024-03-15',
        departureTime: '08:30',
        gate: 'A12',
        status: 'upcoming',
        price: 1500000
      },
      {
        id: 2,
        bookingCode: 'QB789012',
        from: 'Đà Nẵng (DAD)',
        to: 'Phú Quốc (PQC)',
        departureDate: '2024-02-20',
        departureTime: '15:45',
        gate: 'B05',
        status: 'completed',
        price: 2100000
      },
      {
        id: 3,
        bookingCode: 'QB345678',
        from: 'TP. HCM (SGN)',
        to: 'Hà Nội (HAN)',
        departureDate: '2024-01-10',
        departureTime: '10:15',
        gate: 'C08',
        status: 'cancelled',
        price: 1800000
      }
    ];
    setBookings(mockBookings);
  }, []);

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.bookingCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.to.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || booking.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h1 className="text-2xl font-bold text-gray-900">Lịch sử đặt vé</h1>
            
            {/* Search and Filter */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tìm kiếm đặt vé..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full md:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#605DEC] focus:border-[#605DEC]"
                />
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
              
              <div className="relative">
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <FaFilter className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-700">Lọc</span>
                </button>
                
                {isFilterOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
                    <button
                      onClick={() => {
                        setFilterStatus('all');
                        setIsFilterOpen(false);
                      }}
                      className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 ${
                        filterStatus === 'all' ? 'text-[#605DEC] font-medium' : 'text-gray-700'
                      }`}
                    >
                      Tất cả
                    </button>
                    <button
                      onClick={() => {
                        setFilterStatus('upcoming');
                        setIsFilterOpen(false);
                      }}
                      className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 ${
                        filterStatus === 'upcoming' ? 'text-[#605DEC] font-medium' : 'text-gray-700'
                      }`}
                    >
                      Sắp khởi hành
                    </button>
                    <button
                      onClick={() => {
                        setFilterStatus('completed');
                        setIsFilterOpen(false);
                      }}
                      className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 ${
                        filterStatus === 'completed' ? 'text-[#605DEC] font-medium' : 'text-gray-700'
                      }`}
                    >
                      Đã hoàn thành
                    </button>
                    <button
                      onClick={() => {
                        setFilterStatus('cancelled');
                        setIsFilterOpen(false);
                      }}
                      className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 ${
                        filterStatus === 'cancelled' ? 'text-[#605DEC] font-medium' : 'text-gray-700'
                      }`}
                    >
                      Đã hủy
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bookings List */}
          {filteredBookings.length === 0 ? (
            <div className="text-center py-12">
              <FaPlane className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy đặt vé nào</h3>
              <p className="text-gray-500">Thử thay đổi bộ lọc hoặc tìm kiếm với từ khóa khác</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredBookings.map(booking => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingHistory; 