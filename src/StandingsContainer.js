import React from 'react'
import ReorderableDriverList from './ReorderableDriverList.js'
import LiveTeamStandings from './LiveTeamStandings.js'
import { reorder } from 'react-reorder'

class StandingsContainer extends React.Component {

  pointsDistribution = [
    25,
    18,
    15,
    12,
    10,
    8,
    6,
    4,
    2,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
  ]

  constructor(props) {
    super(props)
    this.state = {
      driverList: [
        "HAM",
        "BOT",
        "VER",
        "RIC",
        "PER",
        "NOR",
        "ALB",
        "LEC",
        "STR",
        "GAS",
        "SAI",
        "OCO",
        "VET",
        "KVY",
        "GIO",
        "RAI",
        "GRO",
        "MAG",
        "LAT",
        "RUS",
      ],
    }
    this.onReorder = this.onReorder.bind(this)
  }

  onReorder(event, previousIndex, nextIndex, fromId, toId) {
    this.setState({
      driverList: reorder(this.state.driverList, previousIndex, nextIndex)
    })
  }

  render () {
    return (
      <div style={{display: "flex"}}>
        <ReorderableDriverList pointsDistribution={this.pointsDistribution} onReorder={this.onReorder} driverList={this.state.driverList} />
        <LiveTeamStandings pointsDistribution={this.pointsDistribution} driverList={this.state.driverList} />
      </div>
    )
  }
}

export default StandingsContainer
