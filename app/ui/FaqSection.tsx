'use client';

import { GovAccordion, GovAccordionItem } from '@gov-design-system-ce/react';

const FAQ_ITEMS = [
    {
        id: 'faq-1',
        question: 'How to search by ID or name?',
        answer: 'You can use the search bar at the top of the page to search by business name, identification number, or person name. Enter your search term and click the search button or press Enter.',
    },
    {
        id: 'faq-2',
        question: 'Where are financial statements located?',
        answer: 'Financial statements can be found in the Collection of Documents section for each registered entity. Navigate to the entity detail page and look for the Documents tab.',
    },
    {
        id: 'faq-3',
        question: 'How much does an official extract cost?',
        answer: 'The cost of an official extract varies depending on the type of extract and delivery method. Electronic extracts are generally less expensive than paper copies. Please check the current fee schedule for exact pricing.',
    },
    {
        id: 'faq-4',
        question: 'Why is the site down or slow?',
        answer: 'The site may experience slowdowns during peak usage hours or scheduled maintenance periods. If you experience persistent issues, please try again later or contact our technical support.',
    },
    {
        id: 'faq-5',
        question: 'How to get a certified electronic extract?',
        answer: 'To obtain a certified electronic extract, you need to submit a request through the system. The extract will be digitally signed and can be used for official purposes.',
    },
];

export default function FaqSection() {
    return (
        <section className="faq-section" aria-label="Frequently Asked Questions">
            <div className="page-container">
                <h2 className="section-title">Frequently asked questions</h2>

                <div className="faq-content">
                    <GovAccordion size="m">
                        {FAQ_ITEMS.map((item) => (
                            <GovAccordionItem key={item.id}>
                                <span slot="label">{item.question}</span>
                                <p>{item.answer}</p>
                            </GovAccordionItem>
                        ))}
                    </GovAccordion>
                </div>
            </div>
        </section>
    );
}
