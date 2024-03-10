package de.aaron.note;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NoteService {
	
    private final NoteRepository noteRepository;

    @Autowired
    public NoteService(NoteRepository noteRepository) {
        this.noteRepository = noteRepository;
    }
	
	public List<Note> findAll() {
		return noteRepository.findAll();
	}
	
	public Optional<Note> findById(Long id) {
		return noteRepository.findById(id);
	}
	
	public Note save(Note note) {
		return noteRepository.save(note);
	}
	
	public void deleteById(Long id) {
		noteRepository.deleteById(id);
	}

}
