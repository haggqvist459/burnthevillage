import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { p1, p2, p3, p4, p5, p6, p7, p8 } from '../../assets/images/pekka';
import { h1, h2, h3, h4, h5, h6, h7, h8 } from '../../assets/images/hogrider';
import { CardMedia, Grid } from '@material-ui/core';

function Pekka(props) {
    const pekkas = [p1, p2, p3, p4, p5, p6, p7, p8];
    const hogs = [h1, h2, h3, h4, h5, h6, h7, h8];

    return (

        <Grid item xs={6} sm={6} m={6} l={6} xl={6} container direction={"row"}>

            <CardMedia
                component="img"
                alt={"P.E.K.K.A"}
                image={pekkas[props.value]}
            />
            <CardMedia
                component="img"
                alt={"hogrider"}
                image={hogs[props.value]}
            />
        </Grid>
    );
}

Pekka.propTypes = { value: PropTypes.number.isRequired };

export function PekkaLoader() {
    // const [progress, setProgress] = useState(10);
    // const [pekka, setPekka] = useState(1);
    // const pekkas = [p1, p2, p3, p4, p5, p6, p7, p8];

    const [counter, setCounter] = useState(0);
    const pekka = useRef(null);
    pekka.current = { counter, setCounter };

    useEffect(
        () => {
            const id = setInterval(() => {
                pekka.current.setCounter(pekka.current.counter + 1);

                if (pekka.current.counter === 7) {
                    pekka.current.setCounter(0);
                }
            }, 300);
            return () => {
                clearInterval(id);
            };
        },
        [], // empty dependency array
    );

    return <Pekka value={pekka.current.counter} />;
}
