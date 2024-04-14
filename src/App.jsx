import Routes from './routes/routes';
import { Route, RouterProvider } from "react-router-dom"
import React from 'react';
import Globalstyle from './style/global';


export default function App() {
  return (
    <>
      <Globalstyle />
      <RouterProvider router={Routes} />
    </>
  );
}
