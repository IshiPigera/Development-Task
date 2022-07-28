import React from 'react'
import Header from './components/Navbar'
import Home from './pages/Home'
import CreateNote from './components/CreateNote'
import EditNote from './components/EditNote'
import {BrowserRouter as Router, Route} from 'react-router-dom'

export default function Notes({setIsLogin}) {
    return (
        <Router>
        <div className="notes-page">
            <Header setIsLogin={setIsLogin} />
            <section>
                <Route path="/" component={Home} exact />
                <Route path="/create" component={CreateNote} exact />
                <Route path="/edit/:id" component={EditNote} exact />
            </section>
            
        </div>
        </Router>
    )
}
