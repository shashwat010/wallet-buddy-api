export = {
    stage: process.env.ENVIRONMENT || 'dev',
    port: 8082,
    domain:'',
    apiPath: '/api',
    staticPath: '',
    db:{
        // add localhost mongodb details.
        name: '',
        user:'',
        pw: '',
        account: '',
        uri: (user: string, pw :string, name :string, account: string) => {
            return `mongodb+srv://${user}:${pw}${account}.vsche.mongodb.net/${name}?retryWrites=true&w=majority`;
        }
    }
}
