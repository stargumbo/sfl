import React, { Component } from 'react'
import {Container, Header, Table, Tab} from 'semantic-ui-react'
import axios from "axios";
import _ from 'lodash';
// import GameTables from "../GameData/GameTables";

export default class PlayerData extends Component {
  state = {
    rawPlayerData: [],
    playerData: []
  };

  getPlayerFeed = () => {
    axios.get('https://sheets.googleapis.com/v4/spreadsheets/1cTwsuoh9vSjo4T4Xw-6rm2vWzCe84YYpJ_Qe5dMcRYU/values:batchGet?ranges=O_Raw_Reg!A1%3AZZ10000&valueRenderOption=FORMATTED_VALUE&key=AIzaSyBesotaNgSaTUIhrSKjEaExdi-ksKInhoE')
      .then((res) => {
        const rawData = res.data.valueRanges[0].values;
        const playerFeedData = rawData.slice(1).map(row => row.reduce(function(acc, cur, i) {
          acc[rawData[0][i]] = cur;
          return acc;
        }, {}));
        this.setState({ rawPlayerData : playerFeedData });
        this.loadPlayerData()
      });
  }


  loadPlayerData = () => {
    const { rawPlayerData } = this.state;

    const playerNameMap = rawPlayerData.map(item => { return item.name })
    const playerNameArray = [...new Set(playerNameMap)]

    const playerDataByName = playerNameArray.map((player) => {
      const playerTable =  rawPlayerData.filter(item => { return item['name'] === player });

      // QB
      const passComp = _.sumBy(playerTable, item => Number(item.passComp));
      const passAtt = _.sumBy(playerTable, item => Number(item.passAtt));
      const passCompPercent = _.meanBy(playerTable, item => Number(item.passCompPercent));
      const passYards = _.sumBy(playerTable, item => Number(item.passYards));
      const passTDs = _.sumBy(playerTable, item => Number(item.passComp));
      const passINTs = _.sumBy(playerTable, item => Number(item.passINTs));
      const sacked = _.sumBy(playerTable, item => Number(item.sacked));
      const sackLossYds = _.sumBy(playerTable, item => Number(item.sackLossYds));

      // RB
      const rushYards = _.sumBy(playerTable, item => Number(item.rushYards));
      const carries = _.sumBy(playerTable, item => Number(item.carries));
      const rushTD = _.sumBy(playerTable, item => Number(item.rushTD));
      const yardsPerRush = _.meanBy(playerTable, item => Number(item.yardsPerRush));

      // Receiving
      const receptions = _.sumBy(playerTable, item => Number(item.receptions));
      const recYards = _.sumBy(playerTable, item => Number(item.recYards));
      const recTD = _.sumBy(playerTable, item => Number(item.recTD));
      const yardsPerCatch = _.meanBy(playerTable, item => Number(item.yardsPerCatch));
      const targets = _.sumBy(playerTable, item => Number(item.targets));
      const fumbles = _.sumBy(playerTable, item => Number(item.fumbles));
      const fumLost = _.sumBy(playerTable, item => Number(item.fumLost));

      return {
        name: player,
        position: playerTable[0].position,
        passComp: passComp,
        passAtt: passAtt,
        passCompPercent: _.round(passCompPercent,2),
        passYards: passYards,
        passTDs: passTDs,
        passINTs: passINTs,
        sacked: sacked,
        sackedLossYds: sackLossYds,
        carries: carries,

        rushYards: rushYards,
        rushTD: rushTD,
        yardsPerRush: _.round(yardsPerRush, 2),

        receptions: receptions,
        recYards: recYards,
        recTD: recTD,
        yardsPerCatch: _.round(yardsPerCatch, 2),
        targets: targets,
        fumbles: fumbles,
        fumLost: fumLost
      }
    });
    this.setState({ playerData : playerDataByName });
  }

  componentDidMount() {
    this.getPlayerFeed();
    // setInterval(() => {
    //   this.getPlayByPlay();
    // }, 5000);
  }

  render() {
    const { playerData } = this.state;
    console.log("render playerData", playerData)

    const panes = [
      { menuItem: 'QB', render: () =>
          <Tab.Pane>
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Player</Table.HeaderCell>
                  <Table.HeaderCell textAlign='center'>Comp / Att</Table.HeaderCell>
                  <Table.HeaderCell>Comp %</Table.HeaderCell>
                  <Table.HeaderCell>Yards</Table.HeaderCell>
                  <Table.HeaderCell>TD</Table.HeaderCell>
                  <Table.HeaderCell>INT</Table.HeaderCell>
                  <Table.HeaderCell>Sacked</Table.HeaderCell>
                  <Table.HeaderCell>Sack Loss Yds</Table.HeaderCell>
                  <Table.HeaderCell>Fumb</Table.HeaderCell>
                  <Table.HeaderCell>Fumb Lost</Table.HeaderCell>
                  {/*<Table.HeaderCell>Pass Long</Table.HeaderCell>*/}
                </Table.Row>
              </Table.Header>
              <Table.Body>
                { playerData.filter(player => (player.name !== undefined && player.position === 'QB')).map((item, index) => (
                  <Table.Row key={ index }>
                    <Table.Cell>{ item.name }</Table.Cell>
                    <Table.Cell textAlign='center'>{ item.passComp } / { item.passAtt }</Table.Cell>
                    <Table.Cell>{ item.passCompPercent }</Table.Cell>
                    <Table.Cell>{ item.passYards }</Table.Cell>
                    <Table.Cell>{ item.passTDs }</Table.Cell>
                    <Table.Cell>{ item.passINTs }</Table.Cell>
                    <Table.Cell>{ item.sacked }</Table.Cell>
                    <Table.Cell>{ item.sackedLossYds }</Table.Cell>
                    <Table.Cell>{ item.fumbles }</Table.Cell>
                    <Table.Cell>{ item.fumLost }</Table.Cell>
                    {/*<Table.Cell>{ item.passLong }</Table.Cell>*/}
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Tab.Pane>
      },
      { menuItem: 'WR', render: () =>
          <Tab.Pane>
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell rowSpan='2'>Player</Table.HeaderCell>
                  <Table.HeaderCell colSpan='5'>Receiving</Table.HeaderCell>
                  <Table.HeaderCell colSpan='4'>Rushing</Table.HeaderCell>
                </Table.Row>
                <Table.Row>
                  <Table.HeaderCell>Rec</Table.HeaderCell>
                  <Table.HeaderCell>Rec Yds</Table.HeaderCell>
                  <Table.HeaderCell>Rec TD</Table.HeaderCell>
                  <Table.HeaderCell>YPC</Table.HeaderCell>
                  <Table.HeaderCell>Targets</Table.HeaderCell>

                  <Table.HeaderCell>Rush Yds</Table.HeaderCell>
                  <Table.HeaderCell>Carries</Table.HeaderCell>
                  <Table.HeaderCell>Rush TD</Table.HeaderCell>
                  <Table.HeaderCell>YPR</Table.HeaderCell>

                  <Table.HeaderCell>Fumb</Table.HeaderCell>
                  <Table.HeaderCell>Fumb Lost</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                { playerData.filter(player => (player.name !== undefined && player.position === 'WR')).map((item, index) => (
                  <Table.Row key={ index }>
                    <Table.Cell>{ item.name }</Table.Cell>

                    <Table.Cell>{ item.receptions }</Table.Cell>
                    <Table.Cell>{ item.recYards }</Table.Cell>
                    <Table.Cell>{ item.recTD }</Table.Cell>
                    <Table.Cell>{ item.yardsPerCatch }</Table.Cell>
                    <Table.Cell>{ item.targets }</Table.Cell>

                    <Table.Cell>{ item.rushYards }</Table.Cell>
                    <Table.Cell>{ item.carries }</Table.Cell>
                    <Table.Cell>{ item.rushTD }</Table.Cell>
                    <Table.Cell>{ item.yardsPerRush }</Table.Cell>

                    <Table.Cell>{ item.fumbles }</Table.Cell>
                    <Table.Cell>{ item.fumLost }</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Tab.Pane>
      },
      { menuItem: 'RB', render: () =>
          <Tab.Pane>
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell rowSpan='2'>Player</Table.HeaderCell>
                  <Table.HeaderCell colSpan='4'>Rushing</Table.HeaderCell>
                  <Table.HeaderCell colSpan='5'>Receiving</Table.HeaderCell>
                </Table.Row>
                <Table.Row>
                  <Table.HeaderCell>Rush Yds</Table.HeaderCell>
                  <Table.HeaderCell>Carries</Table.HeaderCell>
                  <Table.HeaderCell>Rush TD</Table.HeaderCell>
                  <Table.HeaderCell>YPR</Table.HeaderCell>

                  <Table.HeaderCell>Rec</Table.HeaderCell>
                  <Table.HeaderCell>Rec Yards</Table.HeaderCell>
                  <Table.HeaderCell>Rec TD</Table.HeaderCell>
                  <Table.HeaderCell>YPC</Table.HeaderCell>
                  <Table.HeaderCell>Targets</Table.HeaderCell>

                  <Table.HeaderCell>Fumb</Table.HeaderCell>
                  <Table.HeaderCell>Fumb Lost</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                { playerData.filter(player => (player.name !== undefined && player.position === 'RB')).map((item, index) => (
                  <Table.Row key={ index }>
                    <Table.Cell>{ item.name }</Table.Cell>
                    <Table.Cell>{ item.rushYards }</Table.Cell>
                    <Table.Cell>{ item.carries }</Table.Cell>
                    <Table.Cell>{ item.rushTD }</Table.Cell>
                    <Table.Cell>{ item.yardsPerRush }</Table.Cell>

                    <Table.Cell>{ item.receptions }</Table.Cell>
                    <Table.Cell>{ item.recYards }</Table.Cell>
                    <Table.Cell>{ item.recTD }</Table.Cell>
                    <Table.Cell>{ item.yardsPerCatch }</Table.Cell>
                    <Table.Cell>{ item.targets }</Table.Cell>
                    <Table.Cell>{ item.fumbles }</Table.Cell>
                    <Table.Cell>{ item.fumLost }</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Tab.Pane>
      },
    ]

    return (
      <Container>
        <Header as='h2' inverted textAlign='center'>
          JAX Kings
        </Header>
        <Tab panes={panes} menu={{ color:'grey', pointing:true, inverted: false, attached: false, tabular: false }} />

      </Container>
    )
  }
}