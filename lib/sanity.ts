import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: "euzigiws", // Get this from sanity.io/manage
  dataset: "production",
  apiVersion: "2024-02-12",
  useCdn: false, // Set to false so updates show globally instantly
  token: "sknxUtHDgoj4lGUNBurDJ11kCEhzMM7rvD8Xqvl4hUBQcNaaCxGGrkQfb5LZkOOrxgRoL4zyM3pGrDN75VCApHn8BJcl9afHogNJA3awS60CU8A2ulUr7rZgS4pXwGeVtr0qbPns1bON9qRILEGIndO3W7YAH1XZJgjj61yrUyivqYJCkPuW", // Get from API settings in Sanity
});