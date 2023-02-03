import React from "react";

import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
import { Button, Input, Modal, Tooltip } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
// import dateFormat from "dateformat";
import _ from "lodash";

// import FormatNumber from "../../common/format-number";

// const getLkpArray = (array, key) =>
//   _.uniqBy(array, (ai) => ai[key])
//     .map((ai) => ai[key])
//     .sort();

class DriverGrid extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      pages: -1,
      loading: false,
      editing: [],
    };
    this.renderEditable = this.renderEditable.bind(this);
    this.onFilteredChange = this.onFilteredChange.bind(this);
  }

  static getDerivedStateFromProps({ drivers }, prevState) {
    if (
      drivers &&
      drivers.length > 0
      // spEmployees &&
      // spEmployees.length > 0
    ) {
      return {
        ...prevState,
        data: drivers,
        //spEmployees: spEmployees,
        // filteredFleetDrivers: ffd,
        // pages: fleetDriversPageCount,
        loading: false,
      };
    }
    return false;
  }

  findEditRow(id) {
    return this.state.editing.find((r) => r.id === id);
  }

  changeEditData(id, col, val) {
    // console.log(id, col, val);
    let row = this.findEditRow(id);
    row[col] = val;
    this.setState({
      editing: this.state.editing.map((r) => (r.id === id ? row : r)),
    });
  }

  renderEditable(cellInfo) {
    return this.findEditRow(cellInfo.original.id) ? (
      <Input
        autoFocus={cellInfo.column.id === "name"}
        value={this.findEditRow(cellInfo.original.id)[cellInfo.column.id]}
        onChange={(e) =>
          this.changeEditData(
            cellInfo.original.id,
            cellInfo.column.id,
            e.target.value
          )
        }
        onKeyDown={(k) => {
          switch (k.code) {
            case "Escape":
              this.onCancelEdit(cellInfo.original.id);
              break;
            case "Enter":
              this.onPostEdit(cellInfo.original.id);
              break;
            default:
              break;
          }
        }}
      />
    ) : (
      this.state.data[cellInfo.index][cellInfo.column.id]
    );
  }

  onCancelEdit(original) {
    this.setState({
      editing: this.state.editing.filter((r) => r.id !== original.id),
      data:
        original.id !== "add"
          ? this.state.data
          : this.state.data.filter((r) => r.id !== "add"),
    });
  }

  onPostEdit(original) {
    if (original.id === "add") {
      this.props.createDriver(this.findEditRow(original.id));
    } else {
      this.props.updateDriver(original, this.findEditRow(original.id));
    }
    this.setState({
      data: this.state.data.filter((r) => r.id !== "add"),
      editing: this.state.editing.filter((r) => r.id !== original.id),
    });
  }

  validateEditing(id) {
    return this.findEditRow(id).name > "";
  }

  onEditRow(original) {
    this.setState({ editing: [...this.state.editing, _.clone(original)] });
  }

  onDeleteRow(rec, deleteAction) {
    Modal.confirm({
      title: "Are you sure you want to delete this driver?",
      content: (
        <ul>
          <li>name: {rec.name}</li>
          <li>description: {rec.fims_names}</li>
        </ul>
      ),
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        deleteAction(rec);
      },
    });
  }

  onFilteredChange(filtered, column) {
    console.log(filtered, column);
    this.props.filterDrivers(filtered);
  }

  render() {
    const { data } = this.state;

    const columns = [
      {
        Header: "Name",
        accessor: "name",
        Cell: this.renderEditable,
        width: 200,
      },
      {
        Header: "Emp Code",
        accessor: "employee_code",
        Cell: this.renderEditable,
        width: 50,
      },
      {
        Header: "SP Employee",
        accessor: "employee_id",
        Cell: this.renderEditable,
        width: 200,
      },
      {
        Header: "FIMS Names",
        accessor: "fims_names",
        Cell: this.renderEditable,
        width: 200,
        filterable: false,
      },
      {
        sortable: false,
        filterable: false,
        width: 125,
        Cell: ({ original }) => (
          <span>
            {this.findEditRow(original.id) ? (
              <span>
                <Tooltip title="confirm changes">
                  <Button
                    type="primary"
                    ghost={true}
                    // size="small"
                    shape="circle"
                    disabled={!this.validateEditing(original.id)}
                    onClick={() => {
                      this.onPostEdit(original);
                    }}
                  >
                    <CheckCircleOutlined />
                  </Button>
                </Tooltip>
                {"  "}
                <Tooltip title="cancel changes">
                  <Button
                    type="danger"
                    ghost={true}
                    // size="small"
                    shape="circle"
                    onClick={() => {
                      this.onCancelEdit(original);
                    }}
                  >
                    <CloseCircleOutlined />
                  </Button>
                </Tooltip>
              </span>
            ) : (
              <span>
                <Tooltip title="edit row">
                  <Button
                    type="primary"
                    ghost={true}
                    // size="small"
                    shape="circle"
                    onClick={() => {
                      this.onEditRow(original);
                    }}
                  >
                    <EditOutlined />
                  </Button>
                </Tooltip>
                {"  "}
                <Tooltip title="delete row">
                  <Button
                    type="danger"
                    ghost={true}
                    // size="small"
                    shape="circle"
                    onClick={() => {
                      this.onDeleteRow(original, this.props.removeDriver);
                    }}
                  >
                    <DeleteOutlined />
                  </Button>
                </Tooltip>
              </span>
            )}
          </span>
        ),
      },
    ];

    return (
      <ReactTable
        data={data}
        columns={columns}
        filterable
        onFilteredChange={this.onFilteredChange}
        defaultPageSize={20}
        showPaginationTop={false}
        showPaginationBottom={true}
        manual
        pages={this.state.pages} // should default to -1 (which means we don't know how many pages we have)
        loading={this.state.loading}
        className="-striped -highlight"
        defaultSorted={[
          {
            id: "transaction_date",
            desc: true,
          },
        ]}
      />
    );
  }
}

export default DriverGrid;
