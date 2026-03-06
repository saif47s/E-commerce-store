# Project Deployment & Structure Guide

This document maps the project folders to their respective deployment platforms and functions.

## 1. Medusa Backend (Server & Admin)
- **Folder**: `my-Saif-store`
- **Platform**: [Hugging Face Spaces](https://huggingface.co/spaces)
- **Functions**:
    - Product Management (Admin Panel)
    - Database (PostgreSQL)
    - **Cloudinary Integration**: Handles permanent image storage.
    - API for the storefront.

## 2. Next.js Storefront (Website)
- **Folder**: `my-Saif-store-storefront`
- **Platform**: [Vercel](https://vercel.com)
- **Functions**:
    - Customer Website
    - **Branding**: Site title (`| Store`), logo, and UI design.
    - Fetches data from the Hugging Face backend.

---

## Important Summary
- **Vercel** always pulls from the `my-Saif-store-storefront` folder.
- **Hugging Face** always pulls from the `my-Saif-store` folder (and the root files like `Dockerfile` and `package.json`).
- **Syncing**: Always ensure changes are pushed to the `main` branch to trigger builds on both platforms.
