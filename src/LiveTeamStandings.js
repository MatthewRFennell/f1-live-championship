import React from 'react'

class LiveTeamStandings extends React.Component {

  teams = [
    {
      "Name": "Mercedes",
      "Drivers": [
        {
          "Code": "HAM",
          "Points": "230"
        },
        {
          "Code": "BOT",
          "Points": "161"
        },
      ],
      "PointsDeducted": "0",
    },
    {
      "Name": "Red Bull",
      "Drivers": [
        {
          "Code": "VER",
          "Points": "147"
        },
        {
          "Code": "ALB",
          "Points": "64"
        },
      ],
      "PointsDeducted": "0",
    },
    {
      "Name": "Racing Point",
      "Drivers": [
        {
          "Code": "PER",
          "Points": "68"
        },
        {
          "Code": "STR",
          "Points": "57"
        },
        {
          "Code": "HUL",
          "Points": "10"
        },
      ],
      "PointsDeducted": "15"
    },
    {
      "Name": "McLaren",
      "Drivers": [
        {
          "Code": "NOR",
          "Points": "65"
        },
        {
          "Code": "SAI",
          "Points": "51"
        },
      ],
      "PointsDeducted": "0",
    },
    {
      "Name": "Renault",
      "Drivers": [
        {
          "Code": "RIC",
          "Points": "78"
        },
        {
          "Code": "OCO",
          "Points": "36"
        },
      ],
      "PointsDeducted": "0",
    },
    {
      "Name": "Ferrari",
      "Drivers": [
        {
          "Code": "LEC",
          "Points": "63"
        },
        {
          "Code": "VET",
          "Points": "17"
        },
      ],
      "PointsDeducted": "0",
    },
    {
      "Name": "AlphaTauri",
      "Drivers": [
        {
          "Code": "GAS",
          "Points": "53"
        },
        {
          "Code": "KVY",
          "Points": "14"
        },
      ],
      "PointsDeducted": "0",
    },
    {
      "Name": "Alfa Romeo",
      "Drivers": [
        {
          "Code": "GIO",
          "Points": "3"
        },
        {
          "Code": "RAI",
          "Points": "2"
        },
      ],
      "PointsDeducted": "0",
    },
    {
      "Name": "Haas",
      "Drivers": [
        {
          "Code": "GRO",
          "Points": "2"
        },
        {
          "Code": "MAG",
          "Points": "1"
        },
      ],
      "PointsDeducted": "0",
    },
    {
      "Name": "Williams",
      "Drivers": [
        {
          "Code": "LAT",
          "Points": "0"
        },
        {
          "Code": "RUS",
          "Points": "0"
        },
      ],
      "PointsDeducted": "0",
    },
  ]

  todaysPointsOf(team) {
    const driversOfTeam = team["Drivers"].map((driver) => driver["Code"])
    const assignedPoints = this.props.driverList.map((code, i) =>
      [code, this.props.pointsDistribution[i]]
    )
    console.log(assignedPoints)
    console.log(driversOfTeam)
    const teamPoints = assignedPoints.filter((driver) =>
      driversOfTeam.includes(driver[0])
    )
    return teamPoints.map((driverPoints) => driverPoints[1])
                     .reduce((sum, current) => sum + current, 0)
  }

  combinedPointsOf(team) {
    const drivers = team["Drivers"]
    return drivers.map((driver) => +driver["Points"])
                  .reduce((sum, current) => sum + current, 0) - team["PointsDeducted"] + this.todaysPointsOf(team)
    
  }

  pointsMap() {
    return this.teams.map((team) => [team["Name"], this.combinedPointsOf(team)])
  }

  render() {
    const liveTeamStandings = this.pointsMap().sort((team1, team2) => team2[1] - team1[1]).map(team => <h3>{team[0]}: {team[1]}</h3>)
    return (
      <ul>{liveTeamStandings}</ul>
    )
  }
}

export default LiveTeamStandings
