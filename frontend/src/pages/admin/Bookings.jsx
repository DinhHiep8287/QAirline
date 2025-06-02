import { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { getTransactions, getTransactionsByConditions, getTransactionsByStatus } from '../../services/api';
import { toast } from 'react-toastify';

const BookingFilters = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    flightName: '',
    dateFrom: '',
    dateTo: '',
    status: 'ALL'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if ((filters.dateFrom && !filters.dateTo) || (!filters.dateFrom && filters.dateTo)) {
      toast.error('Vui lòng chọn đầy đủ khoảng thời gian');
      return;
    }
    onFilter(filters);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Chuyến bay</label>
          <input
            type="text"
            value={filters.flightName}
            onChange={(e) => setFilters({ ...filters, flightName: e.target.value })}
            placeholder="VN123"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Từ ngày</label>
          <input
            type="date"
            value={filters.dateFrom}
            onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Đến ngày</label>
          <input
            type="date"
            value={filters.dateTo}
            onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Trạng thái</label>
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="ALL">Tất cả</option>
            <option value="PENDING">Chờ xử lý</option>
            <option value="COMPLETED">Hoàn tất</option>
            <option value="CANCELLED">Đã hủy</option>
            <option value="DELAY">Delay</option>
          </select>
        </div>
      </div>
      <div className="mt-4">
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
        >
          <FaSearch className="mr-2" />
          Tìm kiếm
        </button>
      </div>
    </form>
  );
};

const BookingStats = ({ data }) => {
  const stats = {
    totalBookings: data.length,
    totalRevenue: data.reduce((sum, booking) => {
      const price = parseFloat(booking.price || 0);
      return sum + (isNaN(price) ? 0 : price);
    }, 0),
    averageBookingValue: data.length > 0 
      ? data.reduce((sum, booking) => {
          const price = parseFloat(booking.price || 0);
          return sum + (isNaN(price) ? 0 : price);
        }, 0) / data.length 
      : 0
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-medium text-gray-900">Tổng đơn đặt</h3>
        <p className="mt-2 text-3xl font-bold text-blue-600">{stats.totalBookings}</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-medium text-gray-900">Doanh thu</h3>
        <p className="mt-2 text-3xl font-bold text-green-600">
          {formatCurrency(stats.totalRevenue)}
        </p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-medium text-gray-900">Trung bình/đơn</h3>
        <p className="mt-2 text-3xl font-bold text-purple-600">
          {formatCurrency(stats.averageBookingValue)}
        </p>
      </div>
    </div>
  );
};

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [filters, setFilters] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      let response;
      
      if (filters) {
        if (filters.status === 'ALL') {
          response = await getTransactionsByConditions(
            filters.flightName,
            filters.dateFrom,
            filters.dateTo,
            null,
            page,
            10
          );
        } else {
          response = await getTransactionsByStatus(filters.status);
        }
      } else {
        response = await getTransactions(page);
      }

      if (response.data) {
        setBookings(response.data);
        setTotalPages(Math.ceil(response.data.length / 10));
      }
    } catch (error) {
      toast.error('Không thể tải dữ liệu: ' + (error.response?.data || error.message));
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, filters]);

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
    setPage(0);
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Quản lý đặt chỗ</h1>
        </div>

        <BookingFilters onFilter={handleFilter} />
        <BookingStats data={bookings} />

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            {loading ? (
              <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <>
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left py-3 px-4 border-b">Mã đặt chỗ</th>
                      <th className="text-left py-3 px-4 border-b">Khách hàng</th>
                      <th className="text-left py-3 px-4 border-b">Chuyến bay</th>
                      <th className="text-left py-3 px-4 border-b">Ngày đặt</th>
                      <th className="text-left py-3 px-4 border-b">Trạng thái</th>
                      <th className="text-right py-3 px-4 border-b">Tổng tiền</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <tr key={booking.id} className="hover:bg-gray-50">
                        <td className="py-3 px-4 border-b font-medium">
                          {booking.id}
                        </td>
                        <td className="py-3 px-4 border-b">
                          <div>{booking.user?.name}</div>
                          <div className="text-sm text-gray-500">{booking.user?.email}</div>
                        </td>
                        <td className="py-3 px-4 border-b">
                          <div>{booking.flight?.name}</div>
                          <div className="text-sm text-gray-500">
                            {booking.flight?.departure} → {booking.flight?.arrival}
                          </div>
                        </td>
                        <td className="py-3 px-4 border-b">
                          {formatDateTime(booking.createDate)}
                        </td>
                        <td className="py-3 px-4 border-b">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              booking.status === 'COMPLETED'
                                ? 'bg-green-100 text-green-800'
                                : booking.status === 'PENDING'
                                ? 'bg-yellow-100 text-yellow-800'
                                : booking.status === 'DELAY'
                                ? 'bg-orange-100 text-orange-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {booking.status === 'COMPLETED'
                              ? 'Hoàn tất'
                              : booking.status === 'PENDING'
                              ? 'Chờ xử lý'
                              : booking.status === 'DELAY'
                              ? 'Delay'
                              : 'Đã hủy'}
                          </span>
                        </td>
                        <td className="py-3 px-4 border-b text-right">
                          {formatCurrency(booking.price)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {totalPages > 1 && (
                  <div className="flex justify-center py-4 gap-2">
                    {Array.from({ length: totalPages }).map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setPage(index)}
                        className={`px-3 py-1 rounded ${
                          page === index
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 hover:bg-gray-300'
                        }`}
                        disabled={loading}
                      >
                        {index + 1}
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookings; 