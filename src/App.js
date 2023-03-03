import Index from './layouts/Index';
import Authorization from './layouts/Authorization';
import WaterResistance from './layouts/WaterResistance';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Manager from './layouts/Manager';

function App() {
  return (
    <div className="container-fluid p-0 m-0">
      <Router>
        <Routes>
          <Route path="/auth" element={ <Authorization /> } />
          {/* <Route path="/" exact element={ <Index /> } />         */}
          <Route path="/manager" element={ <Manager /> }>        
            <Route path="waterresistance" element={ <WaterResistance /> } />  
          </Route>      
        </Routes>
      </Router>
    </div>
  );
}

export default App;
