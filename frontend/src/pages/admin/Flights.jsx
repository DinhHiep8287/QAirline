import { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { getFlights, createFlight, updateFlight, deleteFlight, getPlanes } from '../../services/api';
import { toast } from 'react-toastify';

const FlightForm = ({ onSubmit, initialData = null, planes = [] }) => {
  const [formData, setFormData] = useState({
    flightNumber: '',
    planeId: '',
    departure: '',
    destination: '',
    departureTime: '',
    arrivalTime: '',
    basePrice: '',
    ...initialData
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      basePrice: parseFloat(formData.basePrice),
      planeId: parseInt(formData.planeId)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">
        {initialData ? 'Chỉnh sửa chuyến bay' : 'Thêm chuyến bay mới'}
      </h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Số hiệu chuyến bay</label>
          <input
            type="text"
            value={formData.flightNumber}
            onChange={(e) => setFormData({ ...formData, flightNumber: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Tàu bay</label>
          <select
            value={formData.planeId}
            onChange={(e) => setFormData({ ...formData, planeId: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          >
            <option value="">Chọn tàu bay</option>
            {planes.map(plane => (
              <option key={plane.id} value={plane.id}>
                {plane.code} - {plane.type}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Điểm đi</label>
            <input
              type="text"
              value={formData.departure}
              onChange={(e) => setFormData({ ...formData, departure: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Điểm đến</label>
            <input
              type="text"
              value={formData.destination}
              onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Giờ khởi hành</label>
            <input
              type="datetime-local"
              value={formData.departureTime}
              onChange={(e) => setFormData({ ...formData, departureTime: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Giờ đến</label>
            <input
              type="datetime-local"
              value={formData.arrivalTime}
              onChange={(e) => setFormData({ ...formData, arrivalTime: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Giá cơ bản</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">₫</span>
            </div>
            <input
              type="number"
              value={formData.basePrice}
              onChange={(e) => setFormData({ ...formData, basePrice: e.target.value })}
              className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="0"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          {initialData ? 'Cập nhật' : 'Thêm mới'}
        </button>
      </div>
    </form>
  );
};

const Flights = () => {
  const [flights, setFlights] = useState([]);
  const [planes, setPlanes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingFlight, setEditingFlight] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [flightsResponse, planesResponse] = await Promise.all([
        getFlights(page),
        getPlanes()
      ]);
      setFlights(flightsResponse.data.content);
      setTotalPages(Math.ceil(flightsResponse.data.totalElements / 10));
      setPlanes(planesResponse.data);
    } catch (error) {
      toast.error('Không thể tải dữ liệu');
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      if (editingFlight) {
        await updateFlight(editingFlight.id, formData);
        toast.success('Cập nhật chuyến bay thành công');
      } else {
        await createFlight(formData);
        toast.success('Thêm chuyến bay thành công');
      }
      fetchData();
      setShowForm(false);
      setEditingFlight(null);
    } catch (error) {
      toast.error('Có lỗi xảy ra');
      console.error('Error submitting flight:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setEditingFlight(item);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa chuyến bay này?')) {
      return;
    }

    try {
      setLoading(true);
      await deleteFlight(id);
      toast.success('Xóa chuyến bay thành công');
      fetchData();
    } catch (error) {
      toast.error('Không thể xóa chuyến bay');
      console.error('Error deleting flight:', error);
    } finally {
      setLoading(false);
    }
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

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Quản lý chuyến bay</h1>
          <button
            onClick={() => {
              setEditingFlight(null);
              setShowForm(true);
            }}
            className="flex items-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            disabled={loading}
          >
            <FaPlus className="mr-2" />
            Thêm chuyến bay
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
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
                          <th className="text-left py-3 px-4 border-b">Số hiệu</th>
                          <th className="text-left py-3 px-4 border-b">Tàu bay</th>
                          <th className="text-left py-3 px-4 border-b">Điểm đi</th>
                          <th className="text-left py-3 px-4 border-b">Điểm đến</th>
                          <th className="text-left py-3 px-4 border-b">Khởi hành</th>
                          <th className="text-right py-3 px-4 border-b">Giá</th>
                          <th className="text-right py-3 px-4 border-b">Thao tác</th>
                        </tr>
                      </thead>
                      <tbody>
                        {flights.map((item) => (
                          <tr key={item.id} className="hover:bg-gray-50">
                            <td className="py-3 px-4 border-b">{item.flightNumber}</td>
                            <td className="py-3 px-4 border-b">
                              {planes.find(p => p.id === item.planeId)?.code}
                            </td>
                            <td className="py-3 px-4 border-b">{item.departure}</td>
                            <td className="py-3 px-4 border-b">{item.destination}</td>
                            <td className="py-3 px-4 border-b">{formatDateTime(item.departureTime)}</td>
                            <td className="py-3 px-4 border-b text-right">{formatPrice(item.basePrice)}</td>
                            <td className="py-3 px-4 border-b text-right">
                              <button
                                onClick={() => handleEdit(item)}
                                className="text-blue-600 hover:text-blue-800 mr-3"
                                disabled={loading}
                              >
                                <FaEdit />
                              </button>
                              <button
                                onClick={() => handleDelete(item.id)}
                                className="text-red-600 hover:text-red-800"
                                disabled={loading}
                              >
                                <FaTrash />
                              </button>
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

          {showForm && (
            <div className="lg:col-span-1">
              <FlightForm
                onSubmit={handleSubmit}
                initialData={editingFlight}
                planes={planes}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Flights; 