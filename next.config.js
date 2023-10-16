/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    typescript: {
        ignoreBuildErrors: true,
     },
    experimental:{
        serverActions: true
    },
    webpack: (config) => {
        config.module.rules.push({
            test: /\.node/,
            use: 'raw-loader',
            
        });
        
       return config;
    },
}

module.exports = nextConfig