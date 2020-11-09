import { Route, Switch } from 'react-router';

import AllCategories from '../pages/categoryPages/AllCategories';
import CategorySingle from '../pages/CategorySingle';
import ContactUs from '../pages/ContactUs';
import Gallery from '../pages/Gallery';
import Favourites from '../pages/Favourites';
import Home from '../pages/Home';
import LatestNews from '../pages/LatestNews';
import MyAccount from '../pages/myAccount/MyAccount';
import NotFound from '../components/common/NotFound';
import ProductSingle from '../pages/ProductSingle';
import { Products } from '../pages/Products';
import React from 'react';
import RecentlyRebuiltEngines from '../pages/RecentlyRebuiltEngines';
import RollCages from '../pages/RollCages';
import Search from '../pages/Search';
import ShoppingList from '../pages/cartPage/ShoppingList';
import SinglePost from '../pages/blogPages/SinglePost';
import SingleSeaterMoulds from '../pages/SingleSeaterMoulds';
import LoginPage from '../pages/LoginPage';
import LogoutPage from '../pages/LogoutPage';
import Registration from '../pages/CreateAccount';
import PageError from '../pages/errorPage/PageError';
import EmailError from '../pages/emailErrorPage/EmailError';

const Routes = () => (
  <Switch>
    <Route exact path='/' component={Home} />
    <Route exact path='/gallery' component={Gallery} />
    <Route path='/all-products' component={Products} />
    <Route exact path='/search' component={Search} />
    <Route exact path='/contact' component={ContactUs} />
    <Route exact path='/my-account' component={MyAccount} />
    <Route exact path='/single-seater-moulds' component={SingleSeaterMoulds} />
    <Route
      exact
      path='/engine-building-service'
      component={RecentlyRebuiltEngines}
    />
    <Route exact path='/latest-news' component={LatestNews} />
    <Route exact path='/shopping-list' component={ShoppingList} />
    <Route exact path='/roll-cages' component={RollCages} />
    <Route exact path='/product/:slug/' component={ProductSingle} />
    <Route exact path='/product-category' component={AllCategories} />
    <Route exact path='/posts/:id' component={SinglePost} />
    <Route exact path='/product-category/:slug' component={CategorySingle} />
    <Route exact path='/saved-items' component={Favourites} />
    <Route exact path='/login' component={LoginPage} />
    <Route exact path='/logout' component={LogoutPage} />
    <Route exact path='/registration' component={Registration} />
    <Route exact path='/page-error' component={PageError} />
    <Route exact path='/email-error' component={EmailError} />

    <Route path='*' component={NotFound} />
  </Switch>
);

export default Routes;
