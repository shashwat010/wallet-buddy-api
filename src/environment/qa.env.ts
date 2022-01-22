export = {
    stage: process.env.ENVIRONMENT || 'staging',
    port:8082,
    domain:'',
    apiPath: '',
    staticPath: '',
    db:{
        name: 'yts-dev',
        user:'sachinduhan',
        pw: 'Yoursthatsenior21',
        account: '@yts-dev',
        uri: (user: string, pw :string, name :string, account: string) => {
            return `mongodb+srv://${user}:${pw}${account}.vsche.mongodb.net/${name}?retryWrites=true&w=majority`;
        }
    }
}
