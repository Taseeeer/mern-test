import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddItem from "./components/AddItem";
import Cart from "./components/Cart";
import Home from "./components/Home";
import Items from "./components/Items";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/items" element={ <Items />} />
        <Route path="/" element={ <Home /> } />
        <Route path="/cart" element={ <Cart /> } />
        <Route path="/additem" element={ <AddItem /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
