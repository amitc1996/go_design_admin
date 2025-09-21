/**
 * This file now serves as the main entry point for the /projects route.
 * The actual listing implementation has been moved to `project_listing.js`
 * to better separate concerns, following the creation of dedicated pages
 * for create, edit, and view actions.
 */
import ProjectListing from "./project_listing";

// The default export for this route is now the ProjectListing component.
export default ProjectListing;
