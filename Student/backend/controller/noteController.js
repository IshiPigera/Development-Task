const note = require('../models/note')

/*create note*/
const postNotes = async(req,res)=>{
    try{
        const {title, description, date} = req.body;
         
        const newNote = new note({
            title,
            description,
            date,
            user_id: req.user.id,
            name: req.user.name  
        })
         await newNote.save()
         res.json({message:"Note created"})
    } catch(err){
        return res.status(500).json({message:err.message})
    }  

}

//get notes
const getNote =  async(req,res)=>{
    try{
        const notes= await note.find({user_id: req.user.id})
        res.json(notes)
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}


//get a specific note by id
const getANote=async(req,res)=>{
    try {
        const findnote = await note.findById(req.params.id)
        res.json(findnote)
    } catch (err) {
        return res.status(500).json({message: err.message})
    }

}


//update note details
const updateNote = async(req,res)=>{
    try {
        const {title, description, date} = req.body;
        await note.findOneAndUpdate({_id: req.params.id},{
            title,
            description,
            date
        })
        res.json({msg: "Note is updated"})
    } catch (err) {
        return res.status(500).json({message: err.message})
    }
}

//delete note
const deleteNote = async(req,res)=>{
    note.findByIdAndRemove(req.params.id).exec((err,deletedNote)=>{
        if(err){
            return res.status(400).json({
                message:"Couldn't delete the Note something is wrong!",deletedNote
            });
        }
        return res.status(200).json({
            success:"Note removed successfully!",deletedNote
        });
    });
};

module.exports = {
    postNotes,
    getNote,
    getANote,
    updateNote,
    deleteNote
}