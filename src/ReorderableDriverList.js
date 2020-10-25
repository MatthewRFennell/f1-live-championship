import React from 'react'
import Reorder from 'react-reorder'
import styles from './ReorderableDriverList.module.scss'

class ReorderableDriverList extends React.Component {

  render() {
    return (
      <Reorder
        className={styles.reorderableDriverList}
        reorderId="drivers"
        onReorder={this.props.onReorder.bind(this)}
        holdTime={500}
      >
        {
          this.props.driverList.map((driverCode, i) => (
            <div className={styles.driver}>
              <p>{i + 1}: {driverCode} +{this.props.pointsDistribution[i]}</p>
            </div>
          ))
        }
      </Reorder>
    )
  }
}

export default ReorderableDriverList
