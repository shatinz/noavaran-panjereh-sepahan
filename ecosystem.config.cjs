module.exports = {
  apps: [
    {
      name: 'noavaran',
      cwd: '/var/www/noavaran',
      script: './node_modules/next/dist/bin/next',
      args: 'start -p 3000',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      restart_delay: 2000,
      min_uptime: '5s',
      max_restarts: 15,
      kill_timeout: 4000,
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
  ],
};
