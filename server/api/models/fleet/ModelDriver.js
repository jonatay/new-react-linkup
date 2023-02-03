const db = require("../../services/postgres/db");

const tableName = "fleet.driver";

const sqlList = `
SELECT * FROM fleet.driver
`;

const sqlGetByFims = `
SELECT * FROM ${tableName} WHERE $[name] = ANY (fims_names) AND $[registration] = ANY (fims_registrations)
`;

const sqlInsertFims = `
INSERT INTO ${tableName} (name, fims_names, fims_registrations) VALUES ( $[name], $[fimsNames], $[fimsRegistrations] )
RETURNING *
`;

const sqlDelete = `
DELETE FROM ${tableName}
WHERE id = $[id]
`;

const sqlCreate = `
INSERT INTO ${tableName}(
	name, employee_code, fims_names, employee_id, jdata, fims_registrations, is_active)
	VALUES ($[name], $[employee_code], $[fims_names], $[employee_id], $[jdata], $[fims_registrations], $[is_active]);
`;

const sqlUpdate = `
UPDATE ${tableName}
  SET name=$[name], employee_code=$[employee_code], fims_names=$[fims_names], employee_id=$[employee_id], jdata=$[jdata], fims_registrations=$[fims_registrations], is_active=$[is_active]
WHERE id=$[id];
`;

exports.list = () => db.any(sqlList);

exports.getOrInsert = (name, registration) =>
  db.any(sqlGetByFims, { name, registration }).then((drivers) =>
    drivers.length === 1
      ? drivers[0]
      : db.one(sqlInsertFims, {
          name: name.toProperCase(),
          fimsNames: [name],
          fimsRegistrations: [registration],
        })
  );

exports.delete = (id) => db.none(sqlDelete, { id });

exports.create = (data) => db.one(sqlCreate, { ...data });

exports.update = (id, data) => db.one(sqlUpdate, { id, ...data });
