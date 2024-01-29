# Next Auth Example

Make sure postgres is installed [Homebrew Formula](https://formulae.brew.sh/formula/postgresql@14)
More info at: [Postgres](https://wiki.postgresql.org/wiki/Homebrew)

1. clone this repo `git clone https://github.com/freshsqueezed/next-auth.git`
2. run `cp .env.example .env`
3. update `DATABASE_URL` in `.env`

```shell
createdb next_auth
npx prisma generate
npx prisma db push
npm run dev
```

Project should be ready to start and running at [http://localhost:3000](http://localhost:3000)
