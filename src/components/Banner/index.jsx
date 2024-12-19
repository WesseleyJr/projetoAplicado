import React from 'react'
import { Container, Logo, Title } from './styles'
import LogoImage from '../../assets/images/logo.png'

export default function Banner({title = 'Texto Padrao'}) {
  return (
    <Container>  
        <Logo src={LogoImage} alt='Logo' tabIndex={0}/>
        <Title tabIndex={0}>{title}</Title>
    </Container>
  )
}
