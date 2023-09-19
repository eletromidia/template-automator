const url = new URL('http://localhost:3000')

const jsonConf = {
  id: '',
  name: 'nome',
  width: 800,
  height: 860,
  bgColor: '#FFFF00',
  elements: [
    {
      type: 'text',
      alias: 'TITULO',
      properties: {
        pos_x: '20',
        pos_y: '20',
        width: '200',
        height: '80',
        color: '#303030',
        font: 'verdana',
        font_size: 32,
        align: 'center',
      },
      transition:  {
        start: '1s',
        type: 'slide',
      },    
    },
    {
      type: 'text',
      alias: 'TEXTO',
      properties: {
        pos_x: '20',
        pos_y: '100',
        width: '200',
        height: '80',
        color: '#303030',
        font_size: 22,
        font: 'verdana',
        align: 'left',
      },
      transition:  {
        start: '2s',
        type: 'slide',
      },    
    },
    {
      type: 'image',
      alias: 'IMAGEM',
      properties: {
        pos_x: '20',
        pos_y: '200',
        width: '700',
        height: '400',
        border: 'rounded',
      },
      transition:  {
        start: '3s',
        type: 'fadeIn',
      },    
    },
  ],
}

const template = {
  nome: 'Nome',
  url_background: 'https://upload.wikimedia.org/wikipedia/commons/d/dd/Taubenbrunnen_K%C3%B6ln.webm',
  suporta_titulo: true,
  suporta_texto: true,
  suporta_imagem: true,
  json_config_modelo_predefinido: '',
  duracao_padrao: 10,
}

const json_parameters = JSON.stringify(template)
const params = new URLSearchParams({ json_parameters, bgType: 'video/webm' })
url.search = params

console.log(`${url}`)


