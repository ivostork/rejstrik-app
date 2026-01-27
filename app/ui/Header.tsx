'use client';

import { GovButton, GovFormSwitch } from '@gov-design-system-ce/react';
import Image from 'next/image';

type HeaderProps = {
    onThemeToggle?: () => void;
    isDarkMode?: boolean;
};

export default function Header({ onThemeToggle, isDarkMode = false }: HeaderProps) {
    return (
        <header className="header">
            <div className="page-container">
                <div className="header-content">
                    <a href="/" className="header-logo" aria-label="Public register - Home">
                        <Image
                            src="/Logo/lev/lev.svg"
                            alt=""
                            width={32}
                            height={32}
                            className="header-logo-image"
                            aria-hidden="true"
                        />
                        <span className="header-logo-title">Public register</span>
                    </a>

                    <div className="header-actions">
                        <GovButton
                            type="base"
                            size="s"
                            aria-label="Change language"
                            iconEnd={
                                <Image
                                    src="/icons/components/chevron-down.svg"
                                    alt=""
                                    width={16}
                                    height={16}
                                />
                            }
                        >
                            EN
                        </GovButton>

                        <GovFormSwitch
                            size="m"
                            checked={isDarkMode}
                            onChange={onThemeToggle}
                            aria-label="Toggle dark mode"
                        >
                            <Image
                                src="/icons/components/sun.svg"
                                alt=""
                                width={12}
                                height={12}
                                aria-hidden="true"
                            />
                        </GovFormSwitch>
                    </div>
                </div>
            </div>
        </header>
    );
}
