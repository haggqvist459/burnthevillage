import React from 'react';

import {
    profile1, profile2, profile3, profile4, profile5, profile6, profile7, profile8, profile9, profile10, profile11,
    profile12, profile13, profile14, profile15, profile16, profile17, profile18, profile19, profile20, profile21, profile22,
    profile23, profile24, profile25, profile26, profile27, profile28, profile29, profile30, profile31, profile32, profile33,
    profile34, profile35, profile36, profile37, profile38, profile39, profile40, profile41, profile42, profile43, profile44
} from '../../assets/images/profile';


const images = [
    profile1, profile2, profile3, profile4, profile5, profile6, profile7, profile8, profile9, profile10, profile11,
    profile12, profile13, profile14, profile15, profile16, profile17, profile18, profile19, profile20, profile21, profile22,
    profile23, profile24, profile25, profile26, profile27, profile28, profile29, profile30, profile31, profile32, profile33,
    profile34, profile35, profile36, profile37, profile38, profile39, profile40, profile41, profile42, profile43, profile44
];

function GetProfileImage({ number }) { 
    if (!number) {
        const random = Math.floor(Math.random() * 43);
        return ( <img src={images[random]} alt="random img" /> )
    }
    else {
        return ( <img src={images[number]} alt="random img" /> )
    }
}

export default GetProfileImage;




