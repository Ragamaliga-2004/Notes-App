import { useEffect, useState } from 'react';
import API from './api';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const res = await API.get('/notes/');
    setNotes(res.data);
  };

  const handleAddOrUpdate = async (note) => {
    if (note.id) {
      await API.put(`/notes/${note.id}`, note);
    } else {
      await API.post('/notes/', note);
    }
    setEditingNote(null);
    fetchNotes();
  };

  const handleDelete = async (id) => {
    await API.delete(`/notes/${id}`);
    fetchNotes();
  };

  return (
    <div className="app">
      <h1>📝 Notes App</h1>
      <NoteForm onSubmit={handleAddOrUpdate} editingNote={editingNote} />
      <NoteList notes={notes} onDelete={handleDelete} onEdit={setEditingNote} />
    </div>
  );
}

export default App;
