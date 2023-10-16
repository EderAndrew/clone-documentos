/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    typescript: {
        ignoreBuildErrors: true,
     },
    experimental:{
        serverActions: true
    },
    webpack: (config, {isServer}) => {
        if (!isServer) {
            // set 'fs' to an empty module on the client to prevent this error on build --> Error: Can't resolve 'fs'
            config.node = {
              fs: "empty",
            };
          }
        config.module.rules.push({
            test: /\.node/,
            use: 'raw-loader',
            
        });
        
       return config;
    },
}

module.exports = nextConfig