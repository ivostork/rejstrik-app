type InterestingLinksTileProps = {
    icon: string;
    title: string;
    description: string;
    href?: string;
    onClick?: () => void;
};

export default function InterestingLinksTile({
    icon,
    title,
    description,
    href = '#',
    onClick,
}: InterestingLinksTileProps) {
    return (
        <a
            href={href}
            className="tile"
            onClick={onClick}
            aria-label={title}
        >
            <img
                src={icon}
                alt=""
                className="tile-icon"
                aria-hidden="true"
            />

            <div className="tile-content">
                <div className="tile-header">
                    <span className="tile-title">{title}</span>
                    <img
                        src="/icons/components/chevron-right.svg"
                        alt=""
                        className="tile-chevron"
                        aria-hidden="true"
                    />
                </div>

                <p className="tile-description">{description}</p>
            </div>
        </a>
    );
}
