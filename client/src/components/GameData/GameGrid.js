import React, { Component } from 'react'
import { Container, Grid, Header } from 'semantic-ui-react'
import axios from 'axios';
import _ from 'lodash';

import GameTables from './GameTables';

export default class GameGrid extends Component {
  state = {
    rawData: [],
    gameData: []
  };

  getPlayByPlay = () => {
    axios.get('https://sheets.googleapis.com/v4/spreadsheets/1NTEyWCwq-aHKC0HLsrao8AHCGfc0cDFBhlvRgQK6nyU/values:batchGet?ranges=A1%3AZZ10000&valueRenderOption=FORMATTED_VALUE&key=AIzaSyBesotaNgSaTUIhrSKjEaExdi-ksKInhoE')
      .then((res) => {
        const rawData = res.data.valueRanges[0].values;
        const playByPlayData = rawData.slice(1).map(row => row.reduce(function(acc, cur, i) {
          acc[rawData[0][i]] = cur;
          return acc;
        }, {}));
        this.setState({ rawData : playByPlayData });
        this.loadGameData()
      });
  }

  loadGameData = () => {
    const { rawData } = this.state;

    const gameNumberMap = rawData.map(item => { return item.game })
    const gameNumberArray = [...new Set(gameNumberMap)]

    const gameDataByGame = gameNumberArray.map((game) => {
      const gameTable =  rawData.filter(item => { return item['game'] === game });

      return {
        game : game,
        gameData : gameTable,
        homeRushingYards : _.sumBy(gameTable, item => Number(item.home_rush_yds)),
        homePassingYards : _.sumBy(gameTable, item => Number(item.home_catch_yds)),
        awayRushingYards : _.sumBy(gameTable, item => Number(item.away_rush_yds)),
        awayPassingYards : _.sumBy(gameTable, item => Number(item.away_catch_yds))
      }
    });
    this.setState({ gameData : gameDataByGame });
  }

  componentDidMount() {
    this.getPlayByPlay();
    // setInterval(() => {
    //   this.getPlayByPlay();
    // }, 5000);
  }

  render() {
    const { gameData } = this.state;
    console.log("render gameData", gameData)

    return (
      <Container>
        <Header as='h2' inverted textAlign='center'>
          Game Data
        </Header>
        <Grid stackable celled columns={4}>
          <Grid.Row>
            { gameData.map((item, index) => (
              <Grid.Column key={ index }>
                <GameTables tableData={ item } />
              </Grid.Column>
            ))}
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}