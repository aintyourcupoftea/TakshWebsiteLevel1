import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer>
            <p>
                © {currentYear} Taksh. All rights reserved. <br></br>
                <span className="made-with-love">
                    Made with ❤️ by&nbsp;
                    <a href="https://khojcommunity.com/about-1" target="_blank" className="taksh">
                        Taksh
                    </a>
                </span>
            </p>
        </footer>
    );
};

export default Footer;