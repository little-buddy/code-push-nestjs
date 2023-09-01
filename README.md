# code-push-nestjs

## ⭐️ 起源

`lisong/code-push-server` 年久失修

所以借着学习`nestjs`机会打算重构一下

## 项目结构

一部分基建是继承于 [NarHakobyan/awesome-nest-boilerplate](https://github.com/NarHakobyan/awesome-nest-boilerplate)

### 为什么不直接用那个模版而是选择新建？

```
因为 awesome-nest-boilerplate 没有使用nest-cli的处理项目
并且一些环境配置存在历史原因
索性重建，一些基建配置沿用了上面的模版
```

## 🌲 env 
### node
```
support node >=12
```

## 😯 Feature
- [x]  ali-oss instead of aliyun-sdk
- [x]  @aws-sdk/client-s3 instead of aws-sdk

## 📚 Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## 💪🏻 Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Buddy](https://github/little-buddy)

## License

Nest is [MIT licensed](LICENSE).
