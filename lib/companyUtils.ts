import { MOCK_COMPANIES } from './mockCompanies';

/**
 * Get a company by its ID (index in the mock array)
 */
export function getCompanyById(id: string): { id: string; name: string } | null {
    const index = parseInt(id, 10);
    if (isNaN(index) || index < 0 || index >= MOCK_COMPANIES.length) {
        return null;
    }
    return { id: String(index), name: MOCK_COMPANIES[index] };
}

/**
 * Get all company IDs for static generation
 */
export function getAllCompanyIds(): string[] {
    return MOCK_COMPANIES.map((_, idx) => String(idx));
}

/**
 * Generate a URL-safe slug from company name
 */
export function generateSlug(name: string): string {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}

/**
 * Find company index by name (case-insensitive)
 */
export function findCompanyIndexByName(name: string): number {
    return MOCK_COMPANIES.findIndex(
        (company) => company.toLowerCase() === name.toLowerCase()
    );
}

/**
 * Get company ID (index) by name - returns the index as a number for use in links
 */
export function getCompanyIdByName(name: string): number {
    const index = MOCK_COMPANIES.findIndex(
        (company) => company.toLowerCase() === name.toLowerCase()
    );
    return index >= 0 ? index : 0;
}
