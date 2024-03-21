export const conf = {
  aapwriteURL: String(import.meta.env.VITE_AAPWRITE_URL),
  aapwriteProjectId: String(import.meta.env.VITE_AAPWRITE_PROJECT_ID),
  aapwriteDatabaseId: String(import.meta.env.VITE_AAPWRITE_DATABASE_ID),
  aapwriteArticleCollectionId: String(
    import.meta.env.VITE_AAPWRITE_COLLECTION_ID_ARTICLE
  ),
  aapwriteProfileCollectionId: String(
    import.meta.env.VITE_AAPWRITE_COLLECTION_ID_PROFILE
  ),
  aapwriteImageStorageId: String(
    import.meta.env.VITE_AAPWRITE_STORAGE_ID_IMAGE
  ),

  tinymce_api: String(import.meta.env.VITE_TINYMCE_API),
};
