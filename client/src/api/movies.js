import { axiosInstance } from ".";

//Get all movies
export const getAllMovies = async () => {
    try {
        const response =  await axiosInstance.get("api/movies/get-all-movies");
        return response.data;
    } catch (error) {
        console.error(error);
        return error.message;
    }
};

//Add movie
export const addMovie = async (values) => {
    try {
        const response = await axiosInstance.post("api/movies/add-movie", values);
        return response.data;
    } catch (error) {
        console.error(error);
        return error.message;
    }
};

//Update movie
export const updateMovie = async (values) => {
    try {
        const response = await axiosInstance.put("api/movies/update-movie", values);
        return response.data;
    } catch (error) {
        console.error(error);
        return error.message;
    }
};

//Delete movie
export const deleteMovie = async (values) => {
    try {
        const response = await axiosInstance.put("api/movies/delete-movie", values);
        return response.data;
    } catch (error) {
        console.error(error);
        return error.message;
    }
};

//Get movie by id
export const getMovieById = async (id) => {
    try {
        const response = await axiosInstance.get(`/api/movies/movie/${id}`);
        return response.data;
    } catch (error) {
        console.log(error.message);
        return error.message;
    }
};