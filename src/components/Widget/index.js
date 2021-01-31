// src/components/Widget/index.js
import styled from 'styled-components';

const Widget = styled.div`
  margin-top: 24px;
  margin-bottom: 24px;
  border: 2px solid ${({ theme }) => theme.colors.mainBg};
  background-color: ${({ theme }) => `${theme.colors.mainBg}40`};
  border-radius: 8px;
  overflow: hidden;
  h1, h2, h3 {
    font-size: 16px;
    font-weight: 700;
    line-height: 1;
    margin-bottom: 0;
  }
  p {
    font-size: 14px;
    font-weight: 400;
    line-height: 1;
  }
  @media screen and (max-width: 500px) {
    background-color: ${({ theme }) => `${theme.colors.primary}FF`};
  }
`;

Widget.Header = styled.header`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 18px 32px;
  background-color: ${({ theme }) => theme.colors.mainBg};
  * {
    margin: 0;
  }
`;

Widget.Content = styled.div`
  padding: 24px 32px 24px 32px;
  & > *:first-child {
    margin-top: 0;
  }
  & > *:last-child {
    margin-bottom: 0;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  @media screen and (max-width: 500px) {
    background-color: ${({ theme }) => `${theme.colors.mainBg}60`};
  }
`;

Widget.Topic = styled.a`
  outline: 0;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.contrastText};
  background-color: ${({ theme }) => `${theme.colors.mainBg}40`};
  padding: 10px 15px;
  margin-bottom: 8px;
  cursor: pointer;
  border-radius: ${({ theme }) => theme.borderRadius};
  transition: .3s;
  display: block;
  
  &:hover,
  &:focus {
    opacity: 0.75;
  }
`;

Widget.Footer = styled.footer`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 18px 32px;
  background-color: ${({ theme }) => theme.colors.mainBg};
  * {
    margin: 0;
  }
`;

export default Widget;
