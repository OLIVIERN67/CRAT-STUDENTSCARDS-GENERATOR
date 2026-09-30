import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './card.css'
import Home from './pages/Home'
import Editor from './pages/Editor'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editor/:schoolId" element={<Editor />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}