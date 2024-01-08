export const validate = values => {
    const errors = {};
    if (!values.title) {
      errors.title = 'El título es requerido';
    } 
  
    if (!values.awards) {
      errors.awards = 'Ningún premio?';
    } 
  
    if (!values.rating) {
      errors.rating = 'Tan mal le fue?';
    } 
    if (!values.release_date) {
        errors.release_date = 'Nunca existió?';
      } 
      
      if (!values.length) {
        errors.length = 'No tiene duración?';
      } 
      if (!values.genre_id) {
        errors.genre_id = 'No tiene género?';
      } 
    return errors;
  };