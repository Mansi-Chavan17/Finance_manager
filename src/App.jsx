import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Expenses from './components/Expenses.jsx'
import Home from './components/Home.jsx'
import Income from './components/Income.jsx'

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/income" element={<Income />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
