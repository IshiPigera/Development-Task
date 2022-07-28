import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

export default function Home() {
    const [notes, setNotes] = useState([])
    const [token, setToken] = useState('')

    const getNotes = async (token) =>{
        const res = await axios.get('http://localhost:8081/student/note/get', {
            headers:{Auth: token}
        })
        setNotes(res.data)
    }

    useEffect(() =>{
        const token = localStorage.getItem('myToken')
        setToken(token)
        if(token){
            getNotes(token)
        }
    }, [])

    const deleteNote = async (id) =>{
        try {
            if(token){
                await axios.delete(`http://localhost:8081/student/note/delete/${id}`, {
                    headers: {Auth: token}
                })
                getNotes(token)
            }
        } catch (error) {
            window.location.href = "/";
        }
    }

    return (
        <div className="note-wrapper">
            {
                notes.map(note =>(
                    <div className="card" key={note._id}>
                        <h4 title={note.title}>{note.title}</h4>
                        <div className="text-wrapper">
                            <p>{note.description}</p>
                        </div>
                        <p className="date">{(note.date)}</p>
                        <br></br>
                         
                        <br></br>
                        <div className="row my-5">
                            <a href={`edit/${note._id}`} 
                            className="editbutton" >
                                Edit Note
                                </a>
                        <button className="delbutton" 
                        onClick={() => deleteNote(note._id)} >Delete Note</button>
                        </div>
                    </div>
                ))
            }
            
        </div>
    )
}
