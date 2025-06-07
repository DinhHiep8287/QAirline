import { useState } from "react";
import { Link } from "react-router-dom";

const FlightChoose = ({ searchData }) => {
  const flights = [
    {
      id: 1,
      time: {
        departure: "07:10",
        arrival: "09:20"
      },
      stations: {
        from: "SGN",
        to: "HAN"
      },
      terminal: "Nhà ga 1",
      type: "Bay thẳng",
      duration: "2h 10min",
      classes: {
        economy: {
          price: "2.380.500",
          seats: 5,
          available: true
        },
        business: {
          available: false
        }
      }
    },
    {
      id: 2,
      time: {
        departure: "09:25",
        arrival: "11:35"
      },
      stations: {
        from: "SGN",
        to: "HAN"
      },
      terminal: "Nhà ga 1",
      type: "Bay thẳng",
      duration: "2h 10min",
      classes: {
        economy: {
          price: "2.380.500",
          seats: 2,
          available: true
        },
        business: {
          price: "5.372.500",
          seats: 1,
          available: true
        }
      }
    },
    {
      id: 3,
      time: {
        departure: "10:40",
        arrival: "12:50"
      },
      stations: {
        from: "SGN",
        to: "HAN"
      },
      terminal: "Nhà ga 1",
      type: "Bay thẳng",
      duration: "2h 10min",
      classes: {
        economy: {
          price: "2.607.500",
          available: false
        },
        business: {
          available: false
        }
      }
    }
  ];

  const renderFlightInfo = (flight) => (
    <div className="flex flex-col">
      <div className="flex items-center">
        <div className="flex-1 flex items-center">
          <div className="flex flex-col">
            <span className="text-[#1A1D1F]">{flight.time.departure}</span>
            <span className="text-[#6F767E] text-sm">{flight.stations.from}</span>
            <span className="text-[#6F767E] text-sm">{flight.terminal}</span>
          </div>
          <div className="flex-1 mx-4 relative">
            <div className="border-t border-dashed border-[#1A1D1F]"></div>
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-white px-2 text-[#1A1D1F] text-sm whitespace-nowrap">
              {flight.type}
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-[#1A1D1F]">{flight.time.arrival}</span>
            <span className="text-[#6F767E] text-sm">{flight.stations.to}</span>
            <span className="text-[#6F767E] text-sm">{flight.terminal}</span>
          </div>
        </div>
        <div className="ml-8">
          <div className="flex items-center gap-2">
            <span className="text-[#1A1D1F]">○</span>
            <span className="text-[#6F767E] text-sm">{flight.duration}</span>
          </div>
          <Link to="#" className="text-[#006AFF] text-sm hover:underline mt-1 block">
            Xem chi tiết hành trình
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {renderClassCard("Economy", flight.classes.economy)}
        {renderClassCard("Business", flight.classes.business)}
      </div>
    </div>
  );

  const renderClassCard = (type, data) => {
    if (!data?.available) {
      return (
        <div className="bg-[#F1F1F1] rounded-lg p-4">
          <div className="flex justify-between items-center">
            <span className="text-[#1A1D1F]">{type}</span>
          </div>
          <div className="text-[#6F767E] mt-2">Hết hạng đặt chỗ</div>
        </div>
      );
    }

    const bgColor = type === "Economy" ? "#67A76F" : "#1B3764";
    
    return (
      <div 
        className="rounded-lg p-4 relative cursor-pointer"
        style={{ backgroundColor: bgColor }}
      >
        <div className="absolute right-2 top-2 bg-[#1B3764] text-white text-xs px-2 py-1 rounded-full">
          {data.seats} chỗ còn lại
        </div>
        <div>
          <div className="text-white">{type}</div>
          <div className="text-white text-sm mt-1">từ</div>
          <div className="text-white text-xl mt-1">
            {data.price}
            <span className="text-sm ml-1">VND</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="space-y-4">
        {flights.map((flight) => (
          <div key={flight.id} className="bg-white p-4 rounded-lg shadow-sm">
            {renderFlightInfo(flight)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlightChoose;
