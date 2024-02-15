import { Routes, Route } from "react-router-dom";

import Select from "pages/select";
import Rolling from "pages/rolling";

import "styles/global.scss";

function App() {
    return (
        <div className="wrap">
            <Routes>
                <Route path="/" element={<Select />}></Route>
                <Route path="/rolling" element={<Rolling />}></Route>
            </Routes>
        </div>
    );
}

export default App;
