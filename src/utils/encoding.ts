export interface MessageData {
  category: string;
  senderName: string;
  recipientName: string;
  customMessage?: string;
}

/**
 * Encodes message data into a Base64 URL parameter
 */
export function encodeMessageData(data: MessageData): string {
  const jsonString = JSON.stringify(data);
  const base64 = btoa(jsonString);
  return encodeURIComponent(base64);
}

/**
 * Decodes Base64 URL parameter back to message data
 */
export function decodeMessageData(encodedData: string): MessageData | null {
  try {
    const base64 = decodeURIComponent(encodedData);
    const jsonString = atob(base64);
    return JSON.parse(jsonString) as MessageData;
  } catch (error) {
    console.error('Failed to decode message data:', error);
    return null;
  }
}
