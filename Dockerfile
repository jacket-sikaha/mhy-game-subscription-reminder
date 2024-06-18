# Stage 1: 使用官方 Node.js 作为构建环境
FROM node:alpine as builder
WORKDIR /usr/src/app

# 安装 pnpm
RUN npm install -g pnpm

# 复制 package.json 和 pnpm-lock.yaml 文件到工作目录
COPY package.json pnpm-lock.yaml ./

# 安装项目依赖
RUN pnpm install

# 将项目源代码复制到工作目录
COPY . .

# 构建项目，假设所有的源代码都在 src 目录下
RUN pnpm build

# Stage 2: 生产环境
FROM node:alpine
WORKDIR /usr/src/app

# 再次安装 pnpm
# RUN npm install -g pnpm

# 复制构建结果和依赖到新的工作目录
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules

# 暴露端口
EXPOSE 8092

# 运行 NestJS 应用
CMD ["node", "dist/main"]