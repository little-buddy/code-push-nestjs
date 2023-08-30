# 构建环境遇到的问题

###  error 1
```
 error TS1378: Top-level 'await' expressions are only allowed when the 'module' option is set to 'es2022', 'esnext', 'system', 'node16', or 'nodenext', and the 'target' option is set to 'es2017' or higher.
```
查了一下 nodev14.8.0 开始支持 Top-Level Await 的写法，
我们node的版本是 v16.20.2，所以直接指定 modlue为 esnext 就好了

### error 2
```
Cannot find module '@nestjs/common'
```
应该是@nestjs对应的包版本不一致，删除lock文件，重新安装一下

### error 3
```
保存自动格式化添加两个 分号
@typescript-eslint/member-delimiter-style 和 prettier/prettier 存在冲突
注释掉一个就好了
```

### error 4
```
希望声明一个全局类型，但又不希望通过 global.d.ts 来引入
可以通过 'source-map-support/register' 让任何ts文件变成 .d.ts 的功能
```
