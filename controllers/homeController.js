const path = require('path');
const fs = require('fs');

const homeController = {
  index: (req, res) => {
    let servicos = [
      { nome: 'Dev Full Stack', imagem: '/imagens/undraw_dev_focus.svg'},
      { nome: 'Marketing Digital', imagem: '/imagens/undraw_social_dashboard.svg'},
      { nome: 'Consultoria UX', imagem: '/imagens/undraw_mobile_apps.svg'}
    ];

    let banners = [
      '/imagens/banner.jpg', 
      '/imagens/banner3.jpg', 
    ];

    res.render(
      'index', 
      { title: 'Home', listaServicos: servicos, listaBanners: banners }
    );
  },
  contato: (req, res) => {
    let {nome, email, mensagem} = req.body;

    let infoContato = { nome, email, mensagem };

    
    
    const filecontatos=path.join('db','contatinhos.json')
    listacontatos={};
    if(fs.existsSync(filecontatos)){
      listacontatos=fs.readFileSync(filecontatos,{encoding:'utf-8'});
      listacontatos=JSON.parse(listacontatos);
      listacontatos.cont.push(infoContato);
    } else{
      listacontatos={
        cont:[infoContato]
      }
    }
    listacontatos=JSON.stringify(listacontatos);
    fs.writeFileSync(filecontatos,listacontatos)


    

    res.render('contato', {nome, email, mensagem, title: 'Contato'});
  },
  newsletter: (req, res) => {
    let {email} = req.query;
    const filenewsletter = path.join('db','newsletter.json');

    let listaNewsLetter={};
    if(fs.existsSync(filenewsletter)){
      // trazendo conteudo do arquivo em formato json
    listaNewsLetter=fs.readFileSync(filenewsletter,{encoding:'utf-8'});
// transformando json em objeto
listaNewsLetter=JSON.parse(listaNewsLetter);

// pegando um array de inscritos e adicionando um novo email
listaNewsLetter.inscritos.push(email);

    } else{
     listaNewsLetter={
       inscritos:[email]
     };
    }
    // transformando obj em JSON
    listaNewsLetter=JSON.stringify(listaNewsLetter);
    // guardando lista d einscritos com o novo email
    fs.writeFileSync(filenewsletter,listaNewsLetter);
    
    
    
    
    // POST - req.body
    // GET - req.query
    // GET /:email - req.params

    res.render('newsletter', {email, title: 'Newsletter'});
  }
};

module.exports = homeController;