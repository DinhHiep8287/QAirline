import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Footer, Navbar } from "./components";
import {
    Confirm,
    FlightExplore,
    Flights,
    Hotels,
    Packages,
    PassengerInfo,
    Payment,
    SeatSelect,
} from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./pages/Profile.jsx";
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import News from "./pages/admin/News";
import Planes from "./pages/admin/Planes";
import AdminFlights from "./pages/admin/Flights";
import Bookings from "./pages/admin/Bookings";
import Delays from "./pages/admin/Delays";

const App = () => {
    return (
        <>
            <div className="font-Nunito overflow-hidden max-w-[1440px] mx-auto">
                <Routes>
                    {/* Admin routes */}
                    <Route path="/admin" element={<AdminLayout />}>
                        <Route index element={<Dashboard />} />
                        <Route path="news" element={<News />} />
                        <Route path="planes" element={<Planes />} />
                        <Route path="flights" element={<AdminFlights />} />
                        <Route path="bookings" element={<Bookings />} />
                        <Route path="delays" element={<Delays />} />
                    </Route>

                    {/* Client routes */}
                    <Route path="/" element={
                        <>
                            <Navbar />
                            <Routes>
                                <Route index element={<Flights />} />
                                <Route path="profile" element={<Profile />} />
                                <Route path="hotels" element={<Hotels />} />
                                <Route path="packages" element={<Packages />} />
                                <Route path="explore" element={<FlightExplore />} />
                                <Route path="passenger-info" element={<PassengerInfo />} />
                                <Route path="seat-selection" element={<SeatSelect />} />
                                <Route path="payment" element={<Payment />} />
                                <Route path="confirm" element={<Confirm />} />
                            </Routes>
                            <Footer />
                        </>
                    } />
                </Routes>
                <ToastContainer
                    position="bottom-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                />
            </div>
        </>
    );
};

export default App;
