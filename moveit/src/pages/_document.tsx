/* esse arquivo é carregado apenas uma vez */
import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
    render() {
        return (
            <Html>
                 {/*tudo que tiver dentro da tag head o next vai colocar na head do HTML*/}
                <Head>
                    <link rel="shortcut icon" href="favicon.png" type="image/x-icon" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Rajdhani:wght@600&display=swap" rel="stylesheet" />
                </Head>

                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>            
        );
    }
} 