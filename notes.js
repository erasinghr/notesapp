const fs = require('fs');
const chalk = require('chalk')
const getNotes = () => {
    return('Your notes ....')
}
let found;
const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNotes = notes.filter(function(note){
        return note.title === title;
    });
    if (duplicateNotes.length === 0){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes);
        console.log('New note added!')
    }else{
        console.log('Note title taken!');
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);

}

const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    }
    catch (e) {
        return []
    }
}
const removeNote = (title) => {
    // console.log(`title to be removed ${title}`)
    const notes = loadNotes();
    const notesToKeep = notes.filter(function (note) {
        if (note.title === title){
            found = true;
        }
        return note.title !== title;
    });
    if (found) {
        saveNotes(notesToKeep);
        console.log(chalk.green('Title Removed'));
    } else {
        console.log(chalk.red('Title not present'));
    }
}

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.inverse('Your Notes'))
    notes.forEach((note) => {
        console.log(note.title)
    })
}
module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes
};