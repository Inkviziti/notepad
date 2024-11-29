import React, { useState } from 'react';

function App() {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const addOrEditNote = () => {
    if (currentNote.trim()) {
      if (editIndex !== null) {
        const updatedNotes = notes.map((note, i) =>
          i === editIndex ? currentNote : note
        );
        setNotes(updatedNotes);
        setEditIndex(null);
      } else {
        setNotes([...notes, currentNote]);
      }
      setCurrentNote('');
    }
  };

  const editNote = (index) => {
    setCurrentNote(notes[index]);
    setEditIndex(index);
  };

  const deleteNote = (index) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Блокнот</h1>
      <input
        type="text"
        value={currentNote}
        onChange={(e) => setCurrentNote(e.target.value)}
        placeholder="Введите текст"
      />
      <button onClick={addOrEditNote}>
        {editIndex !== null ? 'Сохранить' : 'Добавить'}
      </button>
      <ul>
        {notes.map((note, index) => (
          <li key={index} style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ flex: 1 }}>{note}</span>
            <button onClick={() => editNote(index)} style={{ marginRight: '5px' }}>
              Редактировать
            </button>
            <button onClick={() => deleteNote(index)} style={{ background: 'red', color: 'white' }}>
              Удалить
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
