-- Creating the User table
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'agent',
    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- Creating a unique index on the username column
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
