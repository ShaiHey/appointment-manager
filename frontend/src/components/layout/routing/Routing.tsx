import { Route, Routes } from "react-router-dom";
import Home from "../../appointments/home/Home";
import List from "../../appointments/list/List";

function Routing(): JSX.Element {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/all" element={<List />} />
            {/* <Route path="/add-appointment" element={<Feed />} />
            <Route path="/all" element={<EditPost />} />
            <Route path="*" element={<NotFound />}/> */}
        </Routes>
    )
}

export default Routing;