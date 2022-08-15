module.exports = {
  outDir: 'dist',
  pageExtensions: ['web.jsx', 'web.js', 'web.tsx', 'web.ts'],
  experimental: {
    externalDir: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(png|svg|jpg|jpeg|gif)$/i,
      use: [
        {
          loader: 'url-loader',
          options: {
            esModule: false,
            limit: 1000,
            name: 'static/images/[hash].[ext]',
          },
        },
      ],
    });
    return config;
  },
};
