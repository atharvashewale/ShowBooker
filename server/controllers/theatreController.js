const Theatre = require('../models/theatreModel');

const addTheatre = async (req, res) => {
    try {
        const newTheatre = new Theatre(req.body);
        await newTheatre.save();
        res.send({
            success: true,
            message: "Theatre added successfully"
        });
    } catch (error) {
        res.send({ 
            success: false,
            message: "Failed to add Theatre"
         });
    }
};

const updateTheatre = async (req, res) => {
    try {
        const theatre = await Theatre.findById(req.body.theatreId);
        if(!theatre)
            return res.send({ success: false, message: "Theatre not found" });
        else
            await Theatre.findByIdAndUpdate(req.body.theatreId, req.body);

        res.send({ success: true, message: "Theatre data updated successfully"});

    } catch (error) {
        res.send({ success: false, message: "Failed to update theatre data"});
    }
};

const deleteTheatre = async (req, res) => {
    try {
        console.log("Deleting theatre", req.params.theatreId);
        await Theatre.findByIdAndDelete(req.params.theatreId);
        res.send({ success: true, message: "Theatre deleted successfully" });
    } catch (error) {
        res.send({ success: false, message: "Failed to delete theatre"});
    }
};

const getAllTheatres = async (req, res) => {
    try {
        const allTheatres = await Theatre.find().populate('owner');
        res.send({ success: true, theatres: allTheatres, data: allTheatres });
    } catch (error) {
        res.send({ success: false, message: "Failed to fetch all theatres" });
    }
};

const getAllTheatresByOwnerId = async (req, res) => {
    try {
        const allTheatres = await Theatre.find({ owner: req.params.ownerId });
        res.send({ success: true, theatres: allTheatres, data: allTheatres });
    } catch (error) {
        res.send({ success: false, message: "Failed to fetch data" });
    }
}

module.exports = { addTheatre, updateTheatre, deleteTheatre, getAllTheatres, getAllTheatresByOwnerId };