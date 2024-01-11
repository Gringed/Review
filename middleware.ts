import { authMiddleware } from "@clerk/nextjs";
import { redirectToSignIn } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "./lib/db";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  publicRoutes: ["/"],
  async afterAuth(auth, req) {
    try {
      if (auth.userId) {
        // Sauvegarder les données dans la base de données externe (MongoDB dans cet exemple)
        return await db.user.create({
          data: {
            userId: auth.userId,
            username: auth.user?.username,
          },
          // ... d'autres champs que vous souhaitez sauvegarder
        });
        // Sauvegarder dans la base de données
      }
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des données de Clerk : ",
        error
      );
      // Vous pouvez choisir de gérer l'erreur ici selon vos besoins
    }
    console.log(auth);
    if (auth.userId && auth.isPublicRoute) {
      let path = `/select-org`;

      const orgSelection = new URL(path, req.url);
      return NextResponse.redirect(orgSelection);
    }

    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({
        returnBackUrl: req.url,
      });
    }
    if (auth.user && req.nextUrl.pathname !== "/select-org") {
      const orgselection = new URL("/select-org", req.url);
      return NextResponse.redirect(orgselection);
    }
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
