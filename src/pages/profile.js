import React, { Component } from 'react';
import { Link } from "react-router-dom";
import '../sass/pages/profile.scss';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import firebase from '../components/firebase/config';

class Profile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            playerTag: "2L29QJY9",
            player: {},
            clanTag: null,
            clan: {}
        }
    }


    async setPlayerData() {
        fetch('https://australia-southeast1-burnthevillage.cloudfunctions.net/playerByTag/', {
            method: "GET",
            headers: {
                playerTag: this.state.playerTag,
            }
        })
            .then(res => res.json())
            .then(json => {
                console.log(json);
                this.setState({
                    player: json,
                    clan: json.clan
                });
                var tag = this.state.clan.tag;
                var noBracketTag = tag.slice(1);
                this.setState({ clanTag: noBracketTag });
                console.log('clan tag for clanpage: ' + noBracketTag)
            })
    }

    componentDidMount() {

        try {
            this.setPlayerData();
        } catch (error) {
            console.log(error);
        }
    }

    signOut() {
        firebase.auth().signOut()
    }

    render() {

        return (
            <div>
                <Header />

                <div className="profile_container">
                    <div className="profile_container__profile_row">

                        <div className="profile_container__profile_row__profile_box">

                            <div className="profile_container__profile_row__profile_picture">

                            </div>

                            <div onClick={this.signOut} className="profile_container__profile_row__profile_fields">
                                <p className="profile_container__profile_row__profile_fields__name">
                                    {this.state.player.name ? this.state.player.name : "loading.. "}
                                </p>
                                <p className="profile_container__profile_row__profile_fields__clan">
                                <Link to={{
                                    pathname: this.state.clanTag,
                                    state: {clanTag: this.state.clanTag}
                                }}>
                                {this.state.clan.name ? this.state.clan.name : "loading.. "}
                                </Link>
                                
                                </p>
                                <p className="profile_container__profile_row__profile_fields__upload_history">
                                    Upload history
                        </p>

                                <a href="/.netlify/functions/profileData">Trigger Function</a>
                            </div>

                        </div>

                        <div className="profile_container__profile_row__edit_profile">
                            <p>edit profile</p>
                        </div>

                    </div>

                    <div className="profile_container__bio_row">
                        <h3>Bio:</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget metus et elit tempus imperdiet.
                        Nunc facilisis cursus mi, vel consectetur dolor pretium ac.
                        Nulla pellentesque, elit id feugiat vestibulum, libero sem finibus sapien, in elementum augue lorem non eros.
                    Vestibulum dolor ex, semper hendrerit quam at, viverra efficitur est.</p>
                    </div>

                </div>

                <Footer />
            </div>
        )
    }
}

export default Profile;

