Project Rocket is a starter/boilerplate template with **all engines ready** to quickly build and publish a web application, membership site, course or any other type of online business. Powered by [Outseta](https://www.outseta.com?via=b2b01c), [Chakra UI](https://www.chakra-ui.com/) and [NextJS](https://nextjs.org/).

If you like the template, make [use of my Outseta affiliate link](http://www.outseta.com/?via=b2b01c) when setting upa new project, or [use of my Outseta affiliate link](#) to support the development.

## Philosophy

- **Minimal tooling**: Instead of implementing 10 different libraries, this template leverages [Outsetas powerful suite of features](https://www.outseta.com/developer-workflows?via=b2b01c) to cover all key functionality
- **Ready to go**: Built-in components and pages that give you a headstart and reduce setup time
- **Quick to configure**: Site config (`config/site.ts`) to configure the app in one place with minimal effort
- **Easy to theme**: Play around with different colors and fonts to adjust the branding and style of the app  

## What's included in this template?


- Theme customization
- Authentication
- Payments and subscriptions
- Billing portal
- Account management
- Transactional emails
- Activity notifications
- User engagement tracking
- Customer support

And much more!

## Getting started

### 1. Set up Outseta
   
Sign up for a new account at Outseta and go through the setup process.

### 2. Set up codebase

Run the following command on your local environment:

```bash
git clone --depth=1 https://github.com/wirtzdan/project-rocket.git my-project-name
cd my-project-name
pnpm install
```

### 3. Configure app in site config

Open the codebase and navigate to `config/site.ts`. 

1. Rename the ap by changing the `siteName`, `siteDescription`, and `siteUrl`
2. Adjust the `theme` settings to customize the visual aspects of your application.
3. Configure Outseta settings by updating the `outseta` object with your site ID, and other relevant details.
4. Save the changes to apply the new configuration.

## 4. Start the development server

Run the following command on your local environment:

```bash
pnpm dev
```

Visit `http://localhost:3000` to see and test the app.

## Project Structure Overview 

```
├── app/ # Next.js app directory
│ ├── (utility)/ # Utility pages (e.g Thank you page)
│ ├── (website)/ # Website and marketing pages
│ ├── (app)/ # App pages and functionality
│ ├── layout.tsx # Root layout for all pages (Marketing & App)
├── components/ # React components
│ ├── auth/ # Auth components (e.g Embeds, locking content)
│ ├── layout/ # Essential layout components (e.g Navbar, Footer, Section Wrapper)
│ ├── provider/ # Context providers (e.g Outseta, Chakra )
│ └── ui/ # UI components
├── config/ # Configuration files
└── public/ # Static assets (e.g Logo)
├── styles/ # Custom CSS (e.g Outseta embeds)
├── theme/ # Chakra UI theme
├── utils/ # Utility code snippets
```

