//fetching Api data
const API_URL = 'https://learn.microsoft.com/api/learn/catalog/';

export async function fetchLearnCatalog() {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch catalog data');
  }
  return response.json();
}
