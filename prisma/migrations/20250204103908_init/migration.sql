-- Enum for gadget status
CREATE TYPE "Status" AS ENUM (
    'Available', 
    'Deployed', 
    'Destroyed', 
    'Decommissioned'
);

-- Table for storing gadgets information
CREATE TABLE "gadgets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'Available',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "decommissionedAt" TIMESTAMP(3),

    CONSTRAINT "gadgets_pkey" PRIMARY KEY ("id")
);
