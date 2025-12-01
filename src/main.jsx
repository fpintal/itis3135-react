import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './App.jsx'
import Introduction from './Introduction.jsx'
import Contract from './Contract.jsx'
import Layout from './Layout.jsx'
import JsonPull from './json_pull.jsx'
import { BrowserRouter, Routes, Route } from 'react-router'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='introduction' element={<Introduction/>} />
          <Route path='contract' element={<Contract/>} />
          <Route path='students' element={<JsonPull/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
