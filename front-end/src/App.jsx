import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Create from "./components/Create";
import Reaview_List from "./components/Reaview_List";
import Edit_review from "./components/Edit_review";
import Review from "./components/Review";



function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Reaview_List />} />
        <Route path="/create" element={<Create />} />
        <Route path="/edit/:id" element={<Edit_review />} />
        <Route path="/review/:id" element={<Review />} />
      </Routes>
    </Layout>
  );
}

export default App;
