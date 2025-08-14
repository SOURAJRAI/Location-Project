const groups = require("../Models/group");

const getGroup = async (req, res) => {
  await groups
    .find()
    .populate({
      path: "locations",
  
    })
    .populate({
      path: "groups",
       populate: [
        { path: "locations"},
        {
          path: "groups",
               populate: { path: "locations"},
        }
      ]
    })
    .then((data) => {
      if (data.length === 0) {
        return res.json({
          message: "No data Found",
          data: [],
        });
        console.log("not found");
      }
      console.log("data",data);
      return res.json({
        data: data,
      });
    })
    .catch((err) => res.json(err));
};

const addGroup = async (req, res) => {
  const data = req.body;
  console.log("add Group request", req);
  const datas = new groups(data);

  await datas
    .save()
    .then((data) => {
      res.json({ data, message: "Group Saved successfully" });
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
};




module.exports = {
  getGroup,
  addGroup,
};
