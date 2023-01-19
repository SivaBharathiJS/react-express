import { BrowserRouter, Routes,Route } from "react-router-dom";
import P1 from './pages/D1'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' exact element={<P1/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
