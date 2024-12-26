import { Game } from "@/utils/endpoint";

export const mockGames: Game[] = [
  {
    id: "1",
    name: "Elden Ring",
    genre: "Action RPG",
    price: 59.99,
    image: "/images/elden-ring.jpg",
    isNew: true,
    description: "An open-world action RPG set in a dark fantasy universe.",
  },
  {
    id: "2",
    name: "God of War",
    genre: "Action Adventure",
    price: 49.99,
    image: "/images/god-of-war.jpg",
    isNew: false,
    description: "An epic story of Kratos and his son exploring Norse mythology.",
  },
  {
    id: "3",
    name: "Cyberpunk 2077",
    genre: "RPG",
    price: 29.99,
    image: "/images/cyberpunk.jpg",
    isNew: true,
    description: "A futuristic RPG set in the open-world Night City.",
  },
];