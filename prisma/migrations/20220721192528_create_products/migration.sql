-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "productsId" TEXT,
    CONSTRAINT "categories_productsId_fkey" FOREIGN KEY ("productsId") REFERENCES "products" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
