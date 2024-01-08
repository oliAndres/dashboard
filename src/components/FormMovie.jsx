import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { validate } from "../validations/movie-validator";

export const FormMovie = ({handleAddMovie, handleUpdateMovie,movie, setMovie}) => {

    const [genres, setGenres] = useState([]);

    const getGenres = async () => {
        let response = await fetch(`${import.meta.env.VITE_APP_API_URL}/genres`);
        let result = await response.json();
        
        setGenres(result.data)
    };
    
    useEffect(() => {
        getGenres()
    }, []);

    useEffect(() => {
        if(movie) {
            formik.setValues({
                title : movie.title,
                rating : movie.rating,
                awards : movie.awards,
                release_date : movie.release_date.split('T')[0],
                length : movie.length,
                genre_id : movie.genre ? movie.genre.id : null
            })
        }
    }, [movie])

    const formik = useFormik ({
        initialValues : {
            title : "",
            rating : "",
            awards : "",
            release_date : "",
            length: "",
            genre_id : ""
        },
        validate,
        onSubmit : (values) => {

          movie ? 
            handleUpdateMovie(movie.id, values)
            : 
            handleAddMovie(values)

           formik.handleReset()
        }
    });

    const handleCancel = ()=> {
        setMovie(null)
        formik.handleReset()
    }

    return (

    <Form className='row' onSubmit={formik.handleSubmit}>
        <Form.Group className='mb-3 col-12'>
            <Form.Label>Título</Form.Label>
            <Form.Control 
            type='text' 
            placeholder='Título de la pelicula...'
            name='title'
            onChange={formik.handleChange}
            value = {formik.values.title}
            />
            {
            formik.errors.title && <small className="ms-2 text-danger">{formik.errors.title}</small>
            }
        </Form.Group>
        <Form.Group 
            className='mb-3 col-12 col-md-6'>
            <Form.Label>Rating</Form.Label>
            <Form.Control 
            type='number' 
            name='rating'
            onChange={formik.handleChange}
            value = {formik.values.rating}
            />
            {
            formik.errors.rating && <small className="ms-2 text-danger">{formik.errors.rating}</small>
            }
        </Form.Group>
        <Form.Group 
            className='mb-3 col-12 col-md-6'>
            <Form.Label>Premios</Form.Label>
            <Form.Control 
            type='number' 
            name='awards'
            onChange={formik.handleChange}
            value = {formik.values.awards}
            />
            {
            formik.errors.awards && <small className="ms-2 text-danger">{formik.errors.awards}</small>
            }
        </Form.Group>
        <Form.Group 
            className='mb-3 col-12 col-md-6'>
            <Form.Label>Duración</Form.Label>
            <Form.Control 
            type='number' 
            name='length'
            onChange={formik.handleChange}
            value = {formik.values.length}
            />
            {
            formik.errors.length && <small className="ms-2 text-danger">{formik.errors.length}</small>
            }
        </Form.Group>
        <Form.Group className='mb-3 col-12 col-md-6'>
            <Form.Label>fecha de estreno</Form.Label>
            <Form.Control 
            type='date' 
            name='release_date'
            onChange={formik.handleChange}
            value = {formik.values.release_date}
            />
            {
                formik.errors.release_date && <small className="ms-2 text-danger">{formik.errors.release_date}</small>
            }
        </Form.Group>
        <Form.Group className='mb-3 col-12'>
            <Form.Label>Género</Form.Label>

            <Form.Select 
                className='form-control'
                name='genre_id'
                onChange={formik.handleChange}
                value = {formik.values.genre_id}
                >
                <option hidden defaultChecked>
                    Selecciona...
                </option>
                {
                    genres.map(({name, id}) => <option key={id} value={id}>{name}</option>)
                }
                
            </Form.Select>
            {
            formik.errors.genre_id && <small className="ms-2 text-danger">{formik.errors.genre_id}</small>
            }
        </Form.Group>
        <Form.Group className='mb-3 col-12'>
            <div className="d-flex justify-content-between">
                <Button onClick={handleCancel} className="w-100" variant="outline-secondary">
                    Cancelar
                </Button>
                <Button type='submit' className='w-100' variant='outline-dark'>
                    Guardar
                </Button>
            </div>
        </Form.Group>
                
    </Form>
    
    )   
}

FormMovie.propTypes = {
    handleAddMovie : PropTypes.func,
    handleUpdateMovie : PropTypes.func,
    movie : PropTypes.object,
    setMovie : PropTypes.func
}