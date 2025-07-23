from sqlalchemy.orm import Session
import models, schemas

def get_notes(db: Session):
    return db.query(models.Note).all()

def get_note(db: Session, note_id: int):
    return db.query(models.Note).filter(models.Note.id == note_id).first()

def create_note(db: Session, note: schemas.NoteCreate):
    db_note = models.Note(title=note.title, content=note.content)
    db.add(db_note)
    db.commit()
    db.refresh(db_note)
    return db_note

def delete_note(db: Session, note_id: int):
    note = db.query(models.Note).get(note_id)
    if note:
        db.delete(note)
        db.commit()
        return True
    return False

def update_note(db: Session, note_id: int, note: schemas.NoteCreate):
    db_note = db.query(models.Note).get(note_id)
    if db_note:
        db_note.title = note.title
        db_note.content = note.content
        db.commit()
        return db_note
    return None
