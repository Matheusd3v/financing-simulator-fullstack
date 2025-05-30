-- CreateTable
CREATE TABLE "students" (
    "id" SERIAL NOT NULL,
    "uuid" UUID NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "name" VARCHAR(25) NOT NULL,
    "lastName" VARCHAR(255) NOT NULL,
    "password" VARCHAR NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "students_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "students_uuid_key" ON "students"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "students_email_key" ON "students"("email");
