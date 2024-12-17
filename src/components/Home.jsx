import React from 'react'
import {Link} from 'react-router-dom'
import './Home.css'

const Home = () => {
  return (
    <div className='home-container'>
        <h1 className='home-title'>Welcome !</h1>
        <p className='home-description'>Finance Goals</p>
        <nav>
            <ul className='home-list'>
                <li className='home-items'><Link to="/income">Income</Link></li>
                <li className='home-items'><Link to="/expenses">Expenses</Link></li>
                <li className='home-items'><Link to="/transactions">Transaction</Link></li>
                <li className='home-items'><Link to="/savings">Savings</Link></li>
            </ul>
        </nav>
    </div>
  )
}

export default Home