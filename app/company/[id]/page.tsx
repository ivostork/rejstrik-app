import { notFound } from 'next/navigation';
import Header from '../../ui/Header';
import Footer from '../../ui/Footer';
import DetailBreadcrumbs from '../../ui/DetailBreadcrumbs';
import CompanyHeader from '../../ui/CompanyDetail/CompanyHeader';
import DetailTabs from '../../ui/CompanyDetail/DetailTabs';
import DownloadSection from '../../ui/CompanyDetail/DownloadSection';
import DetailTable from '../../ui/CompanyDetail/DetailTable';
import { getCompanyById } from '../../../lib/companyUtils';
import { getCompanyDetailById } from '../../../lib/mockCompanyDetails';

type PageProps = {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function CompanyDetailPage({ params, searchParams }: PageProps) {
    const { id } = await params;
    const search = await searchParams;

    // Validate company exists
    const basicCompany = getCompanyById(id);
    if (!basicCompany) {
        notFound();
    }

    // Get detailed company data
    const companyDetail = getCompanyDetailById(id);
    if (!companyDetail) {
        notFound();
    }

    // Update company name from the mock list
    const company = {
        ...companyDetail,
        companyName: basicCompany.name,
    };

    // Build breadcrumb items with state preservation
    const fromParam = typeof search.from === 'string' ? search.from : '';
    const resultsHref = fromParam ? `/search/results${fromParam}` : '/search/results';

    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'Results', href: resultsHref },
        { label: company.companyName },
    ];

    return (
        <div className="page-wrapper">
            <Header />
            <main className="company-detail-page">
                <section className="company-detail-nav">
                    <div className="page-container">
                        <DetailBreadcrumbs items={breadcrumbItems} />
                    </div>
                </section>

                <section className="company-detail-content">
                    <div className="page-container">
                        <div className="company-detail-white-wrapper">
                            {/* Company header with title and meta info */}
                            <CompanyHeader company={company} />
                            {/* Tabs row */}
                            <div className="detail-tabs-row">
                                <DetailTabs />
                            </div>
                            {/* Action bar with download/print buttons - inside card, below tabs */}
                            <div className="detail-action-bar">
                                <DownloadSection />
                            </div>
                            {/* Main data table */}
                            <DetailTable company={company} />
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}

export async function generateMetadata({ params }: PageProps) {
    const { id } = await params;
    const company = getCompanyById(id);

    if (!company) {
        return {
            title: 'Company Not Found',
        };
    }

    return {
        title: `${company.name} - Public Register`,
        description: `Company details for ${company.name}`,
    };
}
