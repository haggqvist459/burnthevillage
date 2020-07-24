import React, { Component } from "react";
import HamburgerMenu from 'react-hamburger-menu';
import MenuContent from './menuContent';
import CheeseburgerMenu from 'cheeseburger-menu'


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
    this.setState({ menuOpen: menu })
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
        />

        <CheeseburgerMenu
          isOpen={this.state.menuOpen}
          closeCallback={this.closeMenu.bind(this)}
          topOffset="15vh"
          bottomOffset="10vh"
          backgroundColor="transparent"
          noShadow={true}
          width={200}
        >
          <MenuContent closeCallback={this.closeMenu.bind(this)} />
        </CheeseburgerMenu>

        {/* <div className="drawer">
          <Drawer
            anchor="left"
            open={this.state.menuOpen}
            BackdropProps={{ invisible: true }}
          >
            <MenuContent closeCallback={this.closeMenu.bind(this)} />

          </Drawer>
        </div> */}

      </div>
    );
  }
}


export default Hamburger;