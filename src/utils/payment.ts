const PAYMENT_KEY = 'valentine_tool_paid';

/**
 * Check if user has already paid
 */
export function hasUserPaid(): boolean {
    return localStorage.getItem(PAYMENT_KEY) === 'true';
}

/**
 * Mark user as paid in localStorage
 */
export function markUserAsPaid(): void {
    localStorage.setItem(PAYMENT_KEY, 'true');
}
