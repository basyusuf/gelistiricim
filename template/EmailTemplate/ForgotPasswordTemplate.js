const forgotPasswordTemplate=(resetPasswordUrl,userName)=>{
    let returnItem = `
        <!doctype html>
        <html lang="tr">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport"
                  content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Gelişitiricim Mail</title>
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&display=swap" rel="stylesheet">
        </head>
        <style>
            body{
                margin:0;
            }
            .parentBox{
                display: flex;
                justify-content: center;
                font-family: 'Montserrat', sans-serif;
            }
            .divBox{
                max-width: 600px;
            }
            .marginDiv{
                margin-top: 2rem
            }
            .headerBox{
                padding:2rem;
                background-color:#F6F6F6;
                text-align: center;
            }
            .contentBox{
                padding-left: 2rem;
                padding-right: 2rem;
                background-color:white;
            }
            .hightText{
                font-size: 36px;
                color:#1B969C;
                margin-top: 2rem;
                font-weight: bold;
            }
            .centerText{
                text-align: center;
            }
            .actionButton{
                background-color: #0098A2;
                color: white;
                font-size: 1rem;
                font-weight: bold;
                text-align: center;
                padding-top:1rem;
                padding-bottom: 1rem;
                padding-left: 28px;
                padding-right: 28px;
                text-decoration: none;
            }
            .actionButton:hover{
                background-color: #00c6d0;
            }
        </style>
        <body>
        <div class="parentBox">
            <div class="divBox">
                <div class="headerBox">
                    Gelistiricim
                </div>
                <div class="contentBox">
                <div class="centerText">
                <div class="marginDiv">Merhabalar ${userName}</div>
                <div class="hightText">Hoşgeldin.</div>
                </div>
                    <div class="marginDiv">
                        Şifre yenileme isteğiniz başarıyla gerçekleşmiştir.
                    </div>
                    <div class="marginDiv">
                        Aşağıdaki butona tıklayarak şifreni sıfırlayabilirsin.
                    </div>
                    <div class="marginDiv centerText">
                        <a class="actionButton" href='${resetPasswordUrl}' target="_blank">ŞİFREMİ SIFIRLA</a>
                    </div>
                </div>
                <div class="headerBox marginDiv">
                    © 2020 <a href="http://www.gelistiricim.com" target="_blank">www.gelistiricim.com</a> All Rights Reserved
                </div>
            </div>
        </div>
        </body>
        </html>
    `;
    return returnItem;
}
module.exports={
    forgotPasswordTemplate
}