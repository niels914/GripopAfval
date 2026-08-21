/**
 * Next.js genereert deze referentie normaal automatisch in next-env.d.ts,
 * maar dat bestand is gitignored en bestaat pas ná de eerste `next build`/
 * `next dev`. CI draait `tsc --noEmit` vóór de build-stap, dus zonder dit
 * bestand faalt de typecheck op elke statische afbeelding-import.
 */
/// <reference types="next/image-types/global" />
