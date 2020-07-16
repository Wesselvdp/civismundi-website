import React from 'react'
import styled from 'styled-components'
import { get } from 'lodash'

const Select = ({ options, onChange, value }) => (
  <StyledSelect selected={value} onChange={(ev) => onChange(get(ev, 'target.value'))}>
    {options && options.map(option => (
      <option value={option.value} key={option.value}>
        {option.title}
      </option>
    ))}
  </StyledSelect>
)

export default Select

const StyledSelect = styled.select`
  appearance: none;
  border-radius: 0;
  outline: 0;
  padding: 15px;
  background: transparent;
  text-transform: uppercase;
  color: #fff;
  font-family: 'Druk Wide Bold';
`