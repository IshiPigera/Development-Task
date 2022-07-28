import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'

export default function EditNote({match}) {
    const [note, setNote] = useState({
        title: '',
        description: '',
        date: '',
        id: ''
    })
    const history = useHistory()

    useEffect(() =>{
        const getNote = async () =>{
            const token = localStorage.getItem('myToken')
            if(match.params.id){
                const res = await axios.get(`http://localhost:8081/student/note/getnote/${match.params.id}`, {
                    headers: {Auth: token}
                })
                setNote({
                    title: res.data.title,
                    description: res.data.description,
                    date: res.data.date,
                    id: res.data._id
                })
            }
        }
        getNote()
    },[match.params.id])

    const onChangeInput = e => {
        const {name, value} = e.target;
        setNote({...note, [name]:value})
    }


    const editNote = async e => {
        e.preventDefault()
        try {
            const token = localStorage.getItem('myToken')
            if(token){
                const {title, description, date, id} = note;
                const newNote = {
                    title, description, date
                }

                await axios.put(`http://localhost:8081/student/note/update/${id}`, newNote, {
                    headers: {Auth: token}
                })
                
                history.push('/')
            }
        } catch (err) {
            window.location.href = "/";
        }
    }

    return (
        <div className="create-note">
            <h2>Edit Note</h2>
            <form onSubmit={editNote} autoComplete="off">
                <div className="row">
                    <label htmlFor="title">Title</label>
                    <input type="text" value={note.title} id="title"
                    name="title" required onChange={onChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="description">Description</label>
                    <textarea type="text" value={note.description} id="description"
                    name="description" required rows="10" onChange={onChangeInput} />
                </div>

                <label htmlFor="date">Date: {note.date} </label>
                <div className="row">
                    <input type="date" id="date"
                    name="date" onChange={onChangeInput} />
                </div>

                <button type="submit"><a href="/">Save</a></button>
            </form>
        </div>
    )
}
