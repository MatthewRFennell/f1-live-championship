import React from 'react'
import Reorder from 'react-reorder'

class ReorderableDriverList extends React.Component {

  render() {
    return (
      <Reorder reorderId="drivers" onReorder={this.props.onReorder.bind(this)}>
        {
          this.props.driverList.map((driverCode, i) => (
            <div>
              <h3>{i + 1}: {driverCode} +{this.props.pointsDistribution[i]}</h3>
            </div>
          ))
        }
      </Reorder>
    )
  }
}

export default ReorderableDriverList
