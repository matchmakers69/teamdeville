import FooterBckTop from './FooterBckTop';
import FooterLogin from './FooterLogin';
import React from 'react';

const SiteFooter = () => {
  if (!/login/.test(window.location.pathname)) {
    return <FooterBckTop />;
  }

  return <FooterLogin />;
};

export default SiteFooter;
