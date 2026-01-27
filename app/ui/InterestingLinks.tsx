import InterestingLinksTile from './InterestingLinksTile';

const INTERESTING_LINKS = [
    {
        id: 'citizen-access',
        icon: '/icons/complex/business-file.svg',
        title: 'Citizen Access Hub',
        description: 'Explore a comprehensive database of public information on various organizations that serve the community.',
        href: '#',
    },
    {
        id: 'job-vacancies',
        icon: '/icons/complex/job.svg',
        title: 'Searching for job vacancies',
        description: 'Job offers in both the Czech Republic and abroad',
        href: '#',
    },
    {
        id: 'election-year',
        icon: '/icons/complex/chamber-deputies.svg',
        title: 'Election year',
        description: 'Current information about elections in the Czech Republic and around the world in one place',
        href: '#',
    },
];

export default function InterestingLinks() {
    return (
        <section className="interesting-links">
            <div className="page-container">
                <h2 className="section-title">Interesting links</h2>

                <div className="tiles-grid">
                    {INTERESTING_LINKS.map((link) => (
                        <InterestingLinksTile
                            key={link.id}
                            icon={link.icon}
                            title={link.title}
                            description={link.description}
                            href={link.href}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
