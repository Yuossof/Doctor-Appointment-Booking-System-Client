interface Person {
  id: number,
  first_name: string,
  last_name: string,
}

interface UserImages {
  id: number,
  image_url: string
}

export interface Doc {
  id: number,
  type: string,
  desc: string,
  created_at : string,
  doctor: Person,
  user: Person,
  user_docs_images: UserImages[]
}

export interface Report {
    id: number | string
    type: string
    desc: string
    created_at: string
    user_docs_images: UserImages[]
}