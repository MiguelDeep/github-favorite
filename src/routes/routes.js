import React from 'react';
import { BrowserRouter ,createBrowserRouter} from 'react-router-dom';
import Main from '../pages/Main';
import Repositories from '../pages/Repositories';
import Erro from '../pages/Erro';




const Routes = createBrowserRouter([
  {
    path:'/',
    element : <Main />
  },
  {
    path:"/repositories/:repository",
    element : <Repositories />
  }
  ,
  {
    path:"*",
    element : <Erro />
  }
  ])

export default Routes;