import React, { Component } from 'react'
import { Grid, Table } from 'semantic-ui-react'

export default class GameTables extends Component {
  render() {
    const tableData = this.props.tableData;
    return <Grid.Column key={ tableData.game }>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell textAlign='right'>{ tableData.gameData[0].team_away }</Table.HeaderCell>
            <Table.HeaderCell textAlign='center'>AT</Table.HeaderCell>
            <Table.HeaderCell textAlign='left'>{tableData.gameData[0].team_home}</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell textAlign='right'>{tableData.awayRushingYards}</Table.Cell>
            <Table.Cell textAlign='center'>Rush Yds</Table.Cell>
            <Table.Cell textAlign='left'>{tableData.homeRushingYards}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell textAlign='right'>{tableData.awayPassingYards}</Table.Cell>
            <Table.Cell textAlign='center'>Rec Yds</Table.Cell>
            <Table.Cell textAlign='left'>{tableData.homePassingYards}</Table.Cell>
          </Table.Row>
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell textAlign='right'>{ tableData.awayRushingYards + tableData.awayPassingYards }</Table.HeaderCell>
            <Table.HeaderCell textAlign='center'>Total Yds</Table.HeaderCell>
            <Table.HeaderCell textAlign='left'>{ tableData.homeRushingYards + tableData.homePassingYards }</Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </Grid.Column>
  }
}