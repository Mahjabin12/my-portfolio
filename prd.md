# Portfolio Website — Product Requirements Document (PRD)

---

# 1. Executive Summary

This project is a modern responsive personal portfolio website developed for Mahjabin, a junior web designer and frontend developer based in Chattogram, Bangladesh.

The purpose of the portfolio is to professionally showcase frontend development projects, UI design skills, technical capabilities, and personal branding through an interactive and visually polished user experience.

The website is fully responsive, multi-section, multi-page, and built entirely with HTML5, Tailwind CSS, and vanilla JavaScript without using any frontend framework.

---

# 2. Project Objectives

## Primary Goals

- Build a professional portfolio website
- Showcase featured frontend projects
- Demonstrate UI/UX design capability
- Present technical skills and tools
- Create a responsive experience across all devices
- Maintain modern visual aesthetics and smooth interactions

## Secondary Goals

- Improve personal branding
- Create a recruiter-friendly presentation
- Demonstrate frontend architecture understanding
- Practice component-based static website structure

---

# 3. Target User

## Portfolio Owner

Mahjabin  
Junior Web Designer & Frontend Developer  
Based in Chattogram, Bangladesh

## Intended Audience

- Recruiters
- Clients
- Internship providers
- Frontend development communities
- Academic supervisors

---

# 4. Project Scope

## Included

- Multi-section landing page
- Standalone detail pages
- Dynamic project detail rendering
- Resume/CV page
- Contact form UI
- Mobile responsiveness
- Interactive animations
- Smooth scrolling
- Responsive navigation

## Excluded

- Backend integration
- Database connectivity
- Authentication system
- CMS dashboard
- Real-time messaging

---

# 5. Tech Stack

## Frontend

- HTML5
- Tailwind CSS
- Vanilla JavaScript

## External Libraries

- Font Awesome 6.5.1
- Google Fonts
- html2pdf.js

## Fonts

- Syne
- DM Sans

---

# 6. Architecture

The website follows a modular static architecture.

## Structure

```bash
portfolio/
├── README.md
├── PRD.md
├── index.html
├── favicon.svg
│
├── image/
│
├── main section/
│   ├── navbar.html
│   ├── hero.html
│   ├── about.html
│   ├── project.html
│   ├── contact.html
│   ├── footer.html
│   └── main.js
│
├── pages/
│   ├── about-me.html
│   ├── project-details.html
│   ├── contact-page.html
│   └── resume.html
│
└── my project/