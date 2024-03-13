
import './App.css';
import {Routes,Route} from 'react-router-dom'
import Login from './components/account/Login';

function App() {
  return (
    <div className="App" style={{marginTop:"63px",backgroundColor:"030637"}}>
      <Routes>
        <Route path="/" element={<Login/>} />
      </Routes>

    </div>
  );
}

export default App;
