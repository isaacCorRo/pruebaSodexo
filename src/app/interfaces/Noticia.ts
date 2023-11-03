export interface Noticia {
  id:number,
  title: String,
  url: String,
  image_url: String,
  news_site: String,
  summary: String,
  published_at: Date,
  updated_at: Date,
  featured: boolean
  launches: any []
  events: any []
}
