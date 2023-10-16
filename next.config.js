/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    typescript: {
        ignoreBuildErrors: true,
     },
    experimental:{
        serverActions: true
    },
    webpack: (config, {nextRuntime}) => {
        if(typeof nextRuntime === "undefined"){
            const { IgnorePlugin } = require('webpack')
            const ignoreFs = new IgnorePlugin({resourceRegExp: /fs/})
            config.plugins.push(ignoreFs);
        }
        config.module.rules.push({
            test: /\.node/,
            use: 'raw-loader',
            
        });
        
       return config;
    },
}

module.exports = nextConfig