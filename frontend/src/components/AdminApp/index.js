import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import NavigationDrawer from 'react-md/lib/NavigationDrawers';
import {
  MenuButton,
  ListItem
} from 'react-md';
import NavLink from './NavLink';
import AppliedRoute from "../../utils/AppliedRoute";

import Accounts from './Accounts';
import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';

const navItems = [{
  exact: true,
  label: 'Accounts',
  to: '/admin',
  icon: 'home',
}, {
  label: 'Page 1',
  to: '/admin/page-1',
  icon: 'bookmark',
}, {
  label: 'Page 2',
  to: '/admin/page-2',
  icon: 'donut_large',
}, {
  label: 'Page 3',
  to: '/admin/page-3',
  icon: 'flight_land',
}];

const KebabMenu = ({ className, handleLogout }) => (
  <MenuButton
    id='user-menu'
    icon
    className={className}
    menuItems = {[<ListItem primaryText="Logout" onClick={handleLogout} key='logout'/>]}
  >
    more_vert
</MenuButton>
);


class AdminApp extends Component {
  render() {
    const { handleLogout } = this.props;
    const childProps = {
      handleLogout: handleLogout,
    };
    return (
      <Route
        render={({ location }) => (
          <NavigationDrawer
            drawerTitle="Menu"
            toolbarTitle="Trestle"
            // toolbarActions={<KebabMenu id="toolbar-themed-kebab-menu" menuItems = {['Logout']} />}
            toolbarActions={<KebabMenu handleLogout={handleLogout}/>}
            tabletDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT_MINI}
            desktopDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT_MINI}
            navItems={navItems.map(props => <NavLink {...props} key={props.to} />)}
          >
          {/* adding location as a prop on the switch prevents odd behavior with componentDidMount() being called twice */}
            <Switch key={location.key} location={location}>
              <AppliedRoute exact path="/admin" location={location} component={Accounts} props={childProps} />
              <AppliedRoute path="/admin/page-1" location={location} component={Page1} props={childProps} />
              <AppliedRoute path="/admin/page-2" location={location} component={Page2} props={childProps} />
              <AppliedRoute path="/admin/page-3" location={location} component={Page3} props={childProps} />
            </Switch>
          </NavigationDrawer>
        )}
      />
    );
  }
}

export default AdminApp;
