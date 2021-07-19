import React from 'react'
import { Link } from 'react-router-dom'

export default function NavBar() {
    return (
        <div className="navbar">
            <h1 className="store">TOY-STORE</h1>
            <Link to="/items" className="navLink"><h1>PRODUCT</h1></Link>
            <Link to="/items" className="navLink"><h1>FEATURED</h1></Link>
            <form>
                <input className="navinput"></input>
            </form>
            <Link to="/items" className="navProfile"><h1>👤</h1></Link>
            <Link to="/items" className="navcar"><h1>🛅</h1></Link>
            <Link to="/items/new" ><button className="navButton">New Items</button></Link>
        </div>
    )
}
