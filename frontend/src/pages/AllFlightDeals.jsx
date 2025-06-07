import { useState, useEffect } from 'react';
import { getNewsByCategory } from '../services/api';
import FlightDealsCard from '../container/FlightDealsCard';
import { useNavigate } from 'react-router-dom';

const AllFlightDeals = () => {
  const navigate = useNavigate();
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const response = await getNewsByCategory('FLIGHT_DEAL', 0, 1000);
        if (response?.data) {
          setDeals(Array.isArray(response.data) ? response.data : []);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching flight deals:', err);
        setError('Không thể tải ưu đãi chuyến bay');
        setLoading(false);
      }
    };

    fetchDeals();
  }, []);

  const handleDealClick = (deal) => {
    // Lưu thông tin deal vào localStorage hoặc state management
    localStorage.setItem('selectedDeal', JSON.stringify(deal));
    // Chuyển đến trang đặt vé
    navigate('/explore', { state: { dealInfo: deal } });
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="text-red-500 text-center py-4">{error}</div>
  );

  if (!deals || deals.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Hiện không có ưu đãi chuyến bay nào.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-[70px]">
      <h1 className="text-3xl font-bold text-[#6E7491] mb-8">Ưu đãi chuyến bay</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {deals.map((deal) => (
          <div key={deal.id} onClick={() => handleDealClick(deal)} className="cursor-pointer">
            <FlightDealsCard
              image={deal.pictureLink}
              title={deal.title}
              name={deal.summary}
              price={deal.content}
              des={deal.author}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllFlightDeals; 