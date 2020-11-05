import React from 'react'
import ReorderableDriverList from './ReorderableDriverList.js'
import LiveTeamStandings from './LiveTeamStandings.js'
import { reorder } from 'react-reorder'

class StandingsContainer extends React.Component {

  state = {
    constructorsOfDrivers: [],
    driverList: [],
  }

  pointsDistribution = [
    25, 18, 15, 12, 10, 8, 6, 4, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]

  componentDidMount() {
    fetch('http://ergast.com/api/f1/current/last/qualifying.json')
        .then(res => res.json())
        .then(data => data.MRData.RaceTable.Races[0].QualifyingResults)
        .then(data => data.map(driver => {
          return {
            code: driver.Driver.code,
            constructorId: driver.Constructor.constructorId,
          }
        }))
        .then(data => this.setState({
          constructorsOfDrivers: data,
          driverList: data.map(driver => driver.code)
        }))
  }

  constructor(props) {
    super(props)
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
        <LiveTeamStandings constructorsOfDrivers={this.state.constructorsOfDrivers} pointsDistribution={this.pointsDistribution} driverList={this.state.driverList} />
      </div>
    )
  }
}

export default StandingsContainer
