/*
    Jono : 18 04 25
    CostCentreGrid : React Class Component
*/
import React from "react";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
// import 'react-table/react-table.css';
import { Button, Input, Modal, Select, Tag, Tooltip } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  CopyTwoTone,
  DeleteOutlined,
  EditOutlined,
  PlusCircleTwoTone,
} from "@ant-design/icons";
const Option = Select.Option;

const _ = require("lodash");

const MySelect = (props) => (
  <Select
    style={{ width: "100%" }}
    defaultValue={props.defaultValue}
    {...props}
  >
    {props.options.map((opt) => (
      <Option key={opt.value} value={opt.value}>
        {opt.label}
      </Option>
    ))}
  </Select>
);

class CostCentreGrid extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      editing: [],
      costCentreGroups: [],
    };
    this.renderEditable = this.renderEditable.bind(this);
  }

  componentDidMount() {
    this.props.loadCostCentres();
  }

  static getDerivedStateFromProps(
    { costCentres, costCentreGroups },
    prevState
  ) {
    return prevState.editing.length === 0
      ? { ...prevState, data: costCentres, costCentreGroups }
      : { ...prevState, costCentreGroups };
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
          switch (k.keyCode) {
            case 27:
              this.onCancelEdit(cellInfo.original);
              break;
            case 13:
              this.onPostEdit(cellInfo.original);
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
      this.props.createCostCentre(this.findEditRow(original.id));
    } else {
      this.props.updateCostCentre(original, this.findEditRow(original.id));
    }
    this.setState({
      data: this.state.data.filter((r) => r.id !== "add"),
      editing: this.state.editing.filter((r) => r.id !== original.id),
    });
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

  validateEditing(id) {
    return (
      this.findEditRow(id).name > "" && this.findEditRow(id).description > ""
    );
  }

  onAddRow() {
    const addRow = {
      id: "add",
      name: "",
      description: "",
      transactionTypes: [],
    };
    this.setState(
      {
        data: [...this.state.data.filter((r) => r.id !== "add"), addRow],
        editing: [...this.state.editing.filter((r) => r.id !== "add"), addRow],
      },
      () => console.log(this.state)
    );
  }

  onEditRow(original) {
    this.setState({ editing: [...this.state.editing, _.clone(original)] });
  }

  onDeleteRow(rec, deleteAction) {
    Modal.confirm({
      title: "Are you sure you want to delete this CC?",
      content: (
        <ul>
          <li>name: {rec.name}</li>
          <li>description: {rec.description}</li>
        </ul>
      ),
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        deleteAction(rec.id);
      },
    });
  }

  onCopyRow(original) {
    this.setState(
      {
        data: [
          ...this.state.data.filter((r) => r.id !== "add"),
          { ...original, id: "add" },
        ],
        editing: [
          ...this.state.editing.filter((r) => r.id !== "add"),
          { ...original, id: "add" },
        ],
      },
      () => console.log(this.state)
    );
  }

  render() {
    const { data, costCentreGroups } = this.state;
    const columns = [
      {
        Header: "Cost Centre Group",
        accessor: "cost_centre_group",
        width: 120,
        Cell: (cellInfo) =>
          this.findEditRow(cellInfo.original.id) ? (
            <MySelect
              defaultValue={data[cellInfo.index].cost_centre_group_id}
              options={costCentreGroups.map((r) => ({
                value: r.id,
                label: r.name,
              }))}
              onChange={(val) =>
                this.changeEditData(
                  cellInfo.original.id,
                  "cost_centre_group_id",
                  val
                )
              }
            />
          ) : (
            data[cellInfo.index][cellInfo.column.id]
          ),
      },
      {
        Header: "Name",
        accessor: "name",
        width: 200,
        Cell: this.renderEditable,
        Footer: (
          <Button
            type="primary"
            size="small"
            disabled={this.findEditRow("add")}
            onClick={() => {
              this.onAddRow();
            }}
          >
            <PlusCircleTwoTone />
            Add
          </Button>
        ),
      },
      {
        Header: "Transaction Types",
        accessor: "transactionTypes",
        style: { whiteSpace: "normal" },
        Cell: (cellInfo) =>
          this.findEditRow(cellInfo.original.id) ? (
            <span>
              <Select
                mode="multiple"
                style={{ width: "100%" }}
                placeholder="Please select"
                defaultValue={data[cellInfo.index].transactionTypes.map(
                  (ttcc) => ttcc.transaction_type_id
                )}
                onChange={(value) => {
                  // console.log(value);
                  this.changeEditData(
                    cellInfo.original.id,
                    "transactionTypes",
                    this.props.transactionTypes
                      .filter((tt) => value.includes(tt.id))
                      .map((tt) => ({
                        transaction_type_id: tt.id,
                        cost_centre_id: cellInfo.original.id,
                      }))
                  );
                }}
              >
                {this.props.transactionTypes.map((tt) => (
                  <Option key={tt.id} value={tt.id}>
                    {tt.name}
                  </Option>
                ))}
              </Select>
            </span>
          ) : (
            <span>
              {data[cellInfo.index].transactionTypes
                .sort((a, b) =>
                  a.transaction_type > b.transaction_type
                    ? 1
                    : a.transaction_type < b.transaction_type
                    ? -1
                    : 0
                )
                .map((ttcc) => (
                  <Tag key={ttcc.id}>{ttcc.transaction_type}</Tag>
                ))}
            </span>
          ),
      },
      {
        Header: "Description",
        accessor: "description",
        Cell: this.renderEditable,
        width: 200,
      },
      {
        sortable: false,
        width: 125,
        Cell: ({ original }) => (
          <span>
            {this.findEditRow(original.id) ? (
              <span>
                <Tooltip title="confirm changes">
                  <Button
                    type="primary"
                    ghost={true}
                    size="small"
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
                    size="small"
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
                      this.onDeleteRow(original, this.props.removeCostCentre);
                    }}
                  >
                    <DeleteOutlined />
                  </Button>
                </Tooltip>
                {"  "}
                <Tooltip title="copy row">
                  <Button
                    type="dashed"
                    ghost={false}
                    // size="small"
                    shape="circle"
                    onClick={() => {
                      this.onCopyRow(original);
                    }}
                  >
                    <CopyTwoTone />
                  </Button>
                </Tooltip>
              </span>
            )}
          </span>
        ),
      },
    ];

    return (
      <div>
        <ReactTable
          data={data}
          columns={columns}
          defaultPageSize={20}
          showPaginationTop={false}
          showPaginationBottom={true}
          defaultSorted={[
            {
              id: "cost_centre_group",
              desc: false,
            },
            {
              id: "name",
              desc: false,
            },
          ]}
        />
      </div>
    );
  }
}

export default CostCentreGrid;
