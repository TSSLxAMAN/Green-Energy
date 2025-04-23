import './App.css'
import { createBrowserRouter } from "react-router-dom";
import Layout from './components/Layout';
import Home from './components/Home';
import Favrouite from './components/Favrouite';
import {RouterProvider } from 'react-router-dom'

function App() {
  const route = createBrowserRouter([
    {
      path:"/",
      element:<Layout/>,
      children:[
        {
          path:"",
          element:<Home/>
        },
        {
          path:"fav",
          element:<Favrouite/>
        }
      ]
    }
  ])
  return (
    <>
      <RouterProvider router={route}/>
    </>
  )
}

export default App
