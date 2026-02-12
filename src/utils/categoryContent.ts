export interface CategoryContent {
    emoji: string;
    title: string;
    openingLine: string;
}

export const categoryContent: Record<string, CategoryContent> = {
    'sorry': {
        emoji: '😔',
        title: "I'm Sorry",
        openingLine: "Some words are harder to say than silence. But you deserve to hear them."
    },
    'love': {
        emoji: '❤️',
        title: "I Love You",
        openingLine: "Three words that live in every heartbeat. Here they are, without hesitation."
    },
    'try-again': {
        emoji: '🔁',
        title: "Can We Try Again?",
        openingLine: "Endings don't always have to be final. Some stories deserve another chapter."
    },
    'ask-out': {
        emoji: '☕',
        title: "Will You Go Out With Me?",
        openingLine: "Courage is a quiet thing, except when it asks a question."
    },
    'miss-you': {
        emoji: '💬',
        title: "I Miss You",
        openingLine: "Distance isn't measured in miles. It's felt in moments you're not here."
    },
    'last-message': {
        emoji: '🕊',
        title: "One Last Message",
        openingLine: "Some things need to be said, even if it's for the last time."
    }
};

export function getCategoryContent(category: string): CategoryContent | null {
    return categoryContent[category] || null;
}
