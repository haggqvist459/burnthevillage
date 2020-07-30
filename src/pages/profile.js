import React, { Component } from 'react';
import '../sass/pages/profile.scss';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
//import {ProfileData} from '../components/api/profileData';
//import clashApi from 'clash-of-clans-api';
import firebase from '../components/firebase/config';

// const client = clashApi({
//     token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjQzZTUyMTUwLWJjODMtNDMwNi05ZWUxLWE0ZWQyZGJmZjU5OSIsImlhdCI6MTU5NTc3MjI0OCwic3ViIjoiZGV2ZWxvcGVyL2QwNDhlNjI1LTE0MjUtYzU2Yy01NTViLWY1MTIyMmZiNDAyZiIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjYwLjI0MS4yMjkuMjM2Il0sInR5cGUiOiJjbGllbnQifV19.NCgihYBBP8e55BpViHcqR5U4ng2OJKTiZVyiPpOY0t_xVQxI-8PI1MH5KQvwpjZh9Y9NpHz-4tSOC0u9p_GjTA"
// });
//var bearer = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjQzZTUyMTUwLWJjODMtNDMwNi05ZWUxLWE0ZWQyZGJmZjU5OSIsImlhdCI6MTU5NTc3MjI0OCwic3ViIjoiZGV2ZWxvcGVyL2QwNDhlNjI1LTE0MjUtYzU2Yy01NTViLWY1MTIyMmZiNDAyZiIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjYwLjI0MS4yMjkuMjM2Il0sInR5cGUiOiJjbGllbnQifV19.NCgihYBBP8e55BpViHcqR5U4ng2OJKTiZVyiPpOY0t_xVQxI-8PI1MH5KQvwpjZh9Y9NpHz-4tSOC0u9p_GjTA";

class Profile extends Component {

    state = {
        profile: null,
        playerTag: "LVPQ2R8R2"
    }


    // componentDidMount() {
    //     this.getData();

    // }

    // getData() {

    //     // async function data() {
    //     //     // try {
    //     //     //     client
    //     //     //     .token('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjQzZTUyMTUwLWJjODMtNDMwNi05ZWUxLWE0ZWQyZGJmZjU5OSIsImlhdCI6MTU5NTc3MjI0OCwic3ViIjoiZGV2ZWxvcGVyL2QwNDhlNjI1LTE0MjUtYzU2Yy01NTViLWY1MTIyMmZiNDAyZiIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjYwLjI0MS4yMjkuMjM2Il0sInR5cGUiOiJjbGllbnQifV19.NCgihYBBP8e55BpViHcqR5U4ng2OJKTiZVyiPpOY0t_xVQxI-8PI1MH5KQvwpjZh9Y9NpHz-4tSOC0u9p_GjTA')

    //     //     //     .clanByTag('#92UY2UCR')
    //     //     //     .then(response => console.log(response))
    //     //     //     .catch(err => console.log(err));

    //     //     // } catch (error) {
    //     //     //     console.log(error);
    //     //     // }
    //     //     // var proxyUrl = 'http://localhost:3000/',
    //     //     //     targetUrl = 'https://api.clashofclans.com/v1/clans/%2392UY2UCR'
        
    //     //     // const user = await fetch(proxyUrl + targetUrl, {
    //     //     //     method: "GET",
    //     //     //     headers: {
    //     //     //         Authorization: 'Bearer ' + bearer
    //     //     //     },
    //     //     // });

    //     //     // const clan = await fetch(proxyUrl + targetUrl, {
    //     //     //     method: "GET",
    //     //     //     Authorization: bearer
                
    //     //     // })

    //     //     // const jsonClan = await clan.text();
    //     //     // if (jsonClan.error) {
    //     //     //   throw jsonClan.error;
    //     //     // }
    //     //     // else {
    //     //     //   console.log("user: " + jsonClan + " signed in.. ");
              
    //     //     // }

          

    //     //     // const jsonUser = await user.json()
    //     //     // .then(res => res.text())
    //     //     // .then(text => console.log(text));

    //     //     // if (jsonUser.error) {
    //     //     //     throw jsonUser.error;
    //     //     // }
    //     //     // else {
    //     //     //     //console.log("user: " + jsonUser + " signed in.. ");
    //     //     // }
    //     // }


    //     // try {
    //     //     data();
    //     // } catch (error) {
    //     //     console.log(error);
    //     // }
    // }

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
                                    John Doe
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

export default Profile;

