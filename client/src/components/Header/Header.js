import React, { Component } from 'react'
import { Container, Image, Menu } from 'semantic-ui-react'
import { NavLink  } from 'react-router-dom'

class MainHeader extends Component {
  render() {
    return(
      <Menu fixed='top' inverted>
        <Container>
          <Menu.Item as='a' header>
            <Image size='mini' src='https://stats.simulationfl.net/wp-content/uploads/2021/07/Screen-Shot-2020-12-09-at-10.54.54-AM-300x243-1.png' style={{marginRight: '1.5em'}}/>
            SFL
          </Menu.Item>
          <Menu.Item as={ NavLink } name='gameData' to='/'>Game Data</Menu.Item>
          <Menu.Item as={ NavLink } name='playerData' to='/playerData'>Player Data</Menu.Item>

          {/*<Dropdown item simple text='Dropdown'>*/}
          {/*  <Dropdown.Menu>*/}
          {/*    <Dropdown.Item>List Item</Dropdown.Item>*/}
          {/*    <Dropdown.Item>List Item</Dropdown.Item>*/}
          {/*    <Dropdown.Divider />*/}
          {/*    <Dropdown.Header>Header Item</Dropdown.Header>*/}
          {/*    <Dropdown.Item>*/}
          {/*      <i className='dropdown icon' />*/}
          {/*      <span className='text'>Submenu</span>*/}
          {/*      <Dropdown.Menu>*/}
          {/*        <Dropdown.Item>List Item</Dropdown.Item>*/}
          {/*        <Dropdown.Item>List Item</Dropdown.Item>*/}
          {/*      </Dropdown.Menu>*/}
          {/*    </Dropdown.Item>*/}
          {/*    <Dropdown.Item>List Item</Dropdown.Item>*/}
          {/*  </Dropdown.Menu>*/}
          {/*</Dropdown>*/}
        </Container>
      </Menu>
    )
  }
}

export default MainHeader