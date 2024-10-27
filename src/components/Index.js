import SignUp from "./Auth/SignUp";
import View from "./User/View";
import EditProfile from "./User/Edit";
import Header from "./Navbar/Header";
import EventList from "./EventList/EventList";
import EventForm from "./EventForm/EventForm";
import ListUsers from "./ListUsers/ListUsers";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import UserList from "./User/UserList";



export default function Index(props) {
    const { isLoggedIn, setLoggedIn } = props
    return (
        <div>
            <Header isLoggedIn={isLoggedIn} />
            <BrowserRouter>
                <Routes>
                    <Route path="/signup" element={<SignUp setIsLoggedIn={setLoggedIn} />}/>
                    <Route path="/events" element={<EventList setIsLoggedIn={setLoggedIn} />} />
                    <Route path="/eventform" element={<EventForm/>} />
                    <Route path="/view" element={<View setIsLoggedIn={setLoggedIn} />}/>
                    <Route path="/user-list" element={<UserList setIsLoggedIn={setLoggedIn} />}/>
                    <Route path="/edit-profile" element={<EditProfile setIsLoggedIn={setLoggedIn} />}/>
                    <Route path="/users" element={<ListUsers setIsLoggedIn={setLoggedIn} />}/>
                </Routes>                
            </BrowserRouter>
        </div>

    )
}