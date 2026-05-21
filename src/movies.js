// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArray) {
  return moviesArray.map(function (movie) {
    return movie.director;
  });
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
  return moviesArray.filter(function (movie) {
    return (
      movie.director === 'Steven Spielberg' &&
      movie.genre.includes('Drama')
    );
  }).length;
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
  if (moviesArray.length === 0) {
    return 0;
  }

  const totalScore = moviesArray.reduce(function (sum, movie) {
    return sum + (Number(movie.score) || 0);
  }, 0);

  return Math.round((totalScore / moviesArray.length) * 100) / 100;
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
  const dramaMovies = moviesArray.filter(function (movie) {
    return movie.genre.includes('Drama');
  });

  return scoresAverage(dramaMovies);
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {
  return moviesArray.slice().sort(function (movieA, movieB) {
    if (movieA.year === movieB.year) {
      return movieA.title.localeCompare(movieB.title);
    }

    return movieA.year - movieB.year;
  });
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
  return moviesArray
    .slice()
    .sort(function (movieA, movieB) {
      return movieA.title.localeCompare(movieB.title);
    })
    .slice(0, 20)
    .map(function (movie) {
      return movie.title;
    });
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
  return moviesArray.map(function (movie) {
    const hoursMatch = movie.duration.match(/(\d+)h/);
    const minutesMatch = movie.duration.match(/(\d+)min/);
    const hours = hoursMatch ? Number(hoursMatch[1]) : 0;
    const minutes = minutesMatch ? Number(minutesMatch[1]) : 0;

    return Object.assign({}, movie, {
      duration: hours * 60 + minutes
    });
  });
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {
  if (moviesArray.length === 0) {
    return null;
  }

  const yearScores = moviesArray.reduce(function (scoresByYear, movie) {
    if (!scoresByYear[movie.year]) {
      scoresByYear[movie.year] = {
        totalScore: 0,
        moviesCount: 0
      };
    }

    scoresByYear[movie.year].totalScore += Number(movie.score) || 0;
    scoresByYear[movie.year].moviesCount += 1;

    return scoresByYear;
  }, {});

  const bestYear = Object.keys(yearScores).reduce(function (currentBest, year) {
    const average =
      Math.round((yearScores[year].totalScore / yearScores[year].moviesCount) * 100) /
      100;
    const currentBestAverage = currentBest.average;

    if (
      average > currentBestAverage ||
      (average === currentBestAverage && Number(year) < currentBest.year)
    ) {
      return {
        year: Number(year),
        average: average
      };
    }

    return currentBest;
  }, {
    year: Infinity,
    average: 0
  });

  return `The best year was ${bestYear.year} with an average score of ${bestYear.average}`;
}
