const Show = require('../models/showModel');

const addShow = async (req, res) => {
    try {
        const newShow = new Show(req.body);
        await newShow.save();
        res.send({ success: true, message: "Show added successfully" });
    } catch (error) {
        res.send({ success: false, message: "Failed to add the show" });
    }
};

const deleteShow = async (req, res) => {
    try {
        const showId = req.params.showId;
        await Show.findByIdAndDelete(showId);
        res.send({ success: true, message: "Show deleted successfully" });
    } catch (error) {
        res.send({ success: false, message: "Failed to delete the show" });
    }
};

const updateShow = async (req, res) => {
    try {
        await Show.findByIdAndUpdate(req.body.showId, req.body);
        res.send({ success: true, message: "Show updated successfully" });
    } catch (error) {
        res.send({ success: false, message: "Failed to updated the show" });
    }
};

const getAllShowsByTheatre = async (req, res) => {
    try {
        const shows = await Show.find({ theatre: req.body.theatreId }).populate("movie");
        res.send({ success: true, message: "Show fetched successfully", data: shows });
    } catch (error) {
        res.send({ success: false, message: "Failed to fetch shows by theatre"});
    }
};

const getShowById = async (req, res) => {
    try {
        const show = await Show.findById(req.body.showId).populate('theatre').populate('movie');
        res.send({ success: true, message: "Show by Id fetched successfully", data: show });
    } catch (error) {
        res.send({ success: false, message: "Failed to fetch the show by Id" });
    }
};

const getAllTheatresByMovie = async (req, res) => {
    try {
        const { movie, date } = req.body;
        const shows = await Show.find({ movie, date }).populate("theatre");
        let uniqueTheatresWithShowsForTheMovie = [];
        shows.forEach((show) => {
            let currentTheatreId = show.theatre._id;
            let isTheatrePresent = uniqueTheatresWithShowsForTheMovie.find((theatre) => theatre._id === currentTheatreId);

            if(!isTheatrePresent)
            {
                let showsOfThisTheatre = shows.filter((showObj) => showObj.theatre._id === currentTheatreId);
                uniqueTheatresWithShowsForTheMovie.push({ ...show.theatre._doc, showsOfThisTheatre });
            }
        });
        res.send({ success: true, message: "All Theatres with their shows are fetched succesfully by the movie", data: uniqueTheatresWithShowsForTheMovie });
    } catch (error) {
        res.send({ success: false, message: "Failed to fetch theatres by movie" });
    }
};

module.exports = { addShow, deleteShow, updateShow, getAllShowsByTheatre, getShowById, getAllTheatresByMovie, getAllTheatresByMovie };

