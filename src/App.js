import FooterCopyright from './components/partials/footer/FooterCopyright';
import Header from './components/partials/Header';
import Layout from './components/common/Layout';
import React from 'react';
import Routes from './routes';
import SidebarNews from './components/partials/sidebarNews/SidebarNews';
import { SiteFooter } from './components/partials/footer';
import { Switch } from 'react-router-dom';

const App = () => (
  <>
    <Layout
      data-namespace='page-template-full'
      className='teamdeville-container'
    >
      <Header />
      <SidebarNews />
      <Switch>
        <Routes />
      </Switch>
    </Layout>
    <footer className='mainSiteFooter'>
      <SiteFooter />
      <FooterCopyright />
    </footer>
  </>
);

export default App;
