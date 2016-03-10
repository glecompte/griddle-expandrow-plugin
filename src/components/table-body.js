'use strict';

import React from 'react';

class TableBody extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  shouldComponentUpdate(nextProps) {
    return this.props.data !== nextProps.data;
  }


  getRows(rowData) {
    return rowData
      .filter(data => data.visible === undefined || data.visible === true)
      .map((data, index) => {
          return this.getRow(data, index)
        }
      );
  }

  getRow(data, index) {
    let rows = [<this.props.components.Row rowData={data}
      components={this.props.components}
      events={this.props.events}
      rowIndex={index}
      rowProperties={this.props.renderProperties.rowProperties}
      tableProperties={this.props.tableProperties}
      ignoredColumns={this.props.renderProperties.ignoredColumns}
      settings={this.props.settings}
      styles={this.props.styles}
      columnProperties={this.props.renderProperties.columnProperties} />
    ];

    if(data.__metadata && data.__metadata.children && data.__metadata.children.length > 0 && data.__metadata.expanded) {
      //console.error(data)
      let childComponent = <tr>
                            <td colSpan={4}>
                              <div>{data.__metadata.children[0].childComponent}</div>
                            </td>
                          </tr>

      rows.push(childComponent);
    }

    return rows;
  }


  render() {
    var rows = this.getRows(this.props.data);

    return (
      <tbody>
        {rows}
      </tbody>
    );
  }
}

//Plugins expect a function
export default Component => TableBody;
