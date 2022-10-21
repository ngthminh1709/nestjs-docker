FROM  node:lts as dependencies

WORKDIR /src/nestjs-docker
COPY package.json package-lock.json ./
RUN npm install

FROM  node:lts as builder

RUN npm run build


WORKDIR /src/nestjs-docker
COPY . /src/nestjs-docker
COPY --from=dependencies /src/nestjs-docker/node_modules ./node_modules