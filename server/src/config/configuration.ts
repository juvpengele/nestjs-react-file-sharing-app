const { env } = process;

export default () => ({
  database: {
    uri: env.DATABASE_URI || '',
  },
  mail: {
    transport: env.MAIL_MAILER,
    host: env.MAIL_HOST || 'localhost',
    port: parseInt(env.MAIL_PORT) || 1025,
    auth: {
      user: env.MAIL_USERNAME || '',
      password: env.MAIL_PASSWORD || '',
    },
    secure: env.MAIL_ENCRYPTION === 'ssl',
    from: env.MAIL_FROM_ADDRESS || '',
  },
});
