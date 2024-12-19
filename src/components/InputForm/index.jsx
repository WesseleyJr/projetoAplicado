import React from 'react'
import { Container, Input, Label } from './styles'

export default function InputForm({ 
  disabled, 
  title, 
  handleFunction, 
  propsValue, 
  propsPlaceHolder, 
  propsWidth, 
  handleBlurFunction, 
  propsRequired=false, 
  type, 
  propsMaxLength, 
  propsHeigth, 
  propsFile 
}) {
  return (
    <Container style={{width: propsWidth ? propsWidth : '100%'}}>
        <Label tabIndex={0}>{title}</Label>
        <Input 
          tabIndex={0} 
          style={{height: propsHeigth}} 
          disabled={disabled} 
          placeholder={propsPlaceHolder} 
          onChange={handleFunction} 
          value={propsValue} 
          onBlur={handleBlurFunction} 
          required={propsRequired} 
          type={type} 
          maxLength={propsMaxLength} 
          accept={propsFile}
        />
    </Container>
  )
}
