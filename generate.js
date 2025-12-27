const { execSync } = require('child_process');
const name = process.argv[2]; // 获取命令行参数

if (!name) {
  console.error('请提供模块名称，例如: node generate.js user');
  process.exit(1);
}

try {
  execSync(`npx @nestjs/cli@latest g module ${name}`, { stdio: 'inherit' });
  execSync(`npx @nestjs/cli@latest g controller ${name}`, { stdio: 'inherit' });
  execSync(`npx @nestjs/cli@latest g service ${name}`, { stdio: 'inherit' });
} catch (error) {
  console.error('生成失败:', error.message);
}
