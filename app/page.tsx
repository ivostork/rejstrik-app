import Header from './ui/Header';
import SearchSection from './ui/SearchSection';
import InterestingLinks from './ui/InterestingLinks';
import FaqSection from './ui/FaqSection';
import Footer from './ui/Footer';

export default function Home() {
    return (
        <div className="page-wrapper">
            <Header />
            <main>
                <SearchSection />
                <InterestingLinks />
                <FaqSection />
            </main>
            <Footer />
        </div>
    );
}
