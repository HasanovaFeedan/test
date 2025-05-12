import Home from "../pages/Site/Home/Home";
import SiteRoot from "../pages/Site/SiteRoot";



const ROOT=[
    {
path:"/",
element:<SiteRoot/>,
children:[
    {
        path:"",
        element:<Home/>,
}
]

}
]
export default ROOT