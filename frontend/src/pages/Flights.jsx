import { FlightDeals, Hero } from "../components"
import Places from "../components/Places"
import News from "../components/News"

const Flights = () => {
  return (
    <>
    <div className="mt-[70px]">
     <Hero/>
    </div>
    <div className="mt-[40px]">
      <FlightDeals/>
    </div>
    <div className="mt-[60px]">
     <Places/>
    </div>
    <div className="mt-[60px]">
     <News/>
    </div>
    </>
  )
}

export default Flights