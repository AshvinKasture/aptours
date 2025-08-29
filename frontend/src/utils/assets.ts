/**
 * Utility function to get the correct asset path considering Vite's base configuration
 */
export const getAssetPath = (path: string): string => {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // In development and production, Vite handles the base path automatically
  // when using import.meta.env.BASE_URL
  return `${import.meta.env.BASE_URL}${cleanPath}`;
};

/**
 * Get image path specifically for trek images in the assets folder
 */
export const getTrekImagePath = (imageName: string, folder: string = ''): string => {
  const folderPath = folder ? `${folder}/` : '';
  return getAssetPath(`assets/${folderPath}${imageName}`);
};
