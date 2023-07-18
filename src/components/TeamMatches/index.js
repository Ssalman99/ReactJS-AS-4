// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import MatchCard from '../MatchCard'
import LatestMatch from '../LatestMatch'

import './index.css'

class TeamMatches extends Component {
  state = {
    isLoading: true,
    teamData: {},
  }

  componentDidMount() {
    this.getMatch()
  }

  getUpdatedData = data => ({
    umpires: data.umpires,
    result: data.result,
    manOfTheMatch: data.man_of_the_match,
    id: data.id,
    date: data.date,
    venue: data.venue,
    competingTeam: data.competing_team,
    competingTeamLogo: data.competing_team_logo,
    firstInnings: data.first_innings,
    secondInnings: data.second_innings,
    matchStatus: data.match_status,
  })

  getMatch = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const jsonData = await response.json()
    console.log(jsonData.team_banner_url)
    const updatedData = {
      teamBannerUrl: jsonData.team_banner_url,
      latestMatchDetails: this.getUpdatedData(jsonData.latest_match_details),
      recentMatches: jsonData.recent_matches.map(each =>
        this.getUpdatedData(each),
      ),
    }
    this.setState({teamData: updatedData, isLoading: false})
  }

  getRouteClassName = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    switch (id) {
      case 'RCB':
        return 'rcb'
      case 'KKR':
        return 'kkr'
      case 'KXP':
        return 'kxp'
      case 'CSK':
        return 'csk'
      case 'RR':
        return 'rr'
      case 'MI':
        return 'mi'
      case 'SH':
        return 'srh'
      case 'DC':
        return 'dc'
      default:
        return ''
    }
  }

  loader = () => (
    <div testid="loader" className="loader-container">
      <Loader type="Oval" color="#ffffff" height={50} />
    </div>
  )

  renderRecentMatchesList = () => {
    const {teamData} = this.state
    const {recentMatches} = teamData
    console.log(recentMatches)

    return (
      <ul className="recent-matches-list">
        {recentMatches.map(recentMatch => (
          <MatchCard matchDetails={recentMatch} key={recentMatch.id} />
        ))}
      </ul>
    )
  }

  teamMatches = () => {
    const {teamData} = this.state
    const {teamBannerUrl, latestMatchDetails} = teamData

    return (
      <div className="responsive-container">
        <img src={teamBannerUrl} alt="team banner" className="team-banner" />
        <LatestMatch latestMatchData={latestMatchDetails} />
        {this.renderRecentMatchesList()}
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
    const className = `team-container ${this.getRouteClassName()}`

    return (
      <div className={className}>
        {isLoading ? this.loader() : this.teamMatches()}
      </div>
    )
  }
}

export default TeamMatches
