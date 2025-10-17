// Movies data for frontend
export const moviesData = [
  
  {
    movieId: "M002",
    title: "Spider-Man: No Way Home",
    description:
      "Peter Parker phải đối mặt với những hậu quả khi danh tính bí mật của anh bị tiết lộ và phải tìm cách khôi phục lại cuộc sống bình thường. Với sự xuất hiện của các Spider-Man từ vũ trụ khác, cuộc phiêu lưu trở nên phức tạp hơn bao giờ hết.",
    duration: 148,
    releaseDate: "2023-12-17",
    language: "Tiếng Anh - Phụ đề Việt",
    rating: "C13",
    genre: ["Hành động", "Siêu anh hùng", "Phiêu lưu"],
    poster: "/public/images/55462afc-41ad-4322-ad46-1caca29fcc36.jpg",
    trailer: "https://youtube.com/watch?v=JfVOs4VSpmA",
    director: "Jon Watts",
    cast: ["Tom Holland", "Zendaya", "Benedict Cumberbatch", "Jacob Batalon"],
    imdbRating: 8.2,
    isHot: true,
    isComingSoon: false,
    status: "showing",
  },
  {
    movieId: "M003",
    title: "Dune",
    description:
      "Câu chuyện về Paul Atreides, một thanh niên tài năng phải đối mặt với những thử thách khốc liệt trên hành tinh sa mạc Arrakis. Đây là một tác phẩm khoa học viễn tưởng hoành tráng với hình ảnh đẹp mắt và cốt truyện sâu sắc.",
    duration: 155,
    releaseDate: "2023-10-22",
    language: "Tiếng Anh - Phụ đề Việt",
    rating: "C13",
    genre: ["Khoa học viễn tưởng", "Phiêu lưu", "Drama"],
    poster:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWIH6SGXgxM2QjJ78mofiJRhAqwPKstSZURw&s",
    trailer: "https://youtube.com/watch?v=n9xhJrPXop4",
    director: "Denis Villeneuve",
    cast: [
      "Timothée Chalamet",
      "Rebecca Ferguson",
      "Oscar Isaac",
      "Josh Brolin",
    ],
    imdbRating: 8.0,
    isHot: false,
    isComingSoon: false,
    status: "showing",
  },
  {
    movieId: "M004",
    title: "The Batman",
    description:
      "Khi một kẻ giết người hàng loạt bắt đầu tấn công các quan chức cấp cao của Gotham, Batman phải điều tra để tìm ra danh tính của kẻ thù. Đây là phiên bản tối tăm và chân thực nhất của Batman với Robert Pattinson trong vai chính.",
    duration: 176,
    releaseDate: "2024-03-04",
    language: "Tiếng Anh - Phụ đề Việt",
    rating: "C16",
    genre: ["Hành động", "Tội phạm", "Drama"],
    poster:
      "/public/images/MV5BMmU5NGJlMzAtMGNmOC00YjJjLTgyMzUtNjAyYmE4Njg5YWMyXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    trailer: "https://youtube.com/watch?v=mqqft2x_Aa4",
    director: "Matt Reeves",
    cast: ["Robert Pattinson", "Zoë Kravitz", "Paul Dano", "Jeffrey Wright"],
    imdbRating: 7.8,
    isHot: false,
    isComingSoon: true,
    status: "coming_soon",
  },
  {
    movieId: "M005",
    title: "Top Gun: Maverick",
    description:
      "Sau hơn 30 năm phục vụ, Maverick vẫn là một trong những phi công giỏi nhất của Hải quân Hoa Kỳ, nhưng phải đối mặt với những thử thách mới. Với những cảnh bay hoành tráng và câu chuyện cảm động, đây là một tác phẩm điện ảnh đáng xem.",
    duration: 131,
    releaseDate: "2024-05-27",
    language: "Tiếng Anh - Phụ đề Việt",
    rating: "C13",
    genre: ["Hành động", "Drama"],
    poster: "/public/images/TogGunMaverick_Poster02.jpg",
    trailer: "https://youtube.com/watch?v=qSqVVswa420",
    director: "Joseph Kosinski",
    cast: ["Tom Cruise", "Miles Teller", "Jennifer Connelly", "Jon Hamm"],
    imdbRating: 8.3,
    isHot: false,
    isComingSoon: true,
    status: "coming_soon",
  },
  {
    movieId: "M006",
    title: "Black Widow",
    description:
      "Natasha Romanoff đối mặt với những bí mật đen tối từ quá khứ khi một âm mưu nguy hiểm liên quan đến lịch sử của cô xuất hiện. Đây là câu chuyện độc lập về siêu nữ anh hùng Black Widow.",
    duration: 134,
    releaseDate: "2023-07-09",
    language: "Tiếng Anh - Phụ đề Việt",
    rating: "C13",
    genre: ["Hành động", "Siêu anh hùng", "Gián điệp"],
    poster: "/images/Marvel-Black-Widow-Movie-Poster.jpg",
    trailer: "/public/images/Marvel-Black-Widow-Movie-Poster.jpg",
    director: "Cate Shortland",
    cast: [
      "Scarlett Johansson",
      "Florence Pugh",
      "David Harbour",
      "Rachel Weisz",
    ],
    imdbRating: 6.7,
    isHot: false,
    isComingSoon: false,
    status: "showing",
  },
];

// Helper functions
export const getMovieById = (movieId) => {
  return moviesData.find((movie) => movie.movieId === movieId);
};

export const getHotMovies = () => {
  return moviesData.filter((movie) => movie.isHot);
};

export const getComingSoonMovies = () => {
  return moviesData.filter((movie) => movie.isComingSoon);
};

export const getShowingMovies = () => {
  return moviesData.filter((movie) => movie.status === "showing");
};

export const getMoviesByGenre = (genre) => {
  return moviesData.filter((movie) => movie.genre.includes(genre));
};

export const searchMovies = (query) => {
  const lowercaseQuery = query.toLowerCase();
  return moviesData.filter(
    (movie) =>
      movie.title.toLowerCase().includes(lowercaseQuery) ||
      movie.director.toLowerCase().includes(lowercaseQuery) ||
      movie.cast.some((actor) =>
        actor.toLowerCase().includes(lowercaseQuery)
      ) ||
      movie.genre.some((g) => g.toLowerCase().includes(lowercaseQuery))
  );
};