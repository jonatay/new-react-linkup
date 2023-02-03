const ModelDriver = require("../../models/fleet/ModelDriver");

exports.list = (req, res) => {
  ModelDriver.list()
    .then((data) => res.json(data))
    .catch((e) => res.json(e));
};

exports.delete = (req, res) => {
  const id = req.params.id;
  ModelDriver.delete(id)
    .then(() => res.json({ status: "deleted", id }))
    .catch((err) => res.json({ status: "error", msg: err }));
};

exports.update = (req, res) => {
  const id = req.params.id;
  const { driver, changes } = req.body;
  ModelDriver.update(id, changes)
    .then((data) =>
      ModelDriver.get(data.id).then((data) =>
        res.json({ status: "updated", driver: data })
      )
    )
    .catch((err) => res.json({ status: "error", error: err }));
};

exports.create = (req, res) => {
  const { driver } = req.body;
  ModelDriver.create(driver)
    .then((data) =>
      ModelDriver.get(data.id).then((data) =>
        res.json({ status: "created", driver: data })
      )
    )
    .catch((err) => res.json({ status: "error", error: err }));
};
