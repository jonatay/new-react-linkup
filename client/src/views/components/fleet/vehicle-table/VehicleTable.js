/*
    Jono : 18 02 11
    VehiclesTable : React Class Component
*/
import React from "react";

import { Table, Tag, Button, Modal } from "antd";

import "./style.css";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";

class VehicleTable extends React.Component {
  state = {
    data: [],
  };

  showToggleVehicleActiveConfirm = (vehicle, toggleVehicleIsActive) => {
    Modal.confirm({
      title: "Are you sure toggle active on this vehicle?",
      content: `reg: ${vehicle.registration} name: ${vehicle.name}`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        toggleVehicleIsActive(vehicle);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  columns = [
    {
      title: "Reg.",
      dataIndex: "registration",
      width: 100,
      defaultSortOrder: "ascend",
      //fixed: 'left',
      sorter: (a, b) =>
        a.registration
          .toLowerCase()
          .localeCompare(b.registration.toLowerCase()),
    },
    {
      title: "Name",
      dataIndex: "name",
      width: 250,
      sorter: (a, b) =>
        a.name.toLowerCase().localeCompare(b.name.toLowerCase()),
    },

    {
      title: "Cost Centre Groups",
      dataIndex: "cost_centre_groups",
      render: (text, record) => (
        <div>
          {record.vehicleCcgs.map((ccg) =>
            ccg.cost_centre_group ? (
              <Tag key={ccg.cost_centre_group.id}>
                {ccg.cost_centre_group.name
                  ? ccg.cost_centre_group.name.length < 13
                    ? ccg.cost_centre_group.name
                    : ccg.cost_centre_group.name.substr(0, 13) + "..."
                  : ""}
              </Tag>
            ) : (
              "none"
            )
          )}
        </div>
      ),
    },
    {
      title: "Fims Driver(s)",
      dataIndex: "fims_drivers",
      width: 200,
      render: (fimsDrivers) => (
        <p>{fimsDrivers ? fimsDrivers.join(",") : "nu"}</p>
      ),
    },
    {
      //fixed: 'right',
      width: 70,
      render: (text, record) => (
        <span>
          <Button
            type="primary"
            ghost={true}
            size="small"
            shape="circle"
            onClick={() => this.props.onEditVehicle(record)}
          >
            <EditOutlined />
          </Button>
          <Button
            style={{ marginLeft: 5 }}
            type={record.is_active ? "danger" : "primary"}
            ghost={true}
            size="small"
            shape="circle"
            onClick={() =>
              this.showToggleVehicleActiveConfirm(
                record,
                this.props.toggleVehicleIsActive
              )
            }
          >
            {record.is_active ? <DeleteOutlined /> : <PlusOutlined />}
          </Button>
        </span>
      ),
    },
  ];
  render() {
    return (
      <Table
        size="middle"
        rowKey="id"
        dataSource={this.props.vehicles}
        columns={this.columns}
        scroll={{ y: 590 }}
        // rowClassName={(record, index) => (index % 2 === 0 ? "even" : "odd")}
        // rowClassName={record =>
        //   record.cost_centre_groups[0] ? record.cost_centre_groups[0].name : ''
        // }
        pagination={false}
        // pagination={{
        //   size: 'small',
        //   showSizeChanger: true,
        //   pageSize: pageSize,
        //   pageSizeOptions: ['16', '32', '64', '128', '256'],
        //   showTotal: (total, range) =>
        //     `${range[0]}-${range[1]} of ${total} vehicles`
        // }}
      />
    );
  }
}

export default VehicleTable;
