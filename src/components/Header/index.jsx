import React from 'react'
import { HeaderStyle, Logout, Text } from './styles'
import { useAuth } from '../../context/UseContext'

export default function Header({name = 'Fulano', matricula = '123', handleFunction, titleButton = 'Voltar'}) {

  return (
    <HeaderStyle>
    <Text tabIndex={0}>{`${name} - ${matricula}`}</Text>
    <Logout onClick={handleFunction} tabIndex={0}>{titleButton}</Logout>
   </HeaderStyle>
  )
}
