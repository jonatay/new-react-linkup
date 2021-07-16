/*
    Jono : 18 02 12
    FilterInput : React Class Component
*/
import React from "react";

import { Input } from "antd";
// const Search = Input.Search;

class FilterInput extends React.Component {
  render() {
    var { filterText, onTextChange } = this.props;
    return (
      <span>
        <Input.Search
          placeholder="search"
          onChange={(e) => onTextChange(e.target.value)}
          style={{ width: 200 }}
          value={filterText}
          allowClear
          onSearch={false}
        />
      </span>
    );
  }
}

export default FilterInput;
