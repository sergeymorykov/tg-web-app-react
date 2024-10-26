import SignUp from "./Auth/SignUp";
import Header from "./Navbar/Header";
import EventList from "./EventList/EventList"; // Замените на правильный путь к компоненту EventList
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

const events = [
    { event_id: '1', event_name: 'Игра в PS', description: 'Описание', created_by: '1', event_date: '2024-10-30 18:00:00' },
    { event_id: '2', event_name: 'Встреча с друзьями', description: 'Ужин в ресторане', created_by: '2', event_date: '2024-11-05 19:00:00' },
    { event_id: '3', event_name: 'Спортивная тренировка', description: 'Футбол в парке', created_by: '1', event_date: '2024-10-28 16:00:00' },
    { event_id: '4', event_name: 'Киноночь', description: 'Просмотр нового фильма', created_by: '3', event_date: '2024-11-01 21:00:00' },
    { event_id: '5', event_name: 'Поход в горы', description: 'Поход с друзьями', created_by: '2', event_date: '2024-11-10 08:00:00' },
    { event_id: '1', event_name: 'Игра в PS', description: 'Описание', created_by: '1', event_date: '2024-10-30 18:00:00' },
    { event_id: '2', event_name: 'Встреча с друзьями', description: 'Ужин в ресторане', created_by: '2', event_date: '2024-11-05 19:00:00' },
    { event_id: '3', event_name: 'Спортивная тренировка', description: 'Футбол в парке', created_by: '1', event_date: '2024-10-28 16:00:00' },
    { event_id: '4', event_name: 'Киноночь', description: 'Просмотр нового фильма', created_by: '3', event_date: '2024-11-01 21:00:00' },
    { event_id: '5', event_name: 'Поход в горы', description: 'Поход с друзьями', created_by: '2', event_date: '2024-11-10 08:00:00' },
];

export default function Index(props) {
    const { isLoggedIn, setLoggedIn } = props;

    return (
        <div>
            <Header isLoggedIn={isLoggedIn} />
            <BrowserRouter>
                <Routes>
                    <Route path="/signup" element={<SignUp setIsLoggedIn={setLoggedIn} />} />
                    <Route path="/events" element={<EventList events={events} setIsLoggedIn={setLoggedIn} />} />
                </Routes>                
            </BrowserRouter>
        </div>
    );
}
