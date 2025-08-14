const location = require("../Models/Location");


const getLocation = async (req, res) => {
  await location
    .find()
    .then((data) => {
      if (data.length === 0) {
        return res.json({
          message: "No data Found",
          data: [],
        });
        console.log("not found");
      }
      // console.log("data",data);
      return res.json({
        data: data,
      });
    })
    .catch((err) => res.json(err));
};

const addLocation = async (req, res) => {
  const data = req.body;
  console.log("add location request", req);
  const datas = new location(data);

  await datas
    .save()
    .then((data) => {
      res.json({ data, message: "Location Saved successfully" });
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
};

const deleteLocation = async (req, res) => {
  const data = req.params.id;
  console.log(data);
  await location
    .findByIdAndDelete(data)
    .then(() => res.send({ message: "Location Deleted Successfully" }))
    .catch((err) => {
      res.send(err);
      console.log("error in api");
    });
};


module.exports = {
  getLocation,
  addLocation,
  deleteLocation

};
