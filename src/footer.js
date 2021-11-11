/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React from 'react';
import s1 from './img/instagram.png';
import s2 from './img/linkedin.png';
import s3 from './img/google-symbol.png';
import s4 from './img/facebook.png';


const Footer = () => {
    return (

        <div>
            <div className="footer">
                <div>
                    <a>About Us</a><br />
                    --------------------------------------------------------------------------------------------------------------------------------------
                    <p> The honey is made by the wild bees from the nectar of medicinal flowers.<br />
                        This natural & unprocessed honey,
                        far away from civilization, is free of adulteration <br /> & pollution.
                        It brings you all the goodness of organic
                        honey from the wildflowers. </p>
                    <br />
                    ---------------------------------------------------------------------------------------------------------------------------------------
                    <br />
                    <a>Social Links</a>
                    &nbsp;&nbsp; &nbsp;&nbsp;
                    <br /> <br />
                    <a className="b1"><img src={s1} width="35" height="35" /></a>
                    &nbsp;&nbsp; &nbsp;&nbsp;
                    <a className="b1"><img src={s2} width="35" height="35" /></a>
                    &nbsp;&nbsp; &nbsp;&nbsp;
                    <a className="b1"><img src={s3} width="35" height="35" /></a>
                    &nbsp;&nbsp; &nbsp;&nbsp;
                    <a className="b1"><img src={s4} width="35" height="35" /></a>
                </div><br />
                <div>
                    <a>Contact</a><br />
                    ---------------------------------
                    <p>Gandhinagar Gujarat,<br />
                        9624764647,<br />
                        Krushnaraj11@gmail.com,<br />
                        Thank You to Visit Honey World.
                    </p>
                    -----------------------------------------
                </div>
            </div>
        </div>

    );
};

export default Footer;
