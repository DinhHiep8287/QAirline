import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { searchFlights } from "../services/api";
import { format, parseISO, differenceInMinutes } from "date-fns";
import { toast } from "react-toastify";
import { vi } from "date-fns/locale";
import { formatCurrency } from "../utils/format";

const FlightChoose = ({ searchData }) => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("time_asc");

  useEffect(() => {
    const fetchFlights = async () => {
      if (!searchData.from || !searchData.to || !searchData.startDate || !searchData.endDate) {
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const formattedStartDate = format(new Date(searchData.startDate), 'yyyy-MM-dd');
        const formattedEndDate = format(new Date(searchData.endDate), 'yyyy-MM-dd');

        const response = await searchFlights(
          "",
          formattedStartDate,
          formattedEndDate,
          searchData.from,
          searchData.to
        );

        if (response.data.status === "SUCCESS") {
          setFlights(response.data.data);
        } else {
          setError(response.data.message || "Không thể tìm thấy chuyến bay phù hợp");
          toast.error(response.data.message || "Không thể tìm thấy chuyến bay phù hợp");
        }
      } catch (err) {
        console.error("Error fetching flights:", err);
        setError("Đã có lỗi xảy ra khi tìm kiếm chuyến bay");
        toast.error("Đã có lỗi xảy ra khi tìm kiếm chuyến bay");
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, [searchData]);

  const calculateDuration = (startTime, endTime) => {
    const start = parseISO(startTime);
    const end = parseISO(endTime);
    const diffInMinutes = differenceInMinutes(end, start);
    const hours = Math.floor(diffInMinutes / 60);
    const minutes = diffInMinutes % 60;
    return `${hours}h ${minutes}min`;
  };

  const sortFlights = (flights) => {
    const sortedFlights = [...flights];
    switch (sortBy) {
      case "time_asc":
        return sortedFlights.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
      case "time_desc":
        return sortedFlights.sort((a, b) => new Date(b.startTime) - new Date(a.startTime));
      case "duration_asc":
        return sortedFlights.sort((a, b) => 
          differenceInMinutes(parseISO(a.endTime), parseISO(a.startTime)) -
          differenceInMinutes(parseISO(b.endTime), parseISO(b.startTime))
        );
      default:
        return sortedFlights;
    }
  };

  const renderFlightInfo = (flight) => {
    const startDate = parseISO(flight.startTime);
    const endDate = parseISO(flight.endTime);
    const duration = calculateDuration(flight.startTime, flight.endTime);
    const statusColors = {
      OPEN: { bg: "bg-green-100", text: "text-green-800", border: "border-green-200" },
      DELAY: { bg: "bg-yellow-100", text: "text-yellow-800", border: "border-yellow-200" },
      CANCELLED: { bg: "bg-red-100", text: "text-red-800", border: "border-red-200" }
    };
    const status = statusColors[flight.status] || statusColors.OPEN;

    return (
      <div key={flight.id} className="bg-white rounded-xl shadow-lg border border-gray-100 hover:border-[#605DEC] transition-all duration-300 overflow-hidden">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="text-lg font-semibold text-[#1A1D1F]">{flight.name}</span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${status.bg} ${status.text} ${status.border} border`}>
                {flight.status === 'OPEN' ? 'Sẵn sàng' : flight.status === 'DELAY' ? 'Trễ chuyến' : 'Đã hủy'}
              </span>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">
                {format(startDate, "EEEE, dd/MM/yyyy", { locale: vi })}
              </div>
            </div>
          </div>

          {/* Flight Route */}
          <div className="flex items-center gap-4">
            {/* Departure */}
            <div className="flex-1">
              <div className="text-2xl font-bold text-[#1A1D1F]">
                {format(startDate, "HH:mm")}
              </div>
              <div className="mt-1">
                <div className="font-medium text-[#1A1D1F]">{flight.departureCode}</div>
                <div className="text-sm text-gray-500">{flight.departure}</div>
              </div>
            </div>

            {/* Flight Path */}
            <div className="flex-1 flex flex-col items-center px-4">
              <div className="text-sm font-medium text-gray-500 mb-2">{duration}</div>
              <div className="w-full flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#605DEC]"></div>
                <div className="flex-1 h-0.5 bg-[#605DEC]"></div>
                <div className="w-3 h-3 rounded-full bg-[#605DEC]"></div>
              </div>
              <div className="text-sm text-gray-500 mt-2">Bay thẳng</div>
            </div>

            {/* Arrival */}
            <div className="flex-1 text-right">
              <div className="text-2xl font-bold text-[#1A1D1F]">
                {format(endDate, "HH:mm")}
              </div>
              <div className="mt-1">
                <div className="font-medium text-[#1A1D1F]">{flight.arrivalCode}</div>
                <div className="text-sm text-gray-500">{flight.arrival}</div>
              </div>
            </div>
          </div>

          {/* Flight Details and Ticket Classes */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="grid grid-cols-2 gap-4 mb-4">
              {/* Economy Class */}
              <div className="relative bg-green-50 rounded-lg p-4">
                <div className="absolute top-2 right-2 bg-green-700 text-white text-xs px-2 py-1 rounded">
                  {flight.economySeatsAvailable} chỗ còn lại
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">Economy</h3>
                <p className="text-xl font-bold text-[#1A1D1F]">
                  {formatCurrency(flight.economyPrice)} <span className="text-sm text-gray-500">VND</span>
                </p>
              </div>

              {/* Business Class */}
              <div className="relative bg-blue-50 rounded-lg p-4">
                <div className="absolute top-2 right-2 bg-blue-700 text-white text-xs px-2 py-1 rounded">
                  {flight.businessSeatsAvailable} chỗ còn lại
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">Business</h3>
                <p className="text-xl font-bold text-[#1A1D1F]">
                  {formatCurrency(flight.businessPrice)} <span className="text-sm text-gray-500">VND</span>
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div>
                  <div className="text-sm text-gray-500">Máy bay</div>
                  <div className="font-medium text-[#1A1D1F]">{flight.plane?.name || "Chưa có thông tin"}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Cổng</div>
                  <div className="font-medium text-[#1A1D1F]">{flight.gate}</div>
                </div>
              </div>
              <Link 
                to={`/flight/${flight.id}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#605DEC] text-white hover:bg-[#4B48BF] transition-colors"
              >
                <span>Chọn chuyến bay</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.16669 10H15.8334M15.8334 10L10 4.16667M15.8334 10L10 15.8333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#605DEC]"></div>
        <div className="mt-4 text-gray-500">Đang tìm kiếm chuyến bay phù hợp...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-6 rounded-xl border border-red-200">
        <div className="flex items-center gap-3">
          <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="text-red-700 font-medium">{error}</div>
        </div>
      </div>
    );
  }

  if (!flights.length) {
    return (
      <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200">
        <div className="flex items-center gap-3">
          <svg className="w-6 h-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <div className="text-yellow-700 font-medium">
            Không tìm thấy chuyến bay nào phù hợp với tiêu chí tìm kiếm
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-[#1A1D1F]">
            Đã tìm thấy {flights.length} chuyến bay
          </h2>
          <p className="text-gray-500 mt-1">
            {searchData.from} → {searchData.to}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <label className="text-sm text-gray-500">Sắp xếp theo:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#605DEC]/20 focus:border-[#605DEC]"
          >
            <option value="time_asc">Giờ khởi hành sớm nhất</option>
            <option value="time_desc">Giờ khởi hành muộn nhất</option>
            <option value="duration_asc">Thời gian bay ngắn nhất</option>
          </select>
        </div>
      </div>

      <div className="grid gap-4">
        {sortFlights(flights).map(renderFlightInfo)}
      </div>
    </div>
  );
};

export default FlightChoose;
