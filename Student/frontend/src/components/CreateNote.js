import React, {useState} from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'

export default function CreateNote() {
    const [note, setNote] = useState({
        title: '',
        description: '',
        date: ''
    })
    const history = useHistory()

    const onChangeInput = e => {
        const {name, value} = e.target;
        setNote({...note, [name]:value})
    }


    const createNote = async e => {
        e.preventDefault()
        try {
            const token = localStorage.getItem('myToken')
            if(token){
                const {title, description, date} = note;
                const newNote = {
                    title, description, date
                }

                await axios.post('http://localhost:8081/student/note/post', newNote, {
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
            <h2>Create Note</h2>
            <form onSubmit={createNote} autoComplete="off">
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

                <div className="row">
                    <label htmlFor="date">Date</label>
                    <input type="date" value={note.date} id="date"
                    name="date"  onChange={onChangeInput} />
                </div>
                
                <button type="submit"><a href="/">Save</a></button>
            </form>
        </div>
    )
}
