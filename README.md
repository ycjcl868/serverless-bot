<h1 align="center">Serverless-bot 👋</h1>
<p>
A Serverless function build tool using `umijs` [build tool](https://github.com/umijs/father).
</p>

> Take the github hooks robot as an example, you can write your function in `src`.

## Feature

Create your serverless function easily:
- TypeScript
- ES6
- Exclude Serverless platform `built-in` functions and libraries
- Function independence, not depending on node_modules

## Usage
for example, we use [Aliyun Function Compute](https://www.alibabacloud.com/products/function-compute).

fill in your `WEB_HOOK` url (serverless will send a notification to it), if your github hook has `Secret`, you should supply the `GITHUB_HOOK_SECRET` in `template.yml`.

```sh
$ npm install
$ npm run deploy
```

![image](https://user-images.githubusercontent.com/13595509/63635647-3ef33b80-c697-11e9-9ce6-bb9ae8deff21.png)


## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
