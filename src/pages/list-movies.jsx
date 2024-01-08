import { Card, CardTitle, Col, Row, Table } from "react-bootstrap";
import { TableItem } from "../components/TableItem";
import { useEffect, useState } from "react";
import { Loading } from "../components/loading";
import { Paginator } from "../components/Paginator";
import { FormSearch } from "../components/FormSearch";
import { FormMovie } from "../components/FormMovie";
import { showMessageSucess } from "../components/Toast";
import Swal from "sweetalert2";


export const ListMovies = () => {
  const [movie,setMovie]= useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState()

  const getMovies = async (endpoint = "/api/v1/movies") => {
    try {
      setLoading(true);

      const response = await fetch(`http://localhost:3001${endpoint}`);
      const result = await response.json();

      setLoading(false);
      setMovies(result.data);
      setPagination(result.meta)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  const handlePagination = async(event,endpoint) => {
    event.preventDefault()
    getMovies(endpoint);
  }

  const handleAddMovie = async(data) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/movies`,{ 
      method:'POST',
      headers : {
        'Content-Type': 'application/json'
      },
      body : JSON.stringify(data)
    })
    const result = await response.json();

   
    showMessageSucess(result.message);
    getMovies();

    } catch (error) {
      console.log(error)
    }
  }

  const handleEditMovie = async(id) => {
    try {
     const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/movies/${id}`)
     const result = await response.json();
 
     result.ok && setMovie(result.data)
    
 
   } catch (error) {
     console.log(error)
     
    }}

    const handleUpdateMovie = async(id,data) => {
      try {
        const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/movies/${id}`,{
          method: 'PUT',
          headers : {
            'Content-Type': 'application/json'
          },
          body : JSON.stringify(data)
        })
      const result = await response.json();
  
      setMovies(movies.map(movie => movie.id === result.data.id ? result.data : movie));
      setMovie(null)
      showMessageSucess(result.message)
      } catch (error) {
        console.log(error)
      }
     };

     const handleDeleteMovie = async(id) => {
      Swal.fire({
        title: "¿Estás seguro que quieres eliminar la película?",
        showDenyButton: true,
        confirmButtonText: "Si eliminala",
        confirmButtonColor: 'red',
        denyButtonText: `No la elimines`,
        denyButtonColor: 'gray'
      }).then(async(result) => {
        
        if (result.isConfirmed) {
          try {
            const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/movies/${id}`,
             {
              method:"DELETE",
             }
            );
            const result = await response.json();
            if(result.ok){
             showMessageSucess(result.message);
             setMovies(movies.filter(movie => movie.id !== id))
            }
        
          } catch (error) {
            console.log(error);
            
           }
  
        } 
      });
    }
 



  return loading ? (
    <Loading />
  ) : (
    <Row>
      <Col sm={12} lg={4}>
        <Card className="mb-3">
          <Card.Header>
            <CardTitle>{movie ? 'Editar' : 'Agregar'} película</CardTitle>
          </Card.Header>
          <Card.Body>
            <FormMovie handleAddMovie={handleAddMovie} movie={movie} handleUpdateMovie={handleUpdateMovie} setMovie={setMovie} />
          </Card.Body>
        </Card>
      </Col>

      <Col sm={12} lg={8}>
        <Card className="shadow mb-5">
          <Card.Body>
            <div className="d-flex flex-column flex-lg-row justify-content-between">
              <FormSearch
              getMovies={getMovies}
              />
            <Paginator pagination={pagination} handlePagination={handlePagination}/>
            </div>
            <Table striped borderless responsive>
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Duración</th>
                  <th>Rating</th>
                  <th>Géneros</th>
                  <th>Premios</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {movies.map((movie) => (
                  <TableItem
                    key={movie.id}
                    movie={movie}
                    handleEditMovie={handleEditMovie}
                    handleDeleteMovie={handleDeleteMovie}
                  />
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Col>
    </Row>
    
  );
};
