import fs from 'fs';
import handlebars from 'handlebars';
import nodemailer, { Transporter } from 'nodemailer';

class SendMailService{
    private client: Transporter

    // construtor => metodo que é executado assim que a classe é chamada
    constructor() {
        nodemailer.createTestAccount().then((account) => { //a resposta em caso de sucesso fica dentro do .then
            const transporter = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                  user: account.user,
                  pass: account.pass,
                },
            });

            this.client = transporter;
        }) 
    }

    async execute(to: string, subject: string, variables: object, path: string){
        const templateFileContent = fs.readFileSync(path).toString("utf8");

        const mailTemplateParse = handlebars.compile(templateFileContent);
        const html = mailTemplateParse({variables});

        const message = await this.client.sendMail({
            to,
            subject,
            html,
            from: "NPS <noreply@nps.com.br"
        });

        console.log('Message sent %s', message.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
    }
}

export default new SendMailService;