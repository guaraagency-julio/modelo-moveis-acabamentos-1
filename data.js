/* Dados demonstrativos. Fotografias externas ilustrativas e amostras geradas por SVG; não representam estoque, nem obras da empresa. */
window.NORD_DATA = (() => {
  const photos = {
    kitchen: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=84',
    kitchen2: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=84',
    living: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=84',
    hall: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1400&q=84',
    bathroom: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=84',
    cabinetry: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=84',
    lounge: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=84',
    detail: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=84',
    room: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=84',
    interior: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=84',
    stone: 'https://images.unsplash.com/photo-1600607688066-890987f18a86?auto=format&fit=crop&w=1400&q=84',
    tiles: 'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?auto=format&fit=crop&w=1400&q=84'
  };
  const applications = [
    {name:'Cozinhas e bancadas',desc:'Tampos, ilhas, frontões, cubas e superfícies de uso diário.',image:photos.kitchen,kind:'Pedras e superfícies'},
    {name:'Lavatórios e cubas',desc:'Peças sob medida para banheiros, lavabos e suítes.',image:photos.bathroom,kind:'Pedras e superfícies'},
    {name:'Móveis planejados',desc:'Marcenaria para aproveitar espaços com precisão e identidade.',image:photos.cabinetry,kind:'Planejados'},
    {name:'Painéis e revestimentos',desc:'Texturas, pedra e madeira aplicadas a paredes e painéis.',image:photos.living,kind:'Interiores'},
    {name:'Ilhas e áreas gourmet',desc:'Integração de espaços para preparo, encontros e convivência.',image:photos.kitchen2,kind:'Ambientes'},
    {name:'Escadas e soleiras',desc:'Soluções de transição, acabamento e revestimento.',image:photos.hall,kind:'Acabamentos'},
    {name:'Armários e closets',desc:'Organização planejada para quartos e áreas de serviço.',image:photos.room,kind:'Planejados'},
    {name:'Lareiras e aparadores',desc:'Tampos e revestimentos como elementos de destaque.',image:photos.lounge,kind:'Interiores'},
    {name:'Lavanderias',desc:'Superfícies de trabalho, armários e organização funcional.',image:photos.detail,kind:'Planejados'},
    {name:'Projetos comerciais',desc:'Balcões, recepções e mobiliário alinhados ao negócio.',image:photos.tiles,kind:'Comercial'}
  ];
  const groups = [
    {category:'Granitos',base:['#222322','#b8b0a0','#c7b59b'], names:[
      'Preto São Gabriel','Preto Absoluto','Preto Via Láctea','Verde Ubatuba','Branco Itaúnas','Branco Dallas','Branco Ceará','Cinza Corumbá','Amarelo Ornamental','Café Imperial','Marrom Absoluto','Marrom Bahia','Ornamental Escuro','Preto Negresco','Branco Marfim','Verde Candeia']},
    {category:'Mármores',base:['#ebe7de','#b5b1a6','#bda987'], names:[
      'Branco Carrara','Calacatta','Nero Marquina','Crema Marfil','Travertino Romano','Travertino Silver','Gris Armani','Branco Paraná','Mármore Guatemala','Marrom Imperador','Arabescato','Rosso Levanto','Branco Moura','Panda']},
    {category:'Quartzitos',base:['#d5c9ab','#c3b8a4','#8c7562'], names:[
      'Taj Mahal','Mont Blanc','Perla Santana','Cristallo','Vancouver','Woodstone','Allure','Saara','Kalahari','Amarula']},
    {category:'Quartzos',base:['#f2f0e8','#c4c2bf','#918c87'], names:[
      'Branco Stellar','Branco Puro','Calacatta Gold','Cinza Stellar','Carrara','Gris Expo','Branco Prime','Nero','Bege Marfim','Calacatta Premium']},
    {category:'Ultracompactos',base:['#c8bcae','#8d8581','#ded6cd'], names:[
      'Branco Zenith','Gris Nube','Laurent','Natura','Entzo','Kelya','Kreta','Trilium']},
    {category:'MDF e Madeiras',base:['#aa8262','#d1b28d','#665344'], names:[
      'Carvalho Natural','Freijó Puro','Nogueira Americana','Louro Freijó','Amadeirado Mel','Cinza Sagrado','Areia Matte','Off White','Fendi','Verde Oliva','Grafite','Preto Fosco','Jequitibá','Madeira Clara Texturizada']}
  ];
  const materials = groups.flatMap((group, gi) => group.names.map((name, i) => ({
    id: 'material-' + gi + '-' + i,
    name,
    category:group.category,
    colors:group.base,
    index:i,
    groupIndex:gi,
    description: group.category==='MDF e Madeiras'
      ? 'Padrão ilustrativo para marcenaria planejada e painéis. Verificar textura, espessura e linha comercial.'
      : 'Referência visual de superfície. A indicação para uso, tratamento, acabamento e disponibilidade requer avaliação técnica.'
  })));
  const projects = [
    {id:'p01',title:'Cozinha com ilha central',category:'Cozinhas',material:'Quartzito claro e marcenaria amadeirada',application:'Bancadas e ilha',images:[photos.kitchen,photos.kitchen2,photos.detail],description:'A ilha organiza a área de preparo e cria uma extensão para encontros. O contraste de superfícies claras com madeira aquece o ambiente.'},
    {id:'p02',title:'Lavatório de linguagem minimalista',category:'Lavatórios',material:'Superfície de pedra clara',application:'Tampo e cuba',images:[photos.bathroom,photos.detail,photos.hall],description:'Composição de superfícies contínuas e metais discretos para um ambiente de uso diário com presença visual.'},
    {id:'p03',title:'Sala integrada em tons naturais',category:'Revestimentos',material:'Painéis de madeira e superfícies neutras',application:'Painel e marcenaria',images:[photos.living,photos.room,photos.tiles],description:'Materiais com textura e cores harmônicas permitem que mobiliário e revestimentos participem da mesma composição.'},
    {id:'p04',title:'Cozinha de linhas contemporâneas',category:'Cozinhas',material:'Quartzo e MDF texturizado',application:'Bancada e armários',images:[photos.kitchen2,photos.cabinetry,photos.kitchen],description:'Marcenaria e pedra coordenadas para criar planos contínuos entre trabalho, armazenamento e circulação.'},
    {id:'p05',title:'Armários e organização integrada',category:'Planejados',material:'MDF amadeirado',application:'Marcenaria e armazenamento',images:[photos.cabinetry,photos.room,photos.hall],description:'Soluções planejadas exploram a relação entre espaço disponível, ergonomia e necessidades de uso.'},
    {id:'p06',title:'Ambiente de convivência',category:'Áreas gourmet',material:'Bancada de pedra e madeira',application:'Apoio e bancada',images:[photos.lounge,photos.kitchen,photos.kitchen2],description:'Revestimentos e tampos ajudam a definir áreas de convivência sem comprometer a circulação.'},
    {id:'p07',title:'Painel e acabamentos de destaque',category:'Revestimentos',material:'Pedra natural e texturas',application:'Revestimento decorativo',images:[photos.detail,photos.living,photos.room],description:'Grandes superfícies texturizadas mudam a leitura da luz e das proporções do espaço.'},
    {id:'p08',title:'Detalhes de mobiliário',category:'Planejados',material:'Madeira clara e acabamento acetinado',application:'Marcenaria de interior',images:[photos.room,photos.cabinetry,photos.detail],description:'Uma solução de armazenamento pode ser funcional sem perder o cuidado com composição e materiais.'},
    {id:'p09',title:'Recepção com superfícies naturais',category:'Comerciais',material:'Pedra e madeira',application:'Balcão e painéis',images:[photos.hall,photos.tiles,photos.living],description:'Materiais de acabamento colaboram com a identidade do espaço e com a experiência de quem o utiliza.'},
    {id:'p10',title:'Cozinha com tons de areia',category:'Cozinhas',material:'Pedra bege e armários claros',application:'Tampo e armários',images:[photos.kitchen,photos.hall,photos.kitchen2],description:'A combinação de superfícies quentes, pedra e marcenaria produz um ambiente equilibrado.'},
    {id:'p11',title:'Área social com detalhe em pedra',category:'Áreas gourmet',material:'Superfícies decorativas',application:'Bancada de apoio',images:[photos.tiles,photos.lounge,photos.kitchen2],description:'Bancadas e elementos de apoio unem funcionalidade ao repertório arquitetônico da área social.'},
    {id:'p12',title:'Sala com marcenaria integrada',category:'Planejados',material:'Carvalho e MDF fosco',application:'Painel e mobiliário',images:[photos.living,photos.room,photos.cabinetry],description:'Painéis, aparadores e armários dimensionados para o ambiente permitem organizar um conjunto visual coeso.'}
  ];
  const finishes = [
    {title:'Escovado',desc:'Textura sutil e brilho moderado.',kind:'brushed'},
    {title:'Polido',desc:'Aparência lisa que evidencia cores e veios.',kind:'polished'},
    {title:'Flameado',desc:'Textura rugosa em pedras compatíveis.',kind:'flamed'},
    {title:'Fosco & acetinado',desc:'Aspecto discreto e pouco reflexivo.',kind:'matte'}
  ];
  const slides = [
    {title:'Ambientes que convidam a ficar.',category:'COZINHAS & ILHAS',image:photos.kitchen,alt:'Cozinha contemporânea com acabamento em pedra'},
    {title:'Detalhes que valorizam o espaço.',category:'INTERIORES',image:photos.kitchen2,alt:'Cozinha planejada em materiais naturais'},
    {title:'A harmonia entre madeira e pedra.',category:'MÓVEIS PLANEJADOS',image:photos.cabinetry,alt:'Interior com armários e marcenaria'},
    {title:'Superfícies em primeiro plano.',category:'ACABAMENTOS',image:photos.detail,alt:'Detalhes de acabamentos de interior'},
    {title:'Projeto com identidade.',category:'AMBIENTES INTEGRADOS',image:photos.living,alt:'Sala de estar contemporânea'}
  ];
  return {applications,materials,projects,finishes,slides,photos,groupNames:groups.map(g=>g.category)};
})();