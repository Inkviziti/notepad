import React, { useState } from 'react';

function App() {
  //notes - будет храниться список заметок( изначально пустой массив)
  //currentNote - ввод заметки
  //editIndex - отслеживать индекс редактируемой заметки   
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  //Функция добавления или редактирования
  const addOrEditNote = () => {
    //Проверка поле заметки на пустоту
    if (currentNote.trim()) {
      //Если есть индекс редактируемой записки
      if (editIndex !== null) {
        //создаем новый массив, заменяя заметку на текущем индексе
        const updatedNotes = notes.map((note, i) =>
          i === editIndex ? currentNote : note
        );
        //Обновляем состояние
        setNotes(updatedNotes);
        //Сбрасываем 
        setEditIndex(null);
      } else {
        //Если null добавляем новую заметку
        setNotes([...notes, currentNote]);
      }
      //Очистка поля ввода
      setCurrentNote('');
    }
  };
  //Редактирование заметки
  const editNote = (index) => {
    //устанавливаем текст заметки в поле ввода
    setCurrentNote(notes[index]);
    //устанавливаем текущий индекс для редактируемой заметки
    setEditIndex(index);
  };

  //Удаление заметки
  const deleteNote = (index) => {
    //Удаляем заметку с указанным индексом
    setNotes(notes.filter((_, i) => i !== index));
  };

  //return() Все что в скобках будет отображаться на экране
  //Контейнер с отступами и шрифтом
  //Кнопка добавить/сохранить
  //ul- список для отображения заметок
  //notes.map - переборка массива и отображение заметок
  //Кнопки редактирование и удаление
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
