import React from 'react'
import styled from 'styled-components'
import { get } from 'lodash'

const Select = ({ options, onChange, value }) => (
  <Container>
    <img src="/arrow-down.svg" />
    <StyledSelect selected={value} onChange={(ev) => onChange(get(ev, 'target.value'))}>
      {options && options.map(option => (
        <option value={option.value} key={option.value}>
          {option.title}
        </option>
      ))}
    </StyledSelect>
  </Container>
)

export default Select

const Container = styled.div`
  position: relative;
  display: inline-block;

  img {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
  }
` 

const StyledSelect = styled.select`
  appearance: none;
  border-radius: 0;
  outline: 0;
  padding: 15px;
  padding-right: 45px;
  background: transparent;
  text-transform: uppercase;
  color: #fff;
  font-family: 'Druk Wide Super';
`