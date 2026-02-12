# Say It Without Saying It 💭

> **Some things are hard to say directly.**

A psychologically powerful relationship communication tool designed for Valentine's Day. Helps people express difficult emotions (apologies, love, reconciliation, asking out, missing someone, closure) through beautifully crafted, shareable message pages.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Visit `http://localhost:5173`

## 🧠 The Concept

On Valentine's Day, not everyone is happy. Many are:
- Fighting or ignored
- Waiting for an apology
- Wanting to ask someone out
- Thinking about an ex
- Too proud to say sorry

**Ego blocks direct communication.** This tool reduces ego friction by providing structured emotional pages that feel authentic, not templated.

## ✨ Features

### 6 Emotional Categories
- 😔 **I'm Sorry** - For ego battles and apologies
- ❤️ **I Love You** - Express love without hesitation
- 🔁 **Can We Try Again?** - Reconciliation and second chances
- ☕ **Will You Go Out With Me?** - Asking someone out
- 💬 **I Miss You** - Long distance and silent fights
- 🕊 **One Last Message** - Closure and final words

### Payment Model
- **₹49 one-time payment** via Razorpay
- **Unlimited link generation** after payment (tracked via localStorage)
- Perfect for the 2-day Valentine's period

### Design Philosophy
- **No Valentine's clichés** (no red/black, no emoji explosions)
- **Poetic, authentic tone** - "Some words live in silence until courage finds them"
- **Staged GSAP animations** for emotional impact
- **Fully responsive** across all devices

## 🛠️ Tech Stack

- **React** + **TypeScript** + **Vite**
- **GSAP** for animations
- **React Router** for navigation
- **Razorpay** for payments
- **Crimson Pro** (Google Fonts) for typography

## 📁 Project Structure

```
src/
├── pages/
│   ├── LandingPage.tsx        # Category selection
│   ├── CreateMessagePage.tsx  # Form + payment
│   └── MessageRevealPage.tsx  # Emotional reveal
├── utils/
│   ├── encoding.ts            # Base64 URL encoding
│   ├── categoryContent.ts     # Poetic opening lines
│   └── payment.ts             # Razorpay integration
└── index.css                  # Global styles
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file:

```env
# Test mode (for development)
VITE_RAZORPAY_KEY_ID=rzp_test_YOUR_KEY_HERE

# Production mode (before launch)
# VITE_RAZORPAY_KEY_ID=rzp_live_YOUR_KEY_HERE

VITE_PAYMENT_AMOUNT=4900  # ₹49 in paise
```

### Before Launch Checklist

> **IMPORTANT**: Complete these before Valentine's Day!

1. ✅ Replace test Razorpay key with production key in `.env`
2. ✅ Run `npm run build` to create production bundle
3. ✅ Test payment flow with real Razorpay account
4. ✅ Test on real devices (iOS, Android)
5. ✅ Deploy `dist/` folder to hosting service

## 🧪 Testing

### Test Payment (Development)

Use Razorpay test cards:
- Card: `4111 1111 1111 1111`
- Any CVV and future expiry date

### Manual Testing Flow

1. Open `http://localhost:5173`
2. Click any category (e.g., "I'm Sorry")
3. Fill form: Your Name, Their Name, Message
4. Click "Pay ₹49 & Generate Link"
5. Complete test payment
6. Copy generated link
7. Open link in new tab to see reveal animation
8. Return and create another link (should skip payment)

## 🎨 Design Highlights

- **Color Palette**: Soft off-white (#FAF9F6), dark gray (#2A2A2A)
- **Typography**: Crimson Pro serif for trustworthiness
- **Animations**: Staged GSAP reveals with pauses between elements
- **Responsive**: Fluid typography using CSS `clamp()`

## 💡 Why This Can Spread

**Psychological Triggers**:
- Targets ego, regret, and vulnerability (stronger than romance)
- Feels like "a safe emotional bridge"
- Appeals to multiple emotional states, not just happy couples

**Shareability**:
- Non-cringe, poetic aesthetic
- Feels thoughtful, not templated
- Subtle "Write yours →" CTA on every message page

## 📊 Success Metrics to Track

- Links generated per day
- Payment conversion rate
- Most popular category
- Share rate (links opened / created)
- Mobile vs. desktop usage

## 🚀 Deployment

```bash
# Build production bundle
npm run build

# Preview production build locally
npm run preview

# Deploy dist/ folder to your hosting service
# (Vercel, Netlify, AWS S3, etc.)
```

## 📝 License

Built for Valentine's Day 2026. Use with care and kindness.

---

**Built with psychological depth. Ready to reduce ego friction.** ❤️
