// Use eager: true to import everything synchronously at build time
const modules = import.meta.glob('./src/*/*.js', { eager: true });

const services = {};

for (const path in modules) {
  const name = path.split('/')[2];
  services[name] = modules[path].default;
}

export default services;