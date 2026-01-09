export function generateWordSearchGrid(words: string[], size: number): string[][] {
  const grid: string[][] = Array(size).fill(null).map(() => 
    Array(size).fill('')
  );
  
  const directions = [
    [0, 1],   // horizontal right
    [1, 0],   // vertical down
    [1, 1],   // diagonal down-right
    [0, -1],  // horizontal left
    [-1, 0],  // vertical up
    [-1, -1], // diagonal up-left
    [1, -1],  // diagonal down-left
    [-1, 1],  // diagonal up-right
  ];

  const placedWords: string[] = [];

  // Sort words by length (longest first) for better placement
  const sortedWords = [...words].sort((a, b) => b.length - a.length);

  for (const word of sortedWords) {
    const upperWord = word.toUpperCase().replace(/\s/g, '');
    let placed = false;
    let attempts = 0;
    const maxAttempts = 100;

    while (!placed && attempts < maxAttempts) {
      const direction = directions[Math.floor(Math.random() * directions.length)];
      const startRow = Math.floor(Math.random() * size);
      const startCol = Math.floor(Math.random() * size);

      if (canPlaceWord(grid, upperWord, startRow, startCol, direction, size)) {
        placeWord(grid, upperWord, startRow, startCol, direction);
        placedWords.push(word);
        placed = true;
      }
      attempts++;
    }
  }

  // Fill empty cells with random letters
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (grid[i][j] === '') {
        grid[i][j] = letters[Math.floor(Math.random() * letters.length)];
      }
    }
  }

  return grid;
}

function canPlaceWord(
  grid: string[][], 
  word: string, 
  startRow: number, 
  startCol: number, 
  direction: number[], 
  size: number
): boolean {
  const [dRow, dCol] = direction;
  
  for (let i = 0; i < word.length; i++) {
    const newRow = startRow + i * dRow;
    const newCol = startCol + i * dCol;

    if (newRow < 0 || newRow >= size || newCol < 0 || newCol >= size) {
      return false;
    }

    const currentCell = grid[newRow][newCol];
    if (currentCell !== '' && currentCell !== word[i]) {
      return false;
    }
  }

  return true;
}

function placeWord(
  grid: string[][], 
  word: string, 
  startRow: number, 
  startCol: number, 
  direction: number[]
): void {
  const [dRow, dCol] = direction;
  
  for (let i = 0; i < word.length; i++) {
    const newRow = startRow + i * dRow;
    const newCol = startCol + i * dCol;
    grid[newRow][newCol] = word[i];
  }
}
