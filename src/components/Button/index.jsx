import React from 'react'
import { ButtonStyle } from './styles'

export default function Button({title, handleFunction, type}) {
  return (
    <>
        <ButtonStyle type={type} onClick={handleFunction}>{title}</ButtonStyle>
    </>
  )
}
