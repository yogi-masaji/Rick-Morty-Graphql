import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CharacterList from "./pages/characterList";
import CharacterDetail from "./pages/characterDetail";
import CharacterByLocation from "./pages/characterByLocation";
import Layout from "./components/layouts/layout";
const App = () => {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<CharacterList />} />
                    <Route
                        path="/character/:id"
                        element={<CharacterDetail />}
                    />
                    <Route
                        path="/location/:id"
                        element={<CharacterByLocation />}
                    />
                </Routes>
            </Layout>
        </Router>
    );
};

export default App;
