/*
  Warnings:

  - You are about to alter the column `day` on the `Game` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `month` on the `Game` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `year` on the `Game` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Game" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "day" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,
    "combo" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Game_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Game" ("combo", "day", "id", "month", "score", "userId", "year") SELECT "combo", "day", "id", "month", "score", "userId", "year" FROM "Game";
DROP TABLE "Game";
ALTER TABLE "new_Game" RENAME TO "Game";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
