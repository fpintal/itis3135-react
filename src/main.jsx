import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './App.jsx'
import Introduction from './Introduction.jsx'
import Contract from './Contract.jsx'
import Layout from './Layout.jsx'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import { BrowserRouter, Routes, Route } from 'react-router'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}></Route>
        <Route index element={<Home />} />  
        <Route path='/introduction' element={<Introduction/>}></Route>
        <Route path ='/contract' element={<Contract/>}></Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
