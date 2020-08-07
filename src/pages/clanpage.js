import React, { useState, useEffect } from 'react';
import '../sass/pages/clanpage.scss';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import MemberList from '../components/memberList';
import { withRouter } from "react-router";

const ClanPage = ({ history }) => {

    const [clanObject, setClanObject] = useState({});
    const [load, setLoad] = useState(true);
    const [memberList, setMemberList] = useState();

    useEffect(() => {

        async function setClan() {

            const clan = await fetch('https://australia-southeast1-burnthevillage.cloudfunctions.net/clanByTag/', {
                method: "GET",
                headers: {
                    clanTag: localStorage.getItem('clanTag'),
                }
            })
            const clanResponse = await clan.json();

            localStorage.removeItem('clan');
            localStorage.setItem('clan', clanResponse);
            setClanObject(clanResponse);
            console.log(clanResponse);

            let temp = [];
            clanResponse.memberList.forEach(element => {
                temp.push(element);
            });

            setMemberList(temp);

            const war = await fetch('https://australia-southeast1-burnthevillage.cloudfunctions.net/currentWar/', {
                method: "GET",
                headers: {
                    clanTag: localStorage.getItem('clanTag'),
                }
            })
            const warResponse = await war.json();

            localStorage.setItem('currentWar', warResponse);
            console.log(warResponse);
            setLoad(false);
        }

        try {
            setClan();
        } catch (error) {
            console.log(error);
        }

    }, []);


    return (
        <div>
            <Header />

            <div className="clan_container">
                <div className="clan_container__profile_row">

                    <div className="clan_container__clan_row__clan_box">

                        <div className="clan_container__clan_row__clan_picture">

                        </div>

                        <div className="clan_container__clan_row__clan_fields">

                            <p className="clan_container__clan_row__clan_fields__name">
                                {load ? 'loading.. ' : clanObject.name }
                            </p>
                            <div>
                                {load ? <p>loading.. </p> : <MemberList list={memberList} />}
                            </div>
                            <div>
                                {/* <WarList list={localStorage.getItem('warList')} handleWarClick={() => handleWarClick()}/> */}
                            </div>

                        </div>

                    </div>

                    <div className="clan_container__clan_row__edit_clan">
                        <p>edit clan</p>
                    </div>

                </div>

                <div className="clan_container__bio_row">
                    <h3>Description:</h3>
                    {load ? <p>loading.. </p> : <p>{clanObject.description}</p>}
                </div>

            </div>

            <Footer />
        </div>
    )
}

export default withRouter(ClanPage);

