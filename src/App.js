import { BrowserRouter, Route, Routes, Link, HashRouter } from "react-router-dom";
import "./App.scss"
import Context from './components/Context';
import Pics from "./components/Pics";
import Header from "./components/Header";
import Main from "./components/Main";
import Dropdown from "./components/Dropdown";
import SelectGame from "./components/SelectGame";
import QuestionGame from "./components/QuestionGame";

function App() {
  return (
    <Context>
      <section className="main">
          <HashRouter>
            <Header/>
            <Routes>
              <Route path="/" element={<Main/>}/>
              <Route path="/pics" element={<Pics/>}/>
              <Route path="/dropdown" element={<Dropdown/>}/>
              <Route path="/selectgame" element={<SelectGame/>}/>
              <Route path="/questiongame" element={<QuestionGame/>}/>
            </Routes>
          </HashRouter>
      </section>
    </Context>
  );
}

export default App;
