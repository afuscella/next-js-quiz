import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const InputBase = styled.input`
  width: 100%;
  padding: 12px;
  font-size: 14px;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.inverseText};
  border-radius: ${({ theme }) => theme.borderRadius};
  outline: 0;
  margin-bottom: 14px;
`;

export default function Input({ onChange, placeholder, ...props }) {
  return (
    <>
      <InputBase
        onChange={onChange}
        placeholder={placeholder}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      />
    </>
  );
}

Input.defaultProps = {
  value: '',
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string,
};
