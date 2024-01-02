-- CreateTable
CREATE TABLE "User" (
    "id" STRING NOT NULL,
    "username" STRING NOT NULL,
    "hashedPassword" STRING NOT NULL,
    "name" STRING NOT NULL,
    "birthTimePlace" STRING NOT NULL,
    "faculty" STRING NOT NULL,
    "absentNumber" INT4 NOT NULL,
    "phoneNumber" INT4 NOT NULL,
    "emergencyNumber" INT4 NOT NULL,
    "lineId" STRING NOT NULL,
    "instagram" STRING NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reminder" (
    "id" STRING NOT NULL,
    "title" STRING NOT NULL,
    "descriptionLink" STRING NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reminder_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
