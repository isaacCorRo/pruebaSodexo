export interface Metadata {
    "code error ": string;
    description: string;
  }
  
  export interface NoticiaResponse {
    idfav: number;
    id: string;
    title: string;
    url: string;
    news_site: string;
    summary: string;
    featured: boolean;
    publishedat: number[]; // Ajusta esto según el tipo de datos que manejes para las fechas
    imageurl: string;
    updatedat: number[]; // Ajusta esto según el tipo de datos que manejes para las fechas
  }
  
  export interface NoticiasResponse {
    metadata: Metadata[];
    noticiasresponse: {
      noticias: NoticiaResponse[];
    };
  }