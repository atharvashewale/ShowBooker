const showRouter = require('express').Router();
const { addShow, deleteShow, updateShow, getShowById, getAllShowsByTheatre, getAllTheatresByMovie } = require('../controllers/showController');

showRouter.post("/addShow", addShow);
showRouter.delete("/deleteShow/:showId", deleteShow);
showRouter.patch("/updateShow", updateShow);

//Get all calls
showRouter.post("/getAllShowsByTheatre", getAllShowsByTheatre);
showRouter.post("/getAllTheatresByMovie", getAllTheatresByMovie);
showRouter.post("/getShowById", getShowById);

module.exports = showRouter;