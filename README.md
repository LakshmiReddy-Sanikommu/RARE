# RARE Art Gallery 🖼️✨

RARE is a premium, full-stack ecommerce platform for curated art collections. It features a stunning glassmorphic UI, dynamic theme switching (Dark/Light), and a seamless shopping experience.

## ✨ Features

- **Premium UI/UX**: Modern glassmorphic design with subtle animations and "Nordic Cool" color palette.
- **Dynamic Theming**: Instant toggle between Dark and Light modes with persisted preferences.
- **Interactive Shop**: Search artwork, view details, and manage your cart with real-time quantity controls.
- **Secure Auth**: User login and registration integrated with a MongoDB backend.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop viewing.

## 🚀 Tech Stack

- **Frontend**: React (Vite), Context API, CSS Variables, Bootstrap (for layout).
- **Backend**: Node.js, Express.
- **Database**: MongoDB (Mongoose).
- **Icons/Fonts**: FontAwesome, Google Fonts (Outfit).

## 🛠️ Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB Atlas account (or local MongoDB)

### Installation

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd RARE
   ```

2. **Backend Setup**:
   Install dependencies and create a `.env` file in the root.
   ```bash
   npm install
   ```
   Example `.env`:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   PORT=3000
   ```

3. **Frontend Setup**:
   ```bash
   cd frontend
   npm install
   ```

### Running the App

1. **Start the Backend**:
   From the root directory:
   ```bash
   npm start
   ```

2. **Start the Frontend**:
   From the `frontend` directory:
   ```bash
   npm run dev
   ```

## 🎨 Design Philosophy

RARE follows a **Minimal yet Rich** design language.
- **Colors**: Slate 900/50 backgrounds with Indigo-Purple gradients.
- **Depth**: Extensive use of backdrop-filters (glassmorphism) and layered shadows.
- **Micro-interactions**: Subtle hover state elevations and smooth transitions between themes.

---
Built with ❤️ by the RARE Team.
