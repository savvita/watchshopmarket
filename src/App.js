import Index from './layouts/Index';
import Authorization from './layouts/Authorization';
import WaterResistance from './layouts/WaterResistance';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Manager from './layouts/Manager';
import Style from './layouts/Style';
import CaseShape from './layouts/CaseShape';
import Collection from './layouts/Collection';
import Color from './layouts/Color';
import Country from './layouts/Country';
import DialType from './layouts/DialType';
import Function from './layouts/Function';
import Gender from './layouts/Gender';
import GlassType from './layouts/GlassType';
import IncrustationType from './layouts/IncrustationType';
import Material from './layouts/Material';
import MovementType from './layouts/MovementType';
import StrapType from './layouts/StrapType';
import Brand from './layouts/Brand';
import Watch from './layouts/Watch';
import Catalog from './layouts/Catalog/Catalog';
import Main from './layouts/Main';
import Basket from './layouts/Basket';
import WatchInfoPage from './components/WatchInfoPage/WatchInfoPage';

function App() {
  return (
    <div className="container-fluid p-0 m-0">
      <Router>
        <Routes>
          <Route path="/auth" element={ <Authorization /> } />
          <Route path="/" element={ <Main /> }>
            <Route path="signin" element={ <Authorization signIn /> } />  
            <Route path="signup" element={ <Authorization signUp /> } />  
            <Route path="catalog" element={ <Catalog /> } />
            <Route path="basket" element={ <Basket /> } />
            <Route path="watches/:id" element={ <WatchInfoPage /> } />
          </Route>
          {/* <Route path="/" exact element={ <Index /> } />         */}
          <Route path="/manager" element={ <Manager /> }>        
            <Route path="waterresistance" element={ <WaterResistance /> } />  
            <Route path="style" element={ <Style /> } />  
            <Route path="caseshape" element={ <CaseShape /> } />  
            <Route path="collection" element={ <Collection /> } />  
            <Route path="brand" element={ <Brand /> } />  
            <Route path="color" element={ <Color /> } />  
            <Route path="country" element={ <Country /> } />  
            <Route path="dialtype" element={ <DialType /> } />  
            <Route path="function" element={ <Function /> } />  
            <Route path="gender" element={ <Gender /> } />  
            <Route path="glasstype" element={ <GlassType /> } />  
            <Route path="incrustationtype" element={ <IncrustationType /> } />  
            <Route path="material" element={ <Material /> } />  
            <Route path="movementtype" element={ <MovementType /> } />  
            <Route path="straptype" element={ <StrapType /> } />  
            <Route path="watch" element={ <Watch /> } />  
          </Route>      
        </Routes>
      </Router>
    </div>
  );
}

export default App;
