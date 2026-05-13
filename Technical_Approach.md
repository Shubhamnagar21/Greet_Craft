# Technical Approach

## Problem-Solving Approach: Image Overlay Logic

The app uses the HTML5 Canvas API to composite greeting cards. Each template stores an `overlayConfig` object with relative coordinates (0.0 to 1.0), making overlays responsive across any resolution.

**Canvas compositing steps:**
1. Load the background template image onto canvas
2. Draw a semi-transparent gradient at the bottom for text readability
3. Draw a white circular ring at the profile position
4. Clip a circular region and draw the user's profile image inside
5. Render the username with text shadow for contrast
6. Export the merged image as PNG via `canvas.toDataURL()`

**Why relative coordinates?** Using `x: 0.5, y: 0.75` instead of pixel values means the overlay scales perfectly whether the canvas is 400px or 1200px wide. The `size` field represents the profile image diameter as a fraction of canvas width.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js (Vite), Tailwind CSS v4 |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose ODM |
| Authentication | JWT (jsonwebtoken), bcryptjs |
| File Upload | Multer (local disk storage) |
| Image Rendering | HTML5 Canvas API |
| HTTP Client | Axios with interceptors |
| Validation | express-validator |

## Challenges and Solutions

| Challenge | Solution |
|-----------|----------|
| Cross-origin canvas tainting when loading external images | Set `crossOrigin="anonymous"` on all Image objects and use CORS-enabled image sources (Unsplash) |
| Canvas export quality loss | Used `toDataURL('image/png', 1.0)` for lossless PNG export |
| Overlay positioning breaking on different image sizes | Used relative coordinates (0 to 1) instead of absolute pixel values |
| Profile image needing circular crop | Used Canvas `arc()` + `clip()` to create a circular clipping region before drawing |
| Text unreadable on light/varied backgrounds | Added a dark gradient overlay at the bottom and text shadow on the username |
| JWT token expiry causing silent failures | Axios response interceptor catches 401 errors, clears localStorage, and redirects to login |
| Password security | bcrypt with 12 salt rounds; password field excluded from queries by default via `select: false` |

## Future Improvements

- Migrate image storage from local disk to a CDN (Cloudinary/S3)
- Integrate real Google OAuth 2.0 with Passport.js
- Add real payment gateway (Razorpay/Stripe) for premium subscriptions
- Support custom text editing (messages, fonts, colors)
- Template creation/admin panel
- Add animated greeting cards (GIF export)
- Redis caching for template listings
- Multi-language support
