const Movie = require("../models/movieModel");


//Add movie
const addMovie = async (req, res) => {
    try {
        const newMovie = new Movie(req.body);
        await newMovie.save();
        res.send({
            success: true,
            message: "Movie added successfully"
        })
    } catch (error) {
        console.log(error);
        res.send({
            success: false,
            message: "Failed to add the movie"
        })
    }
};

const getAllMovies = async (req, res) => {
    try {
        const allMovies = await Movie.find();
        res.send({
            success: true,
            message: "Movies fetched successfully",
            data: allMovies
        });
    } catch (error) {
        console.log(error);
        res.send({
            success: false,
            message: "Failed to fetch movies"
        });
    }
};

const updateMovie = async(req, res) => {
    try {
        await Movie.findByIdAndUpdate(req.body.movieId, req.body);
        res.send({
            success: true,
            message: "Movie updated successfully"
        })
    } catch (error) {
        console.log(error);
        res.send({
            success: false,
            message: "Failed to update movie"
        });
    }
};

const deleteMovie = async(req, res) => {
    try {
        await Movie.findByIdAndDelete(req.body.movieId);
        console.log(req.body.movieId);
        res.send({
            success: true,
            message: "Movie deleted successfully"
        });
    } catch (error) {
        console.log(error);
        res.send({
            success: false,
            message: "Failed to delete movie"
        });
    }
};

const getMovieById = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        res.send({ success: true, message: "Fetched movie by id successfully", data: movie });
    } catch (error) {
        res.send({ success: false, message: "Failed to fetch movie by id" });
    }
}

module.exports = { addMovie, getAllMovies, updateMovie, deleteMovie, getMovieById };