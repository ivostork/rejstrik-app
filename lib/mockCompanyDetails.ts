/**
 * Extended company detail types and mock data
 * This file provides detailed information for the Company Detail page
 */

export type ExecutiveMember = {
    name: string;
    birthDate: string;
    address: string;
    dateOfOffice: string;
    membershipDate?: string;
};

export type PartnerInfo = {
    name: string;
    idNumber: string;
    address: string;
    contributionAmount: string;
    paidAmount: string;
    businessSharePercent: string;
};

export type CompanyDetailData = {
    // Core identification
    id: string;
    companyName: string;
    registrationNumber: string;

    // Registration & legal info
    creationDate: string;
    fileId: string;
    registeredAddress: string;
    identificationNumber: string;
    legalStructure: string;

    // Status flags
    hasInsolvency: boolean;
    lastUpdated: string;

    // Business operations (nested list)
    businessOperations: {
        title: string;
        items: string[];
    };

    // Management body
    managementBody: {
        label: string;
        members: ExecutiveMember[];
        totalMembers: number;
        mannerOfActing: string;
    };

    // Supervisory board (optional)
    supervisoryBoard?: {
        members: ExecutiveMember[];
        chairperson?: ExecutiveMember;
        totalMembers: number;
        mannerOfActing: string;
    };

    // Partners / Shareholders
    partners: PartnerInfo[];

    // Capital
    registeredCapital: string;

    // Additional facts
    additionalInformation: string;
};

// Static mock for demonstration
export const MOCK_COMPANY_DETAIL: CompanyDetailData = {
    id: '0',
    companyName: 'ABC Engineering Ltd.',
    registrationNumber: '123 45 678',
    creationDate: '2010-09-01',
    fileId: 'C 12345 registered at the Regional Court in City',
    registeredAddress: 'Main Street 123, Downtown, 123 45 City',
    identificationNumber: '123 45 676',
    legalStructure: 'Limited Liability Company',
    hasInsolvency: false,
    lastUpdated: '2024-04-03T09:17:03Z',

    businessOperations: {
        title: 'Activities not specified in Annexes 1 to 3 of the Trade Licensing Act, including:',
        items: [
            'Publishing, printing, binding, and copying services',
            'Wholesale and retail sale',
            'Software provision, IT consulting, data processing, hosting, and related services',
            'Consulting services, expert studies, and opinion preparation',
            'Technical design preparation, graphic design, and drafting services',
            'Research and development in natural sciences, technical fields, or social sciences',
            'Advertising, marketing, and media representation services',
            'Translation and interpretation services',
            'Extracurricular education and training, course organization, including lectures',
        ],
    },

    managementBody: {
        label: 'Chief Executive Officer',
        members: [
            {
                name: 'ALEX SMITH, born on February 15, 1983',
                birthDate: '1983-02-15',
                address: 'Street Name 456, Neighborhood, 123 45 City',
                dateOfOffice: 'Office start date: February 20, 2015',
            },
        ],
        totalMembers: 1,
        mannerOfActing: 'The CEO represents the company independently.',
    },

    supervisoryBoard: {
        members: [
            {
                name: 'Ms. JANE DOE, born on July 30, 1985',
                birthDate: '1985-07-30',
                address: 'Street Name 789, area, 123 45 City',
                membershipDate: 'Membership start date: February 25, 2020',
                dateOfOffice: '',
            },
            {
                name: 'Mr. JOHN DOE, PhD, born on March 15, 1965',
                birthDate: '1965-03-15',
                address: 'Street Name 321, Suburb, 123 45 City',
                dateOfOffice: 'Office start date: February 10, 2018',
                membershipDate: 'Membership start date: February 25, 2020',
            },
            {
                name: 'ALEX SMITH, born on February 15, 1980',
                birthDate: '1980-02-15',
                address: 'Street Name 446, Neighborhood, 123 45 City',
                dateOfOffice: 'Office start date: February 20, 2024',
            },
        ],
        chairperson: {
            name: 'Mr. JOHN DOE, PhD, born on March 15, 1965',
            birthDate: '1965-03-15',
            address: 'Street Name 321, Suburb, 123 45 City',
            dateOfOffice: 'Office start date: February 10, 2018',
            membershipDate: 'Membership start date: February 25, 2020',
        },
        totalMembers: 3,
        mannerOfActing: 'The CEO represents the company independently.',
    },

    partners: [
        {
            name: 'PARTNER COMPANY',
            idNumber: '123 45 679',
            address: 'Street Name 456, Neighborhood, 123 45 City',
            contributionAmount: '500,000 CZK',
            paidAmount: '100% ownership',
            businessSharePercent: '100% ownership',
        },
    ],

    registeredCapital: '850,000 CZK',

    additionalInformation:
        'The corporation complies with the law as a whole according to Section 777(5) of Act No. 90/2012 Coll., on Business Corporations and Cooperatives.',
};

/**
 * Get company detail by ID
 * In a real app, this would fetch from an API
 */
export function getCompanyDetailById(id: string): CompanyDetailData | null {
    // For demo purposes, return the mock for any valid ID
    // but customize the company name based on the ID
    const index = parseInt(id, 10);
    if (isNaN(index) || index < 0) {
        return null;
    }

    // Import dynamically to avoid circular dependencies
    // In real implementation, this would be an API call
    return {
        ...MOCK_COMPANY_DETAIL,
        id: id,
    };
}

/**
 * Format ISO date to localized display string
 */
export function formatDate(isoDate: string): string {
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

/**
 * Format ISO datetime to localized display string
 */
export function formatDateTime(isoDateTime: string): string {
    const date = new Date(isoDateTime);
    return date.toLocaleString('en-GB', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });
}
