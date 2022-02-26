import React from 'react'
import { Container } from 'semantic-ui-react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import MainHeader from './components/Header/Header';
import GameGrid from './components/GameData/GameGrid';
import PlayerData from './components/PlayerData/PlayerData';

const GridLayout = () => (
<div>
  <Container style={{ paddingTop: '5em' }}>
    <BrowserRouter>
      <MainHeader />
      <Routes>
        <Route path="/" element={<GameGrid />} />
        <Route path="/playerData" element={<PlayerData />} />
      </Routes>
    </BrowserRouter>
  </Container>
</div>
)

export default GridLayout