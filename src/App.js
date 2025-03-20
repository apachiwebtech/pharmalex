import './App.css';
// import './Style.css';
import 'animate.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet, createBrowserRouter, useNavigate } from 'react-router-dom';
import Login from './component/Authentication/Login';
import DetailPage from './component/Pages/DetailPage';
import Home from './component/Pages/Home';
import Profile from './component/Pages/Profile';
import { useEffect } from 'react';
import Section from './component/Pages/Section'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Routing = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/chapter/:id',
        element: <Section />
      },
      {
        path: '/detailpage/:bookid',
        element: <DetailPage />
      },
      {
        path: '/profile',
        element: <Profile />
      },
      {
        path: '/login',
        element: <Login />
      },
     
      
    ]
  }
]
)



function checkLocalStorageAndRedirect(navigate) {
  const user_loggedin = localStorage.getItem('user_loggedin');
  if (user_loggedin !== "true") {
    navigate('/login'); // Redirect to dashboard if id exists in localStorage
  }
}

function App() {
  const navigate = useNavigate()

  useEffect(()=>{
    checkLocalStorageAndRedirect(navigate);
  },[navigate])
  return (
    <>
      {/* {window.location.pathname != "" && <Header /> } */}
      <Outlet />
     
    </>

  )
}

export default Routing;
