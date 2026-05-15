MindWaves AI — Website Bundle
================================

Files in this archive:

  index.html          The site (drop in as-is — uses local image paths)
  hero-landing.jpg    Hero section background (Digital Twin)
  feature-landing.jpg Autonomous Lab band background
  story-landing.jpg   AI Business Development split image
  memory-hero.jpg     Memory Systems band background
  mindwaves-logo.png  Source logo (embedded in index.html as base64 — included
                      here in case you want to host it as a separate asset)

DEPLOYMENT
==========
Upload all six files to the root of your web host. That's it.
The logo wave is already embedded inline in the HTML — you do NOT need to upload
mindwaves-logo.png unless you want to use it elsewhere (favicons, social, email).

If you prefer to host the logo as a separate asset to keep the HTML smaller
(118 KB → ~70 KB), open index.html, find the line:
    --mw-wave-bg:url("data:image/png;base64,...
and replace the entire data: URI with:
    --mw-wave-bg:url("mindwaves-logo.png")

BRAND DETAILS
=============
Colors:   #B44FE0 → #E040A0 gradient, #0A0A0E background, #F0ECE4 warm text
Fonts:    Oswald (display) + Outfit (body) + JetBrains Mono (labels)
          Loaded from Google Fonts CDN — no setup required.

CONTACT INFO IN FOOTER
======================
consulting@mindwaves-consult.com
+49 2161 9499043
Hocksteiner Weg 33, 41189 Mönchengladbach, DE
