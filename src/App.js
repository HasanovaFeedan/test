import { createBrowserRouter, RouterProvider } from "react-router";
import "./Reset.css"
import ROOT from "./router/Index.routes";


function App() {
  const root=createBrowserRouter(ROOT)
  return (
  
      <div className="App">
        <RouterProvider router={root}/>
      
      </div>

  );
}

export default App;
