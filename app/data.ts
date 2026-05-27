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

export interface Gallery {
  id: string
  title: string
  description: string
  coverImage: string
  year: number
  tags: string[]
  columns?: 2 | 3
  images: {
    url: string
    caption: string
    aspect: 'landscape' | 'portrait'
  }[]
}

export const portfolio = {
  name: "JORGE RANGEL",
  gridColumns: 2 as 2 | 3,
  tagline: "Photographer",
  bio: "Born and raised in Toronto, ON. It all begins with an idea. Maybe you want to launch a business. Maybe you want to turn a hobby into something more. Or maybe you have a creative project to share with the world. Whatever it is, the way you tell your story online can make all the difference.",
  email: "jorsh@jorsh.sh",
  representationEmail: "rep@jorsh.io",
  pressEmail: "press@jorsh.io",
  portrait: "https://taf-v2-images.s3.amazonaws.com/prod/58/conversions/401498411_308783158586560_5503683204801589491_n-avatar_thumb.jpg",
  social: {
    instagram: "https://instagram.com/jorshhhh",
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

export const galleries: Gallery[] = [
  {
    id: "travel",
    title: "Travel",
    columns: 3,
    description: "Visual diaries and landscapes captured across Iceland, Japan, and the Pacific Northwest.",
    coverImage: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&q=80",
    year: 2025,
    tags: ["Adventure", "Landscape", "Earth"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&q=80",
        caption: "Silent glacial lake under morning fog, Iceland.",
        aspect: "landscape"
      },
      {
        url: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80",
        caption: "Towering bamboo stalks reaching the sky, Kyoto, Japan.",
        aspect: "portrait"
      },
      {
        url: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=1200&q=80",
        caption: "Golden light casting over rolling clouds below Mt. Fuji.",
        aspect: "landscape"
      },
      {
        url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
        caption: "Moody coastlines of the Pacific Northwest, Oregon.",
        aspect: "landscape"
      },
      {
        url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80",
        caption: "First light reflecting on a quiet alpine lake in the Cascades.",
        aspect: "landscape"
      }
    ]
  },
  {
    id: "portraits",
    title: "Portraits",
    columns: 2,
    description: "Minimalist studio portraiture focusing on character, form, and natural light.",
    coverImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1200&q=80",
    year: 2025,
    tags: ["Editorial", "Natural Light", "Form"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80",
        caption: "Soft window light highlighting clean studio lines.",
        aspect: "portrait"
      },
      {
        url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
        caption: "High-contrast monochrome studio portrait, study in shadow.",
        aspect: "portrait"
      },
      {
        url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80",
        caption: "Candid editorial profile in golden afternoon sunlight.",
        aspect: "portrait"
      },
      {
        url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1200&q=80",
        caption: "Expressive portrait highlighting subtle textures and warm tones.",
        aspect: "landscape"
      }
    ]
  },
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
