# ResQ SOS Mien Trung — Landing Page & Rescuer Onboarding

<div align="center">
  <br />
    <a href="/" target="_blank">
      <img src="https://res.cloudinary.com/dpqvdxj10/image/upload/v1778384162/52e64225-6db4-4906-9453-32fa3123a42e_iwsqtc.jpg" alt="Project Banner">
    </a>
  <br />

  <div>
    <img src="https://img.shields.io/badge/-Vite-646CFF?style=for-the-badge&logo=Vite&logoColor=white" />
    <img src="https://img.shields.io/badge/-React_19-61DAFB?style=for-the-badge&logo=React&logoColor=black" />
    <img src="https://img.shields.io/badge/-TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS_v4-06B6D4?style=for-the-badge&logo=TailwindCSS&logoColor=white" /><br/>
    <img src="https://img.shields.io/badge/-Three.js-000000?style=for-the-badge&logo=Three.js&logoColor=white" />
    <img src="https://img.shields.io/badge/-Firebase-FFCA28?style=for-the-badge&logo=Firebase&logoColor=black" />
    <img src="https://img.shields.io/badge/-Cloudinary-3448C5?style=for-the-badge&logo=Cloudinary&logoColor=white" />
    <img src="https://img.shields.io/badge/-Zustand-443E38?style=for-the-badge&logoColor=white" />
  </div>

  <h3 align="center">RES-Q | Volunteer Rescuer Information Portal & Onboarding — Central Vietnam</h3>

</div>

## 📋 <a name="table">Table of Contents</a>

1. ✨ [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🤸 [Quick Start](#quick-start)

## <a name="introduction">✨ Introduction</a>

The official public-facing website for the **ResQ SOS** emergency rescue system in Central Vietnam — a community information portal and volunteer rescuer intake platform. Built on Vite + React 19 with interactive 3D experiences powered by Three.js and `@google/model-viewer`. The core of the application is a multi-step **Rescuer Onboarding Flow** covering account creation, email verification, personal profile setup, ability assessment, and certificate upload — ensuring the dispatch system gets the right rescuer with the right skills.

## <a name="tech-stack">⚙️ Tech Stack</a>

- **[Vite](https://vitejs.dev/)** is the core build tool, providing an ultra-fast development environment with HMR and optimized production bundles.

- **[React 19](https://react.dev/)** is the UI library with concurrent rendering used across the entire landing page and onboarding flow.

- **[TypeScript 5](https://www.typescriptlang.org/)** enforces end-to-end static typing across the codebase — from API responses to component props and store state.

- **[Tailwind CSS v4](https://tailwindcss.com/)** handles all styling via utility classes, augmented by the `tw-animate-css` plugin for motion effects.

- **[Three.js / @react-three/fiber / @react-three/drei](https://threejs.org/)** render interactive 3D team member models directly in the browser.

- **[@google/model-viewer](https://modelviewer.dev/)** embeds `.glb` models as web components with AR support and in-browser 3D rotation.

- **[GSAP](https://gsap.com/) & [Framer Motion](https://www.framer.com/motion/)** orchestrate all animations — splash screen sequences, scroll-triggered reveals, and onboarding step transitions.

- **[TanStack Query v5](https://tanstack.com/query)** manages server state — fetching, caching, and invalidating API data with fine-grained control.

- **[Zustand v5](https://zustand-demo.pmnd.rs/)** holds global client state for the multi-step onboarding flow (personal info, skills, prerequisite answers).

- **[Axios](https://axios-http.com/)** is the HTTP client for all REST API calls, wrapped in a custom instance with token refresh and role-based redirect logic.

- **[Firebase SDK](https://firebase.google.com/)** integrates Firebase Authentication and Cloud Messaging (FCM) for user auth and browser push notifications.

- **[Cloudinary](https://cloudinary.com/)** handles upload and storage of images, videos, and rescuer certificate documents.

- **[React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)** manage and validate all forms in the registration flow with schema-driven validation.

- **[Sonner](https://sonner.emilkowal.ski/)** provides a lightweight, modern toast notification system for API feedback.

- **[Microsoft SignalR](https://learn.microsoft.com/aspnet/core/signalr/introduction)** maintains real-time WebSocket connections with the backend for live updates.

## <a name="features">🔋 Features</a>

👉 **Splash Screen & Animated Landing**: A GSAP-powered intro screen displayed once per browser session, followed by a fully animated landing page.

👉 **Interactive 3D Team Section**: Interactive 3D models of team members rendered with Three.js/React Three Fiber and `@google/model-viewer`, including AR support.

👉 **Rescuer Onboarding Flow**: A 3-step registration process — account creation with email verification, personal profile input, ability assessment, and certificate upload.

👉 **Ability Assessment**: Prerequisite health and legal questionnaire combined with detailed skill selection (rescue, medical, transport, etc.) and conflict detection between incompatible skills.

👉 **Certificate Upload**: Upload and store certificates (driver's license, medical credentials, swimming certifications, etc.) via Cloudinary for system review and approval.

👉 **Donation & Campaign Pages**: Donation portal, campaign tracking, disbursement history, and community contribution feed.

👉 **News & Newsroom**: News and bulletin pages with content from the Central Vietnam rescue coordination system.

👉 **Firebase Auth**: Full authentication flow via Firebase — registration, login, forgot password, and email verification.

👉 **Push Notifications**: Firebase Cloud Messaging delivers browser push notifications for critical updates.

👉 **Search Overlay**: Site-wide instant search powered by a pre-indexed static data set.

👉 **Responsive Design**: Fully optimized for desktop and mobile using Tailwind CSS v4.

## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed:

- **Node.js 18+** (20+ recommended)
- **npm** (bundled with Node.js)
- A modern browser with **WebGL support** (required for 3D rendering)

**Clone the Repository**

```bash
git clone https://github.com/ReQ-SOS-Mien-Trung/resq-sos-mientrung-landingpage
cd resq-sos-mientrung-landingpage
```

**Install Dependencies**

```bash
npm install
```

**Configure Environment Variables**

Create a `.env` file at the project root and set the following:

```env
VITE_API_BASE_URL=http://localhost:8080        # Backend API base URL

# Firebase (Authentication & Cloud Messaging)
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_VAPID_KEY=

# Cloudinary (File & Image Upload)
VITE_CLOUDINARY_CLOUD_NAME=
VITE_CLOUDINARY_UPLOAD_PRESET=
```

**Run the Development Server**

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

**Build for Production**

```bash
npm run build
npm run preview
```

**Compress 3D Models** _(optional — reduces `.glb` bundle size)_

```bash
npm run compress:models
```

---

_A Software Engineering capstone project submission._
