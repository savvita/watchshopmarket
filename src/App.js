import Index from './layouts/Index';
import Authorization from './layouts/Authorization';
import WaterResistance from './layouts/WaterResistance';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Manager from './layouts/Manager';
import Admin from './layouts/Admin';
import Delivery from './layouts/Delivery';
import Payment from './layouts/Payment';
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
import NP from './layouts/NP';
import Orders from './layouts/Orders';
import OrderDetail from './layouts/OrderDetail';
import WaterResistanceDetail from './layouts/WaterResistanceDetail';
import StyleDetail from './layouts/StyleDetail';
import GenderDetail from './layouts/GenderDetail';
import GlassTypeDetail from './layouts/GlassTypeDetail';
import CaseShapeDetail from './layouts/CaseShapeDetail';
import BrandDetail from './layouts/BrandDetail';
import ColorDetail from './layouts/ColorDetail';
import CollectionDetail from './layouts/CollectionDetail';
import StrapTypeDetail from './layouts/StrapTypeDetail';
import MovementTypeDetail from './layouts/MovementTypeDetail';
import MaterialDetail from './layouts/MaterialDetail';
import IncrustationTypeDetail from './layouts/IncrustationTypeDetail';
import FunctionDetail from './layouts/FunctionDetail';
import DialTypeDetail from './layouts/DialTypeDetail';
import CountryDetail from './layouts/CountryDetail';
import WatchDetail from './layouts/WatchDetail';
import ReviewTable from './components/ReviewTable/ReviewTable';
import Users from './layouts/Users';
import Files from './layouts/Files';
import About from './layouts/About';
import DeliveryPayment from './layouts/DeliveryPayment';
import Returning from './layouts/Returning';

function App() {
  return (
    <div className="container-fluid p-0 m-0">
      <Router>
        <Routes>
          <Route path="/" element={ <Main /> }>
            <Route path="/" exact element={ <Index /> } />        
            <Route path="about" element={ <About /> } />        
            <Route path="payment" element={ <DeliveryPayment /> } />        
            <Route path="return" element={ <Returning /> } />        
            <Route path="signin" element={ <Authorization signIn /> } />  
            <Route path="signup" element={ <Authorization signUp /> } />  
            <Route path="catalog" element={ <Catalog /> } />
            <Route path="basket" element={ <Basket /> } />
            <Route path="myorders" element={ <Orders isUserMode={ true } /> } />
            <Route path="watches/:id" element={ <WatchInfoPage /> } />
            <Route path="orders/:id" element={ <OrderDetail isManagerMode={ false } /> } />
          </Route>
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
            <Route path="orders" element={ <Orders isManagerMode={ true } /> } />
            <Route path="orders/new" element={ <Orders statusses={ [1] } /> } />  
            <Route path="reviews/new" element={ <ReviewTable /> } />  
            <Route path="orders/:id" element={ <OrderDetail isManagerMode={ true } /> } />
            <Route path="waterresistance/:id" element={ <WaterResistanceDetail /> } />
            <Route path="style/:id" element={ <StyleDetail /> } />
            <Route path="straptype/:id" element={ <StrapTypeDetail /> } />
            <Route path="movementtype/:id" element={ <MovementTypeDetail /> } />
            <Route path="material/:id" element={ <MaterialDetail /> } />
            <Route path="country/:id" element={ <CountryDetail /> } />
            <Route path="incrustationtype/:id" element={ <IncrustationTypeDetail /> } />
            <Route path="glasstype/:id" element={ <GlassTypeDetail /> } />
            <Route path="watch/:id" element={ <WatchDetail /> } />
            <Route path="gender/:id" element={ <GenderDetail /> } />
            <Route path="function/:id" element={ <FunctionDetail /> } />
            <Route path="dialtype/:id" element={ <DialTypeDetail /> } />
            <Route path="color/:id" element={ <ColorDetail /> } />
            <Route path="collection/:id" element={ <CollectionDetail /> } />
            <Route path="caseshape/:id" element={ <CaseShapeDetail /> } />
            <Route path="brand/:id" element={ <BrandDetail /> } />
          </Route>      
          <Route path="/admin" element={ <Admin /> }>
            <Route path="payment" element={ <Payment /> } />
            <Route path="delivery" element={ <Delivery /> } />
            <Route path="np" element={ <NP /> } />
            <Route path="users" element={ <Users /> } />
            <Route path="files" element={ <Files /> } />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
