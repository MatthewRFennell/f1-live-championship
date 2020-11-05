import React from 'react'
import styles from './LiveTeamStandings.module.scss'

class LiveTeamStandings extends React.Component {

  state = {
    constructorStandings: [],
  }

  componentDidMount() {
    fetch('http://ergast.com/api/f1/current/constructorStandings.json')
        .then(res => res.json())
        .then(data => data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings)
        .then(data => data.map(constructor => {
          return {
            id: constructor.Constructor.constructorId,
            name: constructor.Constructor.name,
            points: constructor.points,
          }
        }))
        .then(data => this.setState({ constructorStandings: data }))
  }

  todaysPointsOf(team) {
    const driversOfTeam = this.pointsMap().find(constructor => constructor.id === team).drivers
    const assignedPoints = this.props.driverList.map((code, i) =>
      [code, this.props.pointsDistribution[i]]
    )
    const teamPoints = assignedPoints.filter((driver) =>
      driversOfTeam.includes(driver[0])
    )
    return teamPoints.map((driverPoints) => driverPoints[1])
                     .reduce((sum, current) => sum + current, 0)
  }

  pointsMap() {
    return this.state.constructorStandings.map((constructor) => {
      return {
        id: constructor.id,
        name: constructor.name,
        points: constructor.points,
        drivers: this.props.constructorsOfDrivers.filter(driver => driver.constructorId === constructor.id).map(driver => driver.code)
      }
    })
  }

  livePoints() {
    return this.pointsMap().map(constructor => {
      return {
        name: constructor.name,
        points: parseInt(constructor.points) + parseInt(this.todaysPointsOf(constructor.id))
      }
    })
  }

  render() {
    const liveTeamStandings = this.livePoints().sort((team1, team2) => team2.points - team1.points).map((team, i) => <p>{i + 1}: {team.name} - {team.points}</p>)
    return (
      <div className={styles.team}>{liveTeamStandings}</div>
    )
  }
}

export default LiveTeamStandings
