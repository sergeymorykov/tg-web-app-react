import SignUp from "./Auth/SignUp";
import View from "./User/View";
import EditProfile from "./User/Edit";
import Header from "./Navbar/Header";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import { Edit } from "@material-ui/icons";



export default function Index(props) {
    const { isLoggedIn, setLoggedIn } = props
    return (
        <div>
            <Header isLoggedIn={isLoggedIn} />
            <BrowserRouter>
                <Routes>
                    <Route path="/signup" element={<SignUp setIsLoggedIn={setLoggedIn} />}>
                    </Route>
                    <Route path="/view" element={<View setIsLoggedIn={setLoggedIn} />}>
                    </Route>
                    <Route path="/edit-profile" element={<EditProfile setIsLoggedIn={setLoggedIn} />}>
                    </Route>
                </Routes>                
            </BrowserRouter>
        </div>

    )
}