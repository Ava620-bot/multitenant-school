# Multi-Tenant School Profile Application

A Next.js application that displays different school information based on the subdomain accessed. This project demonstrates how to implement multi-tenancy using subdomain-based routing with Next.js App Router, Firebase/Firestore, and NextAuth.js.

## Features

- **Subdomain-based routing** (e.g., school1.localhost:3000, school2.localhost:3000)
- **School profile pages** showing basic information (name, description, contact details)
- **Admin dashboard** to edit school information (protected by authentication)
- **NextAuth.js authentication** with middleware protection
- **Firestore database** with multi-tenant data isolation

## Technologies Used

- Next.js 14 (App Router)
- Firebase/Firestore
- NextAuth.js
- TypeScript
- Tailwind CSS
- shadcn/ui components

## Prerequisites

- Node.js 18+ and npm
- Firebase account with Firestore database
- Basic knowledge of Next.js and React

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/Ava620-bot/multitenant-school.git
cd multitenant-school