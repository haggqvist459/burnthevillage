import React, { Component } from "react";
import CheeseburgerMenu from "cheeseburger-menu";
import HamburgerMenu from 'react-hamburger-menu';
import MenuContent from './menuContent';

class Hamburger extends Component {

  constructor(props) {
    super(props);

    this.state = {
      menuOpen: false
    };
  }

  closeMenu() {
    this.setState({ menuOpen: false });
  }

  toggleMenu(menu) {
    this.setState({ menuOpen: menu})
  }

  render() {
    return (
      <div>
        <HamburgerMenu
          isOpen={this.state.menuOpen}
          menuClicked={() => this.toggleMenu(!this.state.menuOpen)}
          width={32}
          height={24}
          strokeWidth={3}
          rotate={0}
          color="white"
          borderRadius={0}
          animationDuration={0.5}
        />

        <CheeseburgerMenu
          isOpen={this.state.menuOpen}
          closeCallback={this.closeMenu.bind(this)}
          topOffset="15vh"
        >
          <MenuContent closeCallback={this.closeMenu.bind(this)} />
        </CheeseburgerMenu>
      </div>
    );
  }
}


export default Hamburger;