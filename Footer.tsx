import React from 'react';
import { useSettings } from '../context/SettingsContext';
import NewspaperIcon from '../icons/NewspaperIcon';

const Footer = () => {
    const { settings } = useSettings();
    const logoUrl = settings.logoUrl || NewspaperIcon;

    return (
        <footer>
            <img src={logoUrl} alt="Logo" />
            {/* Other footer elements */}
        </footer>
    );
};

export default Footer;