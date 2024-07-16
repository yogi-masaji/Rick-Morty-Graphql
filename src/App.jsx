import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CharacterList from "./pages/characterList";
import CharacterDetail from "./pages/characterDetail";
import CharacterByLocation from "./pages/characterByLocation";
import Layout from "./components/layouts/layout";
import NotFoundPage from "./pages/404";
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
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Layout>
        </Router>
    );
};

export default App;
