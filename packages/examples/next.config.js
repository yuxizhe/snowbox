module.exports = {
  outDir: 'dist',
  pageExtensions: ['web.jsx', 'web.js', 'web.tsx', 'web.ts'],
  webpack: (config) => {
    config.resolve.alias['react-native'] = 'react-native-web';
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
