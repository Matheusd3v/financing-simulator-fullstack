-- CreateTable
CREATE TABLE "financing_simulators" (
    "id" SERIAL NOT NULL,
    "uuid" UUID NOT NULL,
    "total" DECIMAL(19,4) NOT NULL,
    "installments" INTEGER NOT NULL,
    "monthly_interest" DECIMAL(5,4) NOT NULL,
    "monthly_installment_value" DECIMAL(19,4) NOT NULL,
    "student_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "financing_simulators_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "financing_simulators_uuid_key" ON "financing_simulators"("uuid");

-- AddForeignKey
ALTER TABLE "financing_simulators" ADD CONSTRAINT "financing_simulators_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;
