package de.aaron.note;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/note/")
public class NoteController {

	private final NoteService noteService;
	
    @Autowired
    public NoteController(NoteService noteService) {
        this.noteService = noteService;
    }

    @GetMapping("findAll")
	public List<Note> findAll() {
		return noteService.findAll();
	};

	@GetMapping("{id}")
	public Optional<Note> findById(@PathVariable Long id) {
		return noteService.findById(id);
	}

	@ResponseStatus(HttpStatus.CREATED) // 201
	@PostMapping
	public Note create(@RequestBody Note note) {
		return noteService.save(note);
	}

	@ResponseStatus(HttpStatus.NO_CONTENT) // 204
	@DeleteMapping("{id}")
	public void deleteById(@PathVariable Long id) {
		noteService.deleteById(id);
	}
	
    @PutMapping("{id}")
    public ResponseEntity<Note> updateNote(@PathVariable Long id, @RequestBody Note updatedNote) {
        Optional<Note> existingNote = noteService.findById(id);

        if (existingNote.isPresent()) {
            Note noteToUpdate = existingNote.get();
            // Aktualisiere die Werte des vorhandenen Notes mit den Werten des aktualisierten Notes
            noteToUpdate.setTitle(updatedNote.getTitle());
            noteToUpdate.setMessage(updatedNote.getMessage());

            Note updatedNoteEntity = noteService.save(noteToUpdate);
            return new ResponseEntity<>(updatedNoteEntity, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
