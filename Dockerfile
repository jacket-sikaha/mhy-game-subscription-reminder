# Stage 1: 使用官方 Node.js 作为构建环境
FROM node:alpine as builder
WORKDIR /project

# 安装 pnpm
RUN npm install -g pnpm

# 复制 package.json 和 pnpm-lock.yaml 文件到工作目录
COPY package.json pnpm-lock.yaml ./

# 安装项目依赖
RUN pnpm install

# 将项目源代码复制到工作目录
COPY . .

# 配置环境变量，内容为.env文件
ENV cat .env
# 输出 .env 文件内容
# RUN cat .env

# 构建项目，假设所有的源代码都在 src 目录下
RUN pnpm build

# Stage 2: 生产环境
FROM node:alpine
WORKDIR /project

# 再次安装 pnpm
# RUN npm install -g pnpm

# 复制构建结果和依赖到新的工作目录
COPY --from=builder /project/dist ./dist
COPY --from=builder /project/node_modules ./node_modules
COPY --from=builder /project/.env ./.env
# 配置环境变量，内容为.env文件
ENV cat .env

# 查看当前工作目录
RUN ls -a

# 暴露端口
EXPOSE 3000

# 运行 NestJS 应用
CMD ["node", "/project/dist/main"]
