import Header from '../../ui/Header';
import Footer from '../../ui/Footer';

export default function CompanyDetailLoading() {
    return (
        <div className="page-wrapper">
            <Header />
            <main className="company-detail-page">
                <section className="company-detail-nav">
                    <div className="page-container">
                        <div className="skeleton skeleton-breadcrumbs" />
                    </div>
                </section>

                <section className="company-detail-header-section">
                    <div className="page-container">
                        <div className="skeleton skeleton-title" />
                        <div className="skeleton skeleton-tags" />
                    </div>
                </section>

                <section className="company-detail-tabs-section">
                    <div className="page-container">
                        <div className="skeleton skeleton-tabs" />
                    </div>
                </section>

                <section className="company-detail-content">
                    <div className="page-container">
                        <div className="skeleton skeleton-table" />
                        <div className="skeleton skeleton-table" />
                        <div className="skeleton skeleton-table" />
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
