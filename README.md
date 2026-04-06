# Abdul Razak Bilal — Portfolio

Personal portfolio website hosted at [abdulrazakbilal.github.io](https://abdulrazakbilal.github.io)

## 🚀 Deployment (GitHub Pages)

1. **Create repo** named exactly `abdulrazakbilal.github.io` on GitHub
2. **Add your resume PDF** named `Abdul_Razak_Bilal_Resume.pdf` to the root folder
3. **Push all files** to the `main` branch:

```bash
git init
git add .
git commit -m "initial portfolio launch"
git branch -M main
git remote add origin https://github.com/abdulrazakbilal/abdulrazakbilal.github.io.git
git push -u origin main
```

4. Go to **Settings → Pages → Source: Deploy from branch → main → / (root)**
5. Your site goes live at `https://abdulrazakbilal.github.io` within ~2 minutes ✅

## 📁 File Structure

```
abdulrazakbilal.github.io/
├── index.html                      ← Main portfolio page
├── style.css                       ← All styles
├── script.js                       ← Interactions & animations
├── Abdul_Razak_Bilal_Resume.pdf    ← Your resume (add this!)
└── README.md
```

## ✏️ How to Add Your Photo

In `index.html`, find the `.hex-avatar` section and replace the placeholder SVG with:

```html
<img src="your-photo.jpg" alt="Abdul Razak Bilal" style="width:100%;height:100%;object-fit:cover;" />
```

## 🎨 Theme Customization

All colors are in CSS variables at the top of `style.css`:

```css
--accent: #00d4a4;   /* Change this to any color you want */
```

## 📄 Resume

Place your resume PDF as `Abdul_Razak_Bilal_Resume.pdf` in the root directory.
Both "View Resume" and "Download PDF" buttons link to this file.
