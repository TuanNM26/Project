import React from 'react';
import { Layout } from 'antd';
const { Footer: FooterAntd } = Layout;

const Footer = () => {
  return (
    <FooterAntd
      style={{
        textAlign: 'center',
      }}
    >
      Quiz Practice ©2023 Created by Team 5 - SWP391
    </FooterAntd>
  );
};

export default Footer;
