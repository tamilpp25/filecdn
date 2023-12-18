This is a simple file storage and sharing website developed using [Next.js](https://nextjs.org/).

## Getting Started

First, make sure you create a `.env` file using the format from `.env.example` and create folder `uploads` in the root directory and run:

```bash
npm install
```

For development server:
```bash
npm run dev
```

For Production server:
```bash
npm run build
npm start
```

### Whitelisting Users:
FileCDN uses a whitelisting feature to only allow login from specific users.
1. Make sure you create a secure `PRIVATE_KEY` in `.env` it will be used for the whitelisting process.
2. Use Bearer Token authorization in Postman and use `PRIVATE KEY` as Token.
3. Head over to `/api/whitelist/update` and send a POST request matching the schema to update whitelist.
```json
{
    "addEmails": [],
    "removeEmails": []
}
```
4. You can view a list of whitelisted users by sending a GET request to `/api/whitelist/list`. Keep in mind both these routes are protected by authentication.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech stack Used
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Prisma ORM](https://prisma.io/)
- [NextAuth.js](https://next-auth.js.org/)
- [Prisma ORM](https://prisma.io/)
- [shadcn](https://ui.shadcn.com/)