import { ConvexReactClient } from "convex/react";

// For now, we'll use a mock client since we're not running Convex server
// In production, you would set VITE_CONVEX_URL in your .env file
const convexUrl = import.meta.env.VITE_CONVEX_URL;

export const convex = convexUrl 
  ? new ConvexReactClient(convexUrl)
  : null;
