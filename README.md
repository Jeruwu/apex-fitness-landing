# Apex Fitness – Marketing Website ⚡

A high-performance, multi-section landing page built from scratch without heavy JavaScript frameworks, demonstrating advanced DOM manipulation, custom animations, and live API integrations.

## ✨ Technical Highlights

* **Vanilla JS Animation Engine:** Built a custom animated dashboard carousel featuring magnetic button physics, 3D card tilt effects, and scroll-reveal systems using `requestAnimationFrame` for buttery-smooth 60fps rendering.
* **Intersection Observers:** Implemented highly optimized scroll-triggered entrance animations (`js-ready`, `reveal`, `reveal-child`) that adhere to `prefers-reduced-motion` accessibility standards.
* **Live Form Integration:** Integrated EmailJS for live lead capture with custom field validation, animated error states, and a seamless success flow without page reloads.
* **Modern Styling Architecture:** Combined Tailwind CSS (compiled and minified via CLI) with custom CSS variables and advanced bezier curve easings (`cubic-bezier`) for a distinct visual identity.

## 🛠️ Tech Stack

* **Core:** HTML5, CSS3, Vanilla JavaScript (ES6+)
* **Styling:** Tailwind CSS (CLI)
* **Integrations:** EmailJS
* **Deployment:** Netlify

## 💻 Local Development

To run this project locally and recompile styles:

1. Clone the repository:
```bash
   git clone [https://github.com/Jeruwu/apex-fitness-landing.git](https://github.com/Jeruwu/apex-fitness-landing.git)
   ```
2. Navigate to the project directory:
```bash
   cd apex-gym
   ```
3. Install dependencies:
```bash
   npm install
   ```
4. Start the Tailwind watcher:
```bash
   npm run dev
   ```