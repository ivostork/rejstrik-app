import Link from 'next/link';
import Header from '../../ui/Header';
import Footer from '../../ui/Footer';

export default function CompanyNotFound() {
    return (
        <div className="page-wrapper">
            <Header />
            <main className="company-detail-page">
                <section className="not-found-section">
                    <div className="page-container">
                        <div className="not-found-content">
                            <h1 className="not-found-title">Company Not Found</h1>
                            <p className="not-found-description">
                                The company you are looking for does not exist or may have been removed.
                            </p>
                            <Link href="/search/results" className="not-found-link">
                                ← Back to search results
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
