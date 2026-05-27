export interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  image: string
  year: number
  url?: string
}

export interface Post {
  id: string
  title: string
  excerpt: string
  date: string
  readingTime: number
  tags: string[]
  body: string
}

export const portfolio = {
  name: "JORSH",
  tagline: "Photographer & Visual Artist",
  bio: "Born and raised in Toronto, ON. It all begins with an idea. Maybe you want to launch a business. Maybe you want to turn a hobby into something more. Or maybe you have a creative project to share with the world. Whatever it is, the way you tell your story online can make all the difference.",
  email: "hello@jorsh.io",
  representationEmail: "rep@jorsh.io",
  pressEmail: "press@jorsh.io",
  social: {
    instagram: "https://instagram.com/jorsh",
    twitter: "https://twitter.com/jorsh",
  }
}

export const projects: Project[] = [
  {
    id: "shirow-gallery",
    title: "Shirow",
    description: "A misty, cinematic study of remote pine forests and northern landscapes.",
    tags: ["Landscape", "Moody"],
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&q=80",
    year: 2025,
  },
  {
    id: "mountain-monolith",
    title: "Mountain Monolith",
    description: "High-contrast minimalist portrait of towering black rock and glacier ice.",
    tags: ["Mountain", "Monochrome"],
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
    year: 2025,
  },
  {
    id: "forest-cabin",
    title: "The Outpost",
    description: "An isolated wooden cabin nestled in deep deciduous woodlands.",
    tags: ["Architecture", "Forest"],
    image: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=800&q=80",
    year: 2024,
  },
  {
    id: "deep-waters",
    title: "Deep Waters",
    description: "Desaturated patterns of ocean waves, captured during high tide.",
    tags: ["Ocean", "Minimalist"],
    image: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=1200&q=80",
    year: 2024,
  },
  {
    id: "urban-lines",
    title: "Concrete Lines",
    description: "Geometric architectural lines and brutalist structures under harsh sunlight.",
    tags: ["Brutalist", "Architecture"],
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
    year: 2024,
  },
  {
    id: "golden-hour",
    title: "Golden Hour",
    description: "Warm golden sunlight filtering through a single forest leaf.",
    tags: ["Nature", "Detail"],
    image: "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?w=800&q=80",
    year: 2023,
  }
]

export const posts: Post[] = [
  {
    id: "shirow",
    title: "Shirow",
    excerpt: "It all begins with an idea.",
    date: "2019-05-28",
    readingTime: 4,
    tags: ["Concept", "Photography"],
    body: "This is the full text of Shirow. It all begins with an idea. Maybe you want to launch a business. Maybe you want to turn a hobby into something more. Or maybe you have a creative project to share with the world. Whatever it is, the way you tell your story online can make all the difference.\n\nMinimalism is not about having nothing. It's about having exactly what you need, and nothing more. In design, every element must earn its place. If a component, a line, or a color doesn't serve a functional or emotional purpose, it is clutter. By stripping away the noise, we allow the true focus — the photography, the text, the message — to stand out and speak for itself."
  },
  {
    id: "man-vs-wild",
    title: "Man vs Wild",
    excerpt: "Adventures in the great outdoors.",
    date: "2019-05-20",
    readingTime: 6,
    tags: ["Expedition", "Nature"],
    body: "This is the full text of Man vs Wild. In the wild, you must adapt, improvise, and overcome. Here is how we did it on our last expedition.\n\nVenturing deep into the wilderness requires more than just gear; it requires a mindset of profound respect for the natural world. Far from the concrete grids and digital networks, the landscape operates on its own ancient rhythm. We spent twelve days tracking elevation changes, weathering cold rain fronts, and documenting the silent beauty of the mountain ranges. The visual documentation we gathered reflects this raw, unfiltered relationship between human resilience and untamed nature."
  },
  {
    id: "midori",
    title: "Midori",
    excerpt: "A study of green and growth.",
    date: "2019-05-15",
    readingTime: 5,
    tags: ["Art", "Study"],
    body: "This is the full text of Midori. Green represents life, energy, and renewal. It is a peaceful, refreshing color that has a powerful effect on human psychology.\n\nIn our latest series, Midori, we explore the vibrant, quiet interactions of light and flora. From the moss-covered stones of ancient temples to the modern geometric greenhouse, green is a color that commands presence without shouting. It serves as a visual bridge between organic chaos and structured architecture. We present these photos as a meditative study on natural geometry and serene plant life."
  }
]
