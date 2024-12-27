import { PageFilter } from "@/types/filters";

export const urlFormatter = ({
  currentRoute,
  page,
  genre,
}: {
  currentRoute: string;
  page: number;
  genre: string;
}): string => {
  const params = new URLSearchParams(currentRoute);
  params.set("page", page.toString());

  if (genre) {
    params.set("genre", genre);
  } else {
    params.delete("genre");
  }

  return `?${params.toString()}`;
};

export const filterFormatter = (searchParams: string[][]): PageFilter => {
  let page = 0;
  let genre = "";

  searchParams.forEach(([key, value]) => {
    if (key === "page") {
      page = parseInt(value, 10) || 0;
    } else if (key === "genre") {
      genre = value || "";
    }
  });

  return { page, genre };
};