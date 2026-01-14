import { useEffect, useState } from 'react';
import { Table, Button } from 'antd';
import MovieForm from './MovieForm';
import { ShowLoading, HideLoading } from "../../redux/loaderSlice";
import { getAllMovies } from '../../api/movies';
import { useDispatch } from 'react-redux';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import DeleteMovieModal from './DeleteMovieModal';
import moment from "moment";

function MoviesList() {

    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const [ movies, setMovies ] = useState(null);
    const [ selectedMovies, setSelectedMovies ] = useState(null);
    const [ formType, setFormType ] = useState("add");
    const [ isDeleteModalOpen, setIsDeleteModalOpen ] = useState(false);
    const dispatch = useDispatch(); 

    const tableHeadings = [
        { title: "Poster", dataIndex: "poster", render: (text, data) => {
            return (
                <img src={text} width={ 100 } height={ 125 } alt='' ></img>
            );
        }},
        { title: "Name", dataIndex: "title"},
        { title: "Description", dataIndex: "description"},
        { title: "Duration", dataIndex: "duration", render: (text) => `${text} Mins`},
        { title: "Language", dataIndex: "language"},
        { title: "Genre", dataIndex: "genre"},
        { title: "Release Date", dataIndex: "releaseDate", render: (text, data) => {
                return moment(data.releaseDate).format("DD-MM-YYYY");
            },
        },
        { title: "Action", render: (text, data) => {
            return (
                <div>
                    <Button onClick={ () => {
                        setIsModalOpen(true);
                        setFormType("edit");
                        setSelectedMovies(data);
                    }}>
                        <EditOutlined></EditOutlined>
                    </Button>
                    <Button onClick={ () => {
                        setIsDeleteModalOpen(true);
                        setSelectedMovies(data);
                    }}>
                        <DeleteOutlined></DeleteOutlined>
                    </Button>
                </div>
            )
        }}
    ];

    const getData = async() => {
        dispatch(ShowLoading());
        const response = await getAllMovies();
        const allMovies = response.data;
        setMovies(allMovies.map((item) => {
            return {
                ...item, key: `movie-${item._id}`
            };
        }));
        dispatch(HideLoading());
    };

    useEffect(() => {
        getData();
    }, []);

  return (
    <>
        <div className='d-flex justify-content-end'>
            <Button onClick={ () => {
                setIsModalOpen(true);
                setFormType("add");
            } }>Add Movie</Button>
            <Table dataSource={ movies } columns={ tableHeadings }></Table>
            {
                isModalOpen && (
                    <MovieForm
                        isModalOpen={isModalOpen}
                        setIsModalOpen={setIsModalOpen}
                        formType={formType}
                        selectedMovies={selectedMovies}
                        setSelectedMovies={setSelectedMovies}
                        getData={getData}
                    />
                )
            }
            {
                isDeleteModalOpen && (
                    <DeleteMovieModal
                        isDeleteModalOpen={isDeleteModalOpen}
                        setIsDeleteModalOpen={setIsDeleteModalOpen}
                        selectedMovies={selectedMovies}
                        getData={getData}
                        setSelectedMovies={setSelectedMovies}
                    />
                )
            }
        </div>
    </>
  )
}

export default MoviesList