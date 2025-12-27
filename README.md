# Morchella - Mushroom E-commerce Store

A modern e-commerce platform for mushroom enthusiasts, built with Vue 3, TypeScript, and Firebase. This project features
an immersive shopping experience with 3D product visualization.

## 🚧 Project Status - **In Development**

**Note:** This is an ongoing project. While core functionality is implemented, several features are still under
development. The current version is hosted live at:

🌐 **Live Demo:** [https://morchella-7a59d.web.app](https://morchella-7a59d.web.app)

## ✨ Features Implemented

### Current Functionality

- ✅ **Vue 3 with TypeScript** - Modern frontend architecture
- ✅ **Firebase Integration** - Authentication & real-time database
- ✅ **Google Authentication** - Secure login via Firebase Auth
- ✅ **3D Product Visualization** - Interactive product models using Three.js
- ✅ **Responsive Navigation** - Custom NavBar component
- ✅ **Product Showcase** - Dynamic product display with model switching
- ✅ **Homepage Sections** - Multi-section layout with smooth scrolling
- ✅ **Pinia State Management** - Centralized store for app state
- ✅ **GSAP Animations** - Smooth transitions and interactive elements
- ✅ **Product Database** - Firestore integration for product storage
- ✅ **User Management** - Firebase Auth for user accounts

### Tech Stack

- **Frontend Framework:** Vue 3 (Composition API)
- **Language:** TypeScript
- **Build Tool:** Vite
- **State Management:** Pinia
- **3D Graphics:** Three.js
- **Animations:** GSAP
- **Database & Auth:** Firebase (Firestore, Authentication)
- **Routing:** Vue Router
- **Styling:** CSS with SCSS-like features
- **Code Quality:** ESLint, Prettier, Vitest

## 📁 Project Structure

```
src/
├── components/
│   ├── NavBar.vue          # Navigation component
│   ├── ProductShowcase.vue # Main product display
│   ├── ModelViewer.vue     # 3D model visualization
│   ├── InfoCards.vue       # Product information cards
│   ├── InfoSection.vue     # Additional info section
│   ├── ProductsSection.vue # Products listing
│   └── Footer.vue          # Footer component
├── stores/
│   └── useHomePageStore.ts # Pinia store for homepage state
└── views/
    └── HomePage.vue        # Main homepage component
```

## 🔧 Setup & Installation

### Prerequisites

- Node.js (v20.19.0 or >=22.12.0)
- npm or yarn

### Installation Steps

1. **Clone the repository**

```bash
git clone <repository-url>
cd morchella
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up Firebase configuration**

- Create a Firebase project at [firebase.google.com](https://firebase.google.com)
- Enable Authentication (Google provider)
- Set up Firestore database
- Create a `.env` file with your Firebase config:

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

4. **Run the development server**

```bash
npm run dev
```

5. **Build for production**

```bash
npm run build
```

## 📋 Development Commands

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Run tests
npm run test
```

## 🚀 Planned Features & To-Do List

### High Priority

- [ ] **Mobile Responsiveness** - Currently not optimized for mobile devices
- [ ] **Individual Product Pages** - Detailed pages for each mushroom product
- [ ] **Shopping Cart System** - Add-to-cart functionality
- [ ] **Checkout & Payment Integration** - Stripe or other payment gateway
- [ ] **About Us Page** - Company information and story

## 🔐 Authentication & Database

### Current Implementation

- **Google Sign-In** via Firebase Authentication
- **Firestore Database** storing:
    - Product catalog with descriptions and 3D model paths
    - User profiles and authentication data
    - (Future) Order history and cart data

### Security Notes

- Firebase security rules are configured for basic protection
- Authentication state is managed through Firebase Auth
- Environment variables are used for sensitive configuration

## 🎨 Design & UX

### Current Design Features

- **Modern Aesthetic** - Clean, nature-inspired design
- **Interactive 3D Models** - Rotatable and zoomable product views
- **Smooth Animations** - GSAP-powered transitions
- **Section-based Layout** - Vertical scrolling with visual indicators
- **Dark/Light Mode** - Color scheme optimized for readability

### Design System

- **Color Palette:** Earth tones with mushroom-inspired colors
- **Typography:** Clean, readable sans-serif fonts
- **Spacing:** Consistent padding and margins throughout
- **Components:** Reusable Vue components with consistent styling

## 🛠️ Technical Architecture

### Key Dependencies

```json
{
  "vue": "^3.5.22",
  "pinia": "^3.0.3",
  "vue-router": "^4.6.3",
  "firebase": "^12.6.0",
  "three": "^0.181.2",
  "gsap": "^3.13.0",
  "typescript": "~5.9.0",
  "vite": "^7.1.11"
}
```

### Performance Considerations

- Code splitting with Vue Router
- Lazy loading for 3D models
- Optimized Firebase queries
- Efficient state management with Pinia

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

*Note: Mobile responsiveness is currently in development*

## 🤝 Contributing

While this is a personal project, suggestions and feedback are welcome. Please note that development pace may vary due
to:

- Full-time work commitments
- Academic responsibilities
- Other project obligations
- Occasional Dota 2 sessions 😉

## 🚨 Known Limitations

1. **Mobile Experience** - Not yet optimized for small screens
2. **Checkout Process** - Payment system not implemented
3. **Product Pages** - Individual product details missing
4. **About Section** - Company information page pending
5. **Performance** - Some optimizations needed for production

## 📄 License

This project is for personal/educational use. All mushroom models and product images are placeholder content.

*"Building something mushroom-tastic, one commit at a time!"* 🍄
