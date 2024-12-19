import React from 'react'
import { Container, Input, Label } from './styles'

export default function AreaForm({disabled,title,handleFunction, propsValue, propsPlaceHolder, propsWidth, handleBlurFunction, propsRequired=false, type, propsMaxLength, propsHeigth}) {
  return (
    <Container style={{width: propsWidth? propsWidth : '100%'}}>
        <Label>{title}</Label>
        <Input style={{height: propsHeigth}} disabled={disabled} placeholder={propsPlaceHolder} onChange={handleFunction} value={propsValue} onBlur={handleBlurFunction} required={propsRequired} type={type} maxLength={propsMaxLength}/>
    </Container>
  )
}
