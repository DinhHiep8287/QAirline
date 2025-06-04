import { useState } from "react";
import { map } from "../assets/images";
import {
  delta,
  france,
  hawaiian,
  japan,
  quantas,
  united,
} from "../assets/logo";
import { FlightCard, PriceDetails, PriceGraph } from "../container";
import { Link } from "react-router-dom";

const FlightChoose = ({ searchData }) => {
  const [priceShown, setPriceShow] = useState(true);

  // Mock flight data based on search
  const getFlights = () => {
    return [
      {
        img: japan,
        duration: "2h 30m",
        name: "Japan Airlines",
        time: "10:00 AM - 12:30 PM",
        stop: "Bay thẳng",
        price: "2,590,000₫",
        trip: searchData.endDate ? "khứ hồi" : "một chiều"
      },
      {
        img: united,
        duration: "2h 45m",
        name: "Bamboo Airways",
        time: "11:15 AM - 2:00 PM",
        stop: "Bay thẳng",
        price: "2,890,000₫",
        trip: searchData.endDate ? "khứ hồi" : "một chiều"
      },
      {
        img: delta,
        duration: "2h 35m",
        name: "Vietnam Airlines",
        time: "13:30 PM - 16:05 PM",
        stop: "Bay thẳng",
        price: "3,190,000₫",
        trip: searchData.endDate ? "khứ hồi" : "một chiều"
      }
    ];
  };

  return (
    <>
      <div className="flex lg:flex-row flex-col items-start justify-between gap-16 ">
        <div className="w-full lg:w-[872px] h-full flex flex-col gap-5">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-[#6E7491] text-lg leading-6 font-semibold mb-2">
                Chọn chuyến bay {searchData.endDate ? "khứ hồi" : "một chiều"}
              </h1>
              <p className="text-[#7C8DB0]">
                {searchData.from} → {searchData.to}
              </p>
              <p className="text-[#7C8DB0]">
                {searchData.adult} người lớn{searchData.minor > 0 ? `, ${searchData.minor} trẻ em` : ''}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[#605DEC] font-medium">Sắp xếp theo:</p>
              <select className="mt-1 p-2 border border-[#CBD4E6] rounded text-[#6E7491]">
                <option value="price">Giá thấp nhất</option>
                <option value="time">Thời gian bay</option>
                <option value="departure">Giờ khởi hành</option>
              </select>
            </div>
          </div>

          <div className="w-full flex flex-col gap-4 mt-4">
            {getFlights().map((flight, index) => (
              <div
                key={index}
                className={`w-full cursor-pointer border-b-[1px] border-[#E9E8FC] hover:bg-[#F6F6FE] transition-all duration-300 ${
                  index === getFlights().length - 1 ? '' : 'border-b'
                }`}
                onClick={() => setPriceShow(false)}
              >
                <FlightCard
                  img={flight.img}
                  duration={flight.duration}
                  name={flight.name}
                  time={flight.time}
                  stop={flight.stop}
                  price={flight.price}
                  trip={flight.trip}
                />
              </div>
            ))}
          </div>

          <div className="w-full lg:mt-12">
            <img src={map} alt="map" className="w-full h-full object-cover" />
          </div>
        </div>

        {priceShown && (
          <PriceGraph />
        )}
      </div>
    </>
  );
};

export default FlightChoose;
