'use client';

import { GovButton } from '@gov-design-system-ce/react';
import Image from 'next/image';

const FOOTER_LINKS = {
    registers: {
        title: 'Registers',
        links: [
            { label: 'Registry Courts', href: '#' },
            { label: 'Commercial Register', href: '#' },
            { label: 'Bankruptcy Records', href: '#' },
            { label: 'Trust Funds', href: '#' },
            { label: 'Beneficial Owners', href: '#' },
        ],
    },
    searchOptions: {
        title: 'Search options',
        links: [
            { label: 'Entity Public Register', href: '#' },
            { label: 'Legal Entity Public Register', href: '#' },
            { label: 'Individual Public Register', href: '#' },
        ],
    },
    guides: {
        title: 'Guides',
        links: [
            { label: 'How to?', href: '#' },
            { label: 'Starting a Business', href: '#' },
            { label: 'Using the Electronic Extract', href: '#' },
            { label: 'Partnership Agreement for a Ltd.', href: '#' },
            { label: 'Public Register Submissions', href: '#' },
        ],
    },
    contact: {
        title: 'Contact',
        address: [
            'Adresa 1',
            '686 01 Praha',
        ],
        phone: '+420 789 325 678',
        email: 'loremipsum@email.com',
    },
};

const SOCIAL_LINKS = [
    { icon: '/icons/components/facebook.svg', label: 'Facebook', href: '#' },
    { icon: '/icons/components/instagram.svg', label: 'Instagram', href: '#' },
    { icon: '/icons/components/youtube.svg', label: 'YouTube', href: '#' },
    { icon: '/icons/components/linkedin.svg', label: 'LinkedIn', href: '#' },
    { icon: '/icons/components/twitter-x.svg', label: 'X (Twitter)', href: '#' },
];

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

export default function Footer() {
    return (
        <footer className="footer">
            <div className="page-container">
                {/* Main Footer Content */}
                <div className="footer-main">
                    <div className="footer-columns">
                        {/* Registers Column */}
                        <div className="footer-section">
                            <h3 className="footer-section-title">{FOOTER_LINKS.registers.title}</h3>
                            <div className="footer-links">
                                {FOOTER_LINKS.registers.links.map((link) => (
                                    <a key={link.label} href={link.href} className="footer-link">
                                        {link.label}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Search Options Column */}
                        <div className="footer-section">
                            <h3 className="footer-section-title">{FOOTER_LINKS.searchOptions.title}</h3>
                            <div className="footer-links">
                                {FOOTER_LINKS.searchOptions.links.map((link) => (
                                    <a key={link.label} href={link.href} className="footer-link">
                                        {link.label}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Guides Column */}
                        <div className="footer-section">
                            <h3 className="footer-section-title">{FOOTER_LINKS.guides.title}</h3>
                            <div className="footer-links">
                                {FOOTER_LINKS.guides.links.map((link) => (
                                    <a key={link.label} href={link.href} className="footer-link">
                                        {link.label}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Contact Column */}
                        <div className="footer-section">
                            <h3 className="footer-section-title">{FOOTER_LINKS.contact.title}</h3>
                            <div className="footer-contact">
                                {FOOTER_LINKS.contact.address.map((line, index) => (
                                    <p key={index} className="footer-contact-text">{line}</p>
                                ))}
                                <div className="footer-contact-row">
                                    <Image
                                        src="/icons/components/telephone.svg"
                                        alt=""
                                        width={14}
                                        height={14}
                                        className="footer-contact-icon"
                                    />
                                    <a href={`tel:${FOOTER_LINKS.contact.phone}`} className="footer-link">
                                        {FOOTER_LINKS.contact.phone}
                                    </a>
                                </div>
                                <div className="footer-contact-row">
                                    <Image
                                        src="/icons/components/envelope.svg"
                                        alt=""
                                        width={14}
                                        height={14}
                                        className="footer-contact-icon"
                                    />
                                    <a href={`mailto:${FOOTER_LINKS.contact.email}`} className="footer-link">
                                        {FOOTER_LINKS.contact.email}
                                    </a>
                                </div>
                                {/* Social Links */}
                                <div className="footer-socials">
                                    {SOCIAL_LINKS.map((social) => (
                                        <a
                                            key={social.label}
                                            href={social.href}
                                            className="footer-social-btn"
                                            aria-label={social.label}
                                        >
                                            <Image
                                                src={social.icon}
                                                alt=""
                                                width={14}
                                                height={14}
                                                className="footer-social-icon"
                                            />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Back to Top Button */}
                    <button
                        type="button"
                        className="footer-back-to-top"
                        onClick={scrollToTop}
                        aria-label="Back to top of page"
                    >
                        <Image
                            src="/icons/components/arrow-up.svg"
                            alt=""
                            width={16}
                            height={16}
                        />
                    </button>
                </div>

                {/* Footer Bottom */}
                <div className="footer-bottom">
                    <p className="footer-copyright">
                        2024 © Digital and Information Agency • Information is provided in accordance with Act No. 106/1999 Coll., on Free Access to Information.
                    </p>
                    <div className="footer-meta">
                        <span className="footer-meta-text">Version 2.0.2105.9856</span>
                        <span className="footer-meta-divider" aria-hidden="true"></span>
                        <span className="footer-meta-text">Utilizing Design System 4.0</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
