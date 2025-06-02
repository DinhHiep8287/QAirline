import { useState, useEffect } from 'react';
import { FaClock, FaSearch, FaHistory } from 'react-icons/fa';
import { getFlights, updateFlightDelay, getFlightDelayHistory } from '../../services/api';
import { toast } from 'react-toastify';

const DelayForm = ({ onSubmit, flightName }) => {
  const [formData, setFormData] = useState({
    delayMinutes: '',
    reason: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.delayMinutes || !formData.reason) {
      toast.error('Vui lòng điền đầy đủ thông tin');
      return;
    }
    onSubmit({
      ...formData,
      delayMinutes: parseInt(formData.delayMinutes)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">
        Cập nhật delay cho chuyến bay {flightName}
      </h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Thời gian delay (phút)</label>
          <input
            type="number"
            value={formData.delayMinutes}
            onChange={(e) => setFormData({ ...formData, delayMinutes: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
            min="1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Lý do</label>
          <textarea
            value={formData.reason}
            onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Cập nhật
        </button>
      </div>
    </form>
  );
};

const DelayHistory = ({ history = [] }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Lịch sử delay</h3>
      
      {history.length === 0 ? (
        <p className="text-gray-500">Chưa có lịch sử delay</p>
      ) : (
        <div className="space-y-4">
          {history.map((item, index) => (
            <div key={index} className="border-l-4 border-yellow-400 pl-4">
              <div className="text-sm text-gray-500">
                {new Date(item.createDate).toLocaleString('vi-VN')}
              </div>
              <div className="font-medium">Delay {item.delayMinutes} phút</div>
              <div className="text-gray-600">{item.reason}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Delays = () => {
  const [flights, setFlights] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [delayHistory, setDelayHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchFlights = async () => {
    try {
      setLoading(true);
      const response = await getFlights(page);
      if (response.data) {
        setFlights(response.data);
        setTotalPages(Math.ceil(response.data.length / 10));
      }
    } catch (error) {
      toast.error('Không thể tải danh sách chuyến bay: ' + (error.response?.data || error.message));
      console.error('Error fetching flights:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDelayHistory = async (flightId) => {
    try {
      setLoading(true);
      const response = await getFlightDelayHistory(flightId);
      if (response.data) {
        setDelayHistory(response.data);
      }
    } catch (error) {
      toast.error('Không thể tải lịch sử delay: ' + (error.response?.data || error.message));
      console.error('Error fetching delay history:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlights();
  }, [page]);

  const handleFlightSelect = async (flight) => {
    setSelectedFlight(flight);
    await fetchDelayHistory(flight.id);
  };

  const handleSubmitDelay = async (formData) => {
    if (!selectedFlight) return;

    try {
      setLoading(true);
      await updateFlightDelay(selectedFlight.id, {
        ...formData,
        createBy: 'admin' // Tạm thời hardcode, sau này lấy từ context
      });
      toast.success('Cập nhật delay thành công');
      await fetchDelayHistory(selectedFlight.id);
      await fetchFlights();
    } catch (error) {
      toast.error('Không thể cập nhật delay: ' + (error.response?.data || error.message));
      console.error('Error updating delay:', error);
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

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Quản lý delay</h1>
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
                          <th className="text-left py-3 px-4 border-b">Điểm đi</th>
                          <th className="text-left py-3 px-4 border-b">Điểm đến</th>
                          <th className="text-left py-3 px-4 border-b">Khởi hành</th>
                          <th className="text-right py-3 px-4 border-b">Thao tác</th>
                        </tr>
                      </thead>
                      <tbody>
                        {flights.map((item) => (
                          <tr
                            key={item.id}
                            className={`hover:bg-gray-50 ${
                              selectedFlight?.id === item.id ? 'bg-blue-50' : ''
                            }`}
                          >
                            <td className="py-3 px-4 border-b">{item.name}</td>
                            <td className="py-3 px-4 border-b">{item.departure}</td>
                            <td className="py-3 px-4 border-b">{item.arrival}</td>
                            <td className="py-3 px-4 border-b">
                              {formatDateTime(item.startTime)}
                            </td>
                            <td className="py-3 px-4 border-b text-right">
                              <button
                                onClick={() => handleFlightSelect(item)}
                                className="text-blue-600 hover:text-blue-800"
                                disabled={loading}
                              >
                                <FaClock className="inline-block" />
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

          <div className="lg:col-span-1 space-y-8">
            {selectedFlight && (
              <>
                <DelayForm onSubmit={handleSubmitDelay} flightName={selectedFlight.name} />
                <DelayHistory history={delayHistory} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Delays; 