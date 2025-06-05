import { Route, Routes } from "react-router-dom";
import Home from "../../appointments/home/Home";
import List from "../../appointments/list/List";
import New from "../../appointments/new/New";
import NotFound from "../not-found/NotFound";

function Routing(): JSX.Element {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/all" element={<List />} />
            <Route path="/add-appointment" element={<New />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default Routing;