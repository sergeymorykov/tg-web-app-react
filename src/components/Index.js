import SignUp from "./Auth/SignUp";
import Header from "./Navbar/Header";
import EventList from "./EventList/EventList";
import EventForm from "./EventForm/EventForm";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

export default function Index(props) {
    const { isLoggedIn, setLoggedIn } = props;

    return (
        <div>
            <Header isLoggedIn={isLoggedIn} />
            <BrowserRouter>
                <Routes>
                    <Route path="/signup" element={<SignUp setIsLoggedIn={setLoggedIn} />} />
                    <Route path="/events" element={<EventList setIsLoggedIn={setLoggedIn} />} />
                    <Route path="/eventform" element={<EventForm/>} />
                </Routes>                
            </BrowserRouter>
        </div>
    );
}
