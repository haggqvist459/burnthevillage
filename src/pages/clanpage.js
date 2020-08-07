import React, { Component } from 'react';
import { Link } from "react-router-dom";
import '../sass/pages/clanpage.scss';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import firebase from '../components/firebase/config';
import { withRouter } from "react-router";

class ClanPage extends Component {

    constructor(props) {
        super(props);
        const clanTag = this.props.match.params.clanTag;
        console.log('clan tag: ' + clanTag);
        this.state = { 
            clanTag: this.props.match.params.clanTag,
            clan: {}
        };
    }

    async setClanData() {
        fetch('https://australia-southeast1-burnthevillage.cloudfunctions.net/clanByTag/', {
            method: "GET",
            headers: {
                clanTag: this.state.clanTag,
            }
        })
            .then(res => res.json())
            .then(json => {
                console.log(json);
                this.setState({
                    clan: json
                });
            })
    }

    componentDidMount() {

        try {
            this.setClanData();
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
                                   {this.state.clan.name ? this.state.clan.name : 'loading.. '}
                        </p>
                                <p className="profile_container__profile_row__profile_fields__clan">
                                    Sample Clan
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

export default withRouter(ClanPage);

