/**
 * Simple Base64 encoding/decoding for local storage data.
 * This provides basic obfuscation to avoid storing plain-text sensitive data.
 */

export const encodeData = <T>(data: T): string | null => {
  if (data === null || data === undefined) return null;
  try {
    const jsonString = JSON.stringify(data);
    // Handle Unicode characters properly
    const bytes = new TextEncoder().encode(jsonString);
    const binString = String.fromCodePoint(...bytes);
    return btoa(binString);
  } catch (e) {
    console.error("Encoding error:", e);
    return null;
  }
};

export const decodeData = <T>(encodedData: string): T | null => {
  if (!encodedData) return null;
  try {
    // Try decoding as Base64
    const binString = atob(encodedData);
    const bytes = Array.from(binString, (m) => m.codePointAt(0) || 0);
    const uint8Bytes = new Uint8Array(bytes);
    const jsonString = new TextDecoder().decode(uint8Bytes);
    return JSON.parse(jsonString);
  } catch (e) {
    // Fallback: try parsing as plain JSON (for backward compatibility with existing stored data)
    try {
      return JSON.parse(encodedData);
    } catch (fallbackError) {
      return null;
    }
  }
};
