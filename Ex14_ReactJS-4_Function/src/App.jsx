import { Route, Routes} from "react-router-dom";
import Login from './Components/Login'
import PrivateRoute from './Components/PrivateRoute'
import CategoryDetails from "./Components/CategoryDetails";
import CategoryList from "./Components/CategoryList"
function App() {
    return(

      <div className="App">  
          <Routes>
            <Route path="/login" element = {<Login/>} />
            <Route path="/" element = {< PrivateRoute/>}>
                <Route index element = {<CategoryList />}/>
                <Route path="/details/:id" element = {<CategoryDetails/>}/>
            </Route>
          </Routes>
      </div>
    )
  
}

export default App
