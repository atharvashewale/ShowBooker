const theatreRouter = require('express').Router();
const { addTheatre, updateTheatre, deleteTheatre, getAllTheatres, getAllTheatresByOwnerId } = require("../controllers/theatreController");

theatreRouter.post('/add-theatre', addTheatre);
theatreRouter.put('/update-theatre', updateTheatre);
theatreRouter.delete("/delete-theatre/:theatreId", deleteTheatre);
theatreRouter.get('/get-all-theatres', getAllTheatres); //For getting all the theatres for the admin
theatreRouter.get('/get-all-theatres-by-owner/:ownerId', getAllTheatresByOwnerId);

module.exports = theatreRouter;